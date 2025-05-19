"use client";

import { useAtomValue, useSetAtom } from "jotai";

import { auIncrement } from "@/atoms/au";
import { Button } from "@/components/ui/button";
import { crew } from "@/atoms/crew";
import { LOCALE } from "@/constants/GLOBAL";
import { prestigeMultiplier } from "@/atoms/prestige";

export function ClickArea() {
  const setClicks = useSetAtom(auIncrement);
  const multiplier = useAtomValue(prestigeMultiplier);
  const crewAtom = useAtomValue(crew);

  return (
    <>
      <Button
        onClick={() => {
          setClicks();
        }}
        className="bg-muted hover:bg-muted relative flex h-full min-h-48 w-full flex-none flex-col items-center justify-center overflow-hidden rounded-none border-b"
      >
        <div className="text-primary z-10 flex flex-col items-center">
          <span>Tap Here</span>
          <span className="text-xl font-semibold">
            +{((crewAtom.value + 1) * multiplier).toLocaleString(LOCALE)} AU
          </span>
        </div>{" "}
      </Button>
    </>
  );
}
