"use client";
import { useAtomValue } from "jotai";

import { astronaut } from "@/atoms/astronauts";
import { LucidePersonStanding } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Crew() {
  const crew = useAtomValue(astronaut);

  return (
    <div className="flex-none space-y-2 border-t bg-background p-4 md:pr-0">
      <p className="text-xs font-semibold">
        {crew.current} Crew Member
        {(crew.current > 1 || crew.current == 0) && "s"}
      </p>
      {crew.current > 0 && (
        <div className="overflow-y-auto md:max-h-12">
          <div className="flex flex-row flex-wrap gap-1">
            {[...Array(crew.current)].map((_, i) => {
              return <LucidePersonStanding key={i} className="size-4" />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
