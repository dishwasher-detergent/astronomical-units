"use client";

import { useAtomValue, useSetAtom } from "jotai";

import { auIncrement } from "@/atoms/au";
import { Button } from "@/components/ui/button";
import { crew } from "@/atoms/crew";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { calculateUpgradeMultiplier } from "@/lib/utils";
import { LOCALE } from "@/constants/GLOBAL";
import { DevMode } from "@/components/dev-mode";

export function ClickArea() {
  const setClicks = useSetAtom(auIncrement);
  const crewAtom = useAtomValue(crew);
  const item = EQUIPMENT_LIST.crew;
  const multiplier = calculateUpgradeMultiplier(crewAtom, item);

  return (
    <>
      <Button
        onClick={() => {
          setClicks();
        }}
        className="bg-muted hover:bg-muted relative flex h-full w-full flex-none flex-col items-center justify-center overflow-hidden rounded-none border-b"
      >
        <div className="text-primary z-10 flex flex-col items-center">
          <span>Tap Here</span>
          <span className="text-xl font-semibold">
            +{(crewAtom.value * multiplier + 1).toLocaleString(LOCALE)} AU
          </span>
        </div>
        <div className="animate-blob absolute left-3/5 h-72 w-72 rounded-full bg-green-300 opacity-40 blur-xl filter dark:bg-green-500"></div>
        <div className="animation-delay-2000 animate-blob absolute left-4/5 h-72 w-72 rounded-full bg-yellow-300 opacity-40 blur-xl filter dark:bg-yellow-500"></div>
        <div className="animation-delay-4000 animate-blob absolute left-1/5 h-72 w-72 rounded-full bg-pink-300 opacity-40 blur-xl filter dark:bg-pink-500"></div>
      </Button>
    </>
  );
}
