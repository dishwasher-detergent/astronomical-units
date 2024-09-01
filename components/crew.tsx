"use client";
import { useAtomValue } from "jotai";

import { astronaut } from "@/atoms/astronauts";
import { LucidePersonStanding } from "lucide-react";

export function Crew() {
  const crew = useAtomValue(astronaut);

  return (
    <div className="sticky top-0 p-4 space-y-2 border-t bg-background">
      {crew.current > 0 && (
        <div className="flex flex-row gap-1 flex-wrap">
          {[...Array(crew.current)].map((_, i) => {
            return <LucidePersonStanding key={i} className="size-4" />;
          })}
        </div>
      )}
      <p className="text-xs font-semibold">
        {crew.current} Crew Member
        {(crew.current > 1 || crew.current == 0) && "s"}
      </p>
    </div>
  );
}
