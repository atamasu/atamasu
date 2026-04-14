"use client";

import { Character } from "@/lib/characters";

type Props = {
  character: Character | null;
  onClose: () => void;
};

export default function SpeechBubble({ character, onClose }: Props) {
  if (!character) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border-4 border-stone-800 bg-white px-6 py-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* キャラヘッダー */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-stone-800 bg-amber-50 text-4xl shadow-md">
            {character.emoji}
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              {character.name}
            </h2>
            <p className="text-xs text-stone-500">{character.role}</p>
          </div>
        </div>

        {/* セリフ */}
        <div className="relative rounded-2xl border-2 border-stone-800 bg-amber-50 p-5 text-stone-800">
          <p className="text-base leading-7">{character.greeting}</p>
        </div>

        {/* アクションボタン */}
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="flex-1 rounded-full border-2 border-stone-800 bg-stone-800 px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:shadow-lg"
            onClick={onClose}
          >
            💬 相談する(近日対応)
          </button>
          <button
            type="button"
            className="rounded-full border-2 border-stone-800 bg-white px-6 py-3 text-sm font-bold text-stone-800 transition-transform hover:-translate-y-0.5 hover:shadow-lg"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] text-stone-400">
          Phase 2でAI会話が有効になります🌸
        </p>
      </div>
    </div>
  );
}
