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
      className="sticky top-0 w-full h-auto aspect-square bg-muted flex flex-col items-center justify-center text-muted-foreground rounded-none hover:bg-muted"
    >
      <LucideOrbit className="size-16 mb-2" />
      <span>Click Here</span>
    </Button>
  );
}
