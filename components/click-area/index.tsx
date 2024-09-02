"use client";

import { useSetAtom } from "jotai";
import { LucideEarth } from "lucide-react";

import { clicksPerSecond } from "@/atoms/global";
import { auIncrement } from "@/atoms/au";
import { useMeasure } from "@/hooks/useMeasure";
import { Button } from "@/components/ui/button";

export function ClickArea() {
  const setClicks = useSetAtom(auIncrement);

  const measureClicks = useMeasure(clicksPerSecond);

  return (
    <Button
      onClick={({ currentTarget }) => {
        measureClicks(1);
        setClicks();
        currentTarget.blur();
      }}
      className="relative flex aspect-video h-auto w-full flex-none flex-col items-center justify-center overflow-hidden rounded-none bg-muted hover:bg-muted md:aspect-square"
    >
      <div className="z-10 text-muted-foreground dark:text-primary">
        <LucideEarth className="mb-2 size-16" />
        <span>Tap Here</span>
      </div>
      <div className="animate-blob absolute -left-4 top-0 h-72 w-72 rounded-full bg-green-300 opacity-40 blur-xl filter dark:bg-green-500"></div>
      <div className="animate-blob animation-delay-2000 absolute -right-4 top-0 h-72 w-72 rounded-full bg-yellow-300 opacity-40 blur-xl filter dark:bg-yellow-500"></div>
      <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-28 h-72 w-72 rounded-full bg-pink-300 opacity-40 blur-xl filter dark:bg-pink-500"></div>
    </Button>
  );
}
