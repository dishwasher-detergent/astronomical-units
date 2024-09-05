"use client";
import { useAtomValue } from "jotai";
import { LucidePersonStanding } from "lucide-react";

import { astronaut } from "@/atoms/astronauts";
import { UpgradeButton } from "./shop/upgrade/button";
import { DisplayUpgrade } from "./display/upgrade";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";

export function Crew() {
  const crew = useAtomValue(astronaut);
  const item = EQUIPMENT_LIST.astronaut;

  return (
    <div className="flex-none space-y-2 bg-background p-4 md:border-b">
      <p className="font-semibold">
        {crew.value + 1} Crew Member
        {crew.value > 1 && "s"}
      </p>
      <div className="flex flex-row flex-wrap gap-1">
        <LucidePersonStanding className="size-5 text-amber-500 md:size-4" />
        {[...Array(crew.value)].map((_, i) => {
          return <LucidePersonStanding key={i} className="size-5 md:size-4" />;
        })}
      </div>
      <DisplayUpgrade item={item} equipment={crew} primaryKey="astronaut" />
    </div>
  );
}
