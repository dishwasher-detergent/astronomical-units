"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { LucideOrbit } from "lucide-react";

import { clicksPerSecond } from "@/atoms/global";
import { auIncrement, auWeight } from "@/atoms/au";
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
      className="flex aspect-square h-auto w-full flex-none flex-col items-center justify-center rounded-none bg-muted text-muted-foreground hover:bg-muted"
    >
      <LucideOrbit className="mb-2 size-16" />
      <span>Click Here</span>
    </Button>
  );
}
