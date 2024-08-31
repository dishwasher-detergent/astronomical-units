"use client";

import { useAtomValue, useSetAtom } from "jotai";

import { clicksPerSecond } from "@/atoms/global";
import { auIncrement, auWeight } from "@/atoms/au";
import { LOCALE } from "@/constants/GLOBAL";
import { useMeasure } from "@/hooks/useMeasure";
import { Button } from "@/components/ui/button";

export function ClickArea() {
  const weightValue = useAtomValue(auWeight);
  const setClicks = useSetAtom(auIncrement);

  const measureClicks = useMeasure(clicksPerSecond);

  return (
    <Button
      onClick={({ currentTarget }) => {
        measureClicks(1);
        setClicks();
        currentTarget.blur();
      }}
      className="w-full h-auto aspect-square bg-muted flex flex-col items-center justify-center text-muted-foreground rounded-none hover:bg-muted"
    >
      <span>Click Here</span>
      <span className="text-xl">+{weightValue.toLocaleString(LOCALE)} AU</span>
    </Button>
  );
}
