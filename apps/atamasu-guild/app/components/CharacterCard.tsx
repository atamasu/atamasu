"use client";

import { Character } from "@/lib/characters";

type Props = {
  character: Character;
  onClick: (c: Character) => void;
};

export default function CharacterCard({ character, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={() => onClick(character)}
      className={`group relative flex flex-col items-center gap-2 rounded-2xl border-4 border-stone-800 ${character.color} p-4 text-stone-800 shadow-[0_4px_0_0_#1c1917] transition-all hover:-translate-y-1 hover:shadow-[0_6px_0_0_#1c1917] active:translate-y-0 active:shadow-[0_2px_0_0_#1c1917]`}
    >
      {/* ドットキャラの足場(台座) */}
      <div className="relative">
        <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-stone-800 bg-white/80 text-5xl shadow-inner transition-transform group-hover:scale-110">
          <span className="animate-bounce-slow">{character.emoji}</span>
        </div>
        <div className="absolute -bottom-1 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-stone-800/20 blur-sm" />
      </div>

      {/* 名前 */}
      <h3 className="mt-1 text-center text-sm font-bold leading-tight">
        {character.name}
      </h3>
      <p className="text-center text-[10px] leading-tight text-stone-600">
        {character.role}
      </p>

      {/* ホバー時の吹き出しアイコン */}
      <div className="pointer-events-none absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-stone-800 bg-white text-xs opacity-0 transition-opacity group-hover:opacity-100">
        💬
      </div>
    </button>
  );
}
