"use client";

import { useState } from "react";
import { CATEGORY_META, CHARACTERS, Character, GuildCategory } from "@/lib/characters";
import CharacterCard from "./CharacterCard";
import SpeechBubble from "./SpeechBubble";

const CATEGORY_ORDER: GuildCategory[] = [
  "honmaru",
  "frontline",
  "creative",
  "knowledge",
];

export default function TownSquare() {
  const [active, setActive] = useState<Character | null>(null);

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
        {CATEGORY_ORDER.map((category) => {
          const members = CHARACTERS.filter((c) => c.category === category);
          const meta = CATEGORY_META[category];
          return (
            <section key={category}>
              <div
                className={`mb-4 rounded-2xl border-4 border-stone-800 bg-gradient-to-r ${meta.color} px-5 py-3 shadow-[0_4px_0_0_#1c1917]`}
              >
                <h2 className="text-lg font-bold text-stone-900">
                  {meta.label}
                </h2>
                <p className="text-xs text-stone-700">{meta.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {members.map((c) => (
                  <CharacterCard
                    key={c.id}
                    character={c}
                    onClick={setActive}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <SpeechBubble character={active} onClose={() => setActive(null)} />
    </>
  );
}
