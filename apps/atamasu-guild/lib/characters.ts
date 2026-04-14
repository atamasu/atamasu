export type GuildCategory = "honmaru" | "frontline" | "creative" | "knowledge";

export type Character = {
  id: string;
  name: string;
  emoji: string;
  role: string;
  greeting: string;
  category: GuildCategory;
  color: string;
  agentFile: string;
};

export const CATEGORY_META: Record<
  GuildCategory,
  { label: string; description: string; color: string }
> = {
  honmaru: {
    label: "本丸(経営)",
    description: "戦略を練る、城の中枢",
    color: "from-amber-200/60 to-rose-200/60",
  },
  frontline: {
    label: "前線部隊(集客・事業)",
    description: "クライアントへ最前線で切り込む",
    color: "from-sky-200/60 to-indigo-200/60",
  },
  creative: {
    label: "創造部隊(制作)",
    description: "言葉・絵・コードでカタチにする",
    color: "from-pink-200/60 to-fuchsia-200/60",
  },
  knowledge: {
    label: "知の部隊(分析・研究)",
    description: "数字と業界の動きを読み解く",
    color: "from-emerald-200/60 to-teal-200/60",
  },
};

export const CHARACTERS: Character[] = [
  {
    id: "keiei",
    name: "経営戦略会議",
    emoji: "👑",
    role: "経営企画・戦略立案・年間計画",
    greeting:
      "代表、本日の議題は何にしましょうか。じっくり腰を据えて、戦略を練りましょう。",
    category: "honmaru",
    color: "bg-amber-100",
    agentFile: "keiei-kaigi",
  },
  {
    id: "ads",
    name: "広告運用ギルド",
    emoji: "🎯",
    role: "マーケ戦略・広告運用・媒体選定",
    greeting:
      "おかえりなさい、代表🌸 今日はどの案件から見ていきましょうか?数字、お待ちしておりました。",
    category: "frontline",
    color: "bg-sky-100",
    agentFile: "ads-guild",
  },
  {
    id: "sns",
    name: "SNS運用ギルド",
    emoji: "⚔️",
    role: "SNS運用・DM・リード獲得",
    greeting:
      "代表!今日もバズ取りにいきましょ⚔️ どのSNS攻めます?Threads?Instagram?",
    category: "frontline",
    color: "bg-indigo-100",
    agentFile: "sns-guild",
  },
  {
    id: "cs",
    name: "伴走サポート隊",
    emoji: "🛡",
    role: "カスタマーサクセス・クライアント伴走",
    greeting:
      "代表、お疲れさまです🛡 クライアントさん、今みんな元気ですよ。気になる院、ありますか?",
    category: "frontline",
    color: "bg-blue-100",
    agentFile: "cs-guild",
  },
  {
    id: "writing",
    name: "ライティングギルド",
    emoji: "📜",
    role: "コピーライティング・ブログ・LP文章",
    greeting:
      "代表、今日はどんな言葉を紡ぎましょうか?📜 広告コピー?SNS投稿?ブログ?",
    category: "creative",
    color: "bg-pink-100",
    agentFile: "writing-guild",
  },
  {
    id: "design",
    name: "デザインギルド",
    emoji: "🎨",
    role: "バナー構成・LP構成・ブランディング",
    greeting:
      "ようこそ🎨 今日はどんなデザインにしましょう?色味から?構成から?",
    category: "creative",
    color: "bg-fuchsia-100",
    agentFile: "design-guild",
  },
  {
    id: "dev",
    name: "開発ギルド",
    emoji: "⚒️",
    role: "LP実装・HP制作・コーディング",
    greeting:
      "代表、いらっしゃいませ⚒️ 何を実装しましょうか?LP?HP更新?AIまわり?",
    category: "creative",
    color: "bg-rose-100",
    agentFile: "dev-guild",
  },
  {
    id: "rd",
    name: "新規開発ラボ",
    emoji: "🚀",
    role: "R&D・新規AIプロダクト・整骨院ポータル",
    greeting:
      "おっ、代表🚀 新しいプロダクトの相談ですか?わくわくしますね、何企んでるんです?",
    category: "creative",
    color: "bg-purple-100",
    agentFile: "rd-lab",
  },
  {
    id: "data",
    name: "データ分析ギルド",
    emoji: "🔮",
    role: "広告KPI分析・レポート・改善コメント",
    greeting:
      "代表、数字が面白いこと言ってる案件がありますよ🔮 どこから見ます?",
    category: "knowledge",
    color: "bg-emerald-100",
    agentFile: "data-guild",
  },
  {
    id: "research",
    name: "整骨院リサーチ隊",
    emoji: "🦴",
    role: "整骨院業界リサーチ・競合調査・トレンド",
    greeting:
      "代表、業界情報、最近おもろい動きありましたよ🦴 聞きますか?競合?制度?トレンド?",
    category: "knowledge",
    color: "bg-teal-100",
    agentFile: "research-guild",
  },
];
