import TownSquare from "./components/TownSquare";

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fef3c7_0%,#fde2ec_50%,#e9d5ff_100%)] pb-16">
      {/* ヘッダー(城の入口) */}
      <header className="border-b-4 border-stone-800 bg-white/60 px-4 py-6 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-stone-800 bg-amber-50 px-4 py-1 text-xs font-bold text-stone-700">
            <span>🏰</span>
            <span>atamasu Guild / アタマスギルド</span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
            ようこそ、代表
          </h1>
          <p className="max-w-xl text-xs text-stone-600 sm:text-sm">
            話しかけたいギルドをクリックしてください。
            <br className="sm:hidden" />
            各チームが「今日の相談」にお応えします🌸
          </p>
        </div>
      </header>

      {/* タウンスクエア */}
      <TownSquare />

      {/* フッター */}
      <footer className="mx-auto max-w-6xl px-4 pt-4 text-center text-[11px] text-stone-500">
        <p>© 株式会社atamasu — Phase 1 (UIプロトタイプ)</p>
        <p className="mt-1">
          Phase 2でClaude APIに接続して、各ギルドが実際に会話するようになります。
        </p>
      </footer>
    </main>
  );
}
