#!/usr/bin/env node
/*
 * Claude.ai の古いチャット履歴を、確認しながら削除するスクリプト。
 *
 * 使い方:
 *   1. 初回だけ: npm install  （Playwright と Chromium がインストールされます）
 *   2. 実行:     npm run delete-old-history
 *   3. ブラウザが開きます。初回は Claude.ai にログインしてください。
 *      ログインしたらターミナルで Enter を押してください。
 *   4. 14日以上前に更新されたチャット候補を1件ずつ表示します。
 *        y  = 削除する
 *        n  = スキップ (デフォルト: Enter だけでも n)
 *        q  = 途中でやめる
 *   5. セッション情報は .claude-browser-data/ に保存されるので、
 *      次回以降はログイン不要です（Git 管理対象外）。
 *
 * オプション (環境変数):
 *   DAYS_OLD           削除対象の日数しきい値 (既定: 14)
 *   YES_TO_ALL         "1" にすると全件 Y/N を聞かず一括削除 (非推奨)
 *   DRY_RUN            "1" にすると確認はするが実際には削除しない
 */

const { chromium } = require('playwright');
const readline = require('readline');
const path = require('path');

const DAYS_OLD = Number.parseInt(process.env.DAYS_OLD ?? '14', 10);
const YES_TO_ALL = process.env.YES_TO_ALL === '1';
const DRY_RUN = process.env.DRY_RUN === '1';

const BASE_URL = 'https://claude.ai';
const USER_DATA_DIR = path.join(__dirname, '..', '.claude-browser-data');

function createPrompt() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return {
    ask(question) {
      return new Promise((resolve) => rl.question(question, (answer) => resolve(answer)));
    },
    close() {
      rl.close();
    },
  };
}

function formatDate(isoString) {
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;
  return d.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
}

async function fetchJson(request, url, options = {}) {
  const response = await request.fetch(url, options);
  const status = response.status();
  const text = await response.text();
  if (status >= 400) {
    throw new Error(`HTTP ${status} for ${options.method ?? 'GET'} ${url}\n${text.slice(0, 400)}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Expected JSON from ${url}, got: ${text.slice(0, 200)}`);
  }
}

async function ensureLoggedIn(page, prompt) {
  await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  while (true) {
    try {
      const orgs = await fetchJson(page.context().request, `${BASE_URL}/api/organizations`);
      if (Array.isArray(orgs) && orgs.length > 0) return orgs;
    } catch (err) {
      // not logged in yet
    }
    console.log('Claude.ai にログインしてください (ブラウザウィンドウを操作)。');
    await prompt.ask('ログインが完了したら Enter を押してください... ');
  }
}

async function listAllConversations(request, orgUuid) {
  // Claude.ai の chat_conversations は配列をそのまま返す（ページングなし）。
  // 将来的にページングが入った場合に備えて、生レスポンスをログに出して扱う。
  const url = `${BASE_URL}/api/organizations/${orgUuid}/chat_conversations`;
  const data = await fetchJson(request, url);
  if (!Array.isArray(data)) {
    throw new Error(`Unexpected conversations response: ${JSON.stringify(data).slice(0, 200)}`);
  }
  return data;
}

async function deleteConversation(request, orgUuid, convUuid) {
  const url = `${BASE_URL}/api/organizations/${orgUuid}/chat_conversations/${convUuid}`;
  const response = await request.fetch(url, { method: 'DELETE' });
  if (!response.ok() && response.status() !== 204) {
    const body = await response.text();
    throw new Error(`Delete failed: HTTP ${response.status()} ${body.slice(0, 200)}`);
  }
}

async function main() {
  console.log(`対象: ${DAYS_OLD} 日以上前に更新されたチャット`);
  if (DRY_RUN) console.log('(DRY_RUN モード: 実際には削除しません)');
  console.log('');

  const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: false,
    viewport: { width: 1200, height: 800 },
  });
  const page = context.pages()[0] ?? (await context.newPage());
  const prompt = createPrompt();

  try {
    const orgs = await ensureLoggedIn(page, prompt);
    if (orgs.length > 1) {
      console.log('複数の organization が見つかりました。最初のものを使用します:');
      orgs.forEach((o, i) => console.log(`  [${i}] ${o.name} (${o.uuid})`));
    }
    const org = orgs[0];
    console.log(`使用する organization: ${org.name}\n`);

    const conversations = await listAllConversations(context.request, org.uuid);
    const cutoff = Date.now() - DAYS_OLD * 24 * 60 * 60 * 1000;

    const candidates = conversations
      .filter((c) => {
        const ts = new Date(c.updated_at ?? c.created_at).getTime();
        return Number.isFinite(ts) && ts < cutoff;
      })
      .sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));

    console.log(`全 ${conversations.length} 件のうち、削除候補は ${candidates.length} 件です。\n`);
    if (candidates.length === 0) {
      console.log('削除対象はありません。');
      return;
    }

    let deleted = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = 0; i < candidates.length; i++) {
      const conv = candidates[i];
      const title = conv.name && conv.name.trim() !== '' ? conv.name : '（無題）';
      const updated = formatDate(conv.updated_at);
      console.log(`\n[${i + 1}/${candidates.length}] ${updated}`);
      console.log(`  タイトル: ${title}`);
      console.log(`  URL:      ${BASE_URL}/chat/${conv.uuid}`);

      let answer;
      if (YES_TO_ALL) {
        answer = 'y';
      } else {
        answer = (await prompt.ask('  削除しますか？ [y/N/q]: ')).trim().toLowerCase();
      }

      if (answer === 'q') {
        console.log('  中断しました。');
        break;
      }
      if (answer !== 'y') {
        console.log('  → スキップ');
        skipped++;
        continue;
      }

      if (DRY_RUN) {
        console.log('  → (DRY_RUN) 削除したことにします');
        deleted++;
        continue;
      }

      try {
        await deleteConversation(context.request, org.uuid, conv.uuid);
        console.log('  → 削除しました');
        deleted++;
      } catch (err) {
        console.log(`  → 削除失敗: ${err.message}`);
        failed++;
      }
    }

    console.log('\n---------------------------');
    console.log(`削除:   ${deleted} 件`);
    console.log(`スキップ: ${skipped} 件`);
    if (failed > 0) console.log(`失敗:   ${failed} 件`);
    console.log('---------------------------');
  } finally {
    prompt.close();
    await context.close();
  }
}

main().catch((err) => {
  console.error('エラー:', err.message);
  process.exit(1);
});
