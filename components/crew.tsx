"use client";
import { useAtomValue } from "jotai";

import { astronaut } from "@/atoms/astronauts";
import { LucidePersonStanding } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Crew() {
  const crew = useAtomValue(astronaut);

  return (
    <div className="flex-none space-y-2 bg-background p-4 md:border-b">
      <p className="font-semibold">
        {crew.current + 1} Crew Member
        {(crew.current > 1 || crew.current == 0) && "s"}
      </p>
      {crew.current > 0 && (
        <div className="flex flex-row flex-wrap gap-1">
          <LucidePersonStanding className="size-5 text-amber-500 md:size-4" />
          {[...Array(crew.current)].map((_, i) => {
            return (
              <LucidePersonStanding key={i} className="size-5 md:size-4" />
            );
          })}
        </div>
      )}
    </div>
  );
}
