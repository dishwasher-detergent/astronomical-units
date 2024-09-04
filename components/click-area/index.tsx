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
      className="relative flex h-full w-full flex-none flex-col items-center justify-center overflow-hidden rounded-none border-b bg-muted hover:bg-muted"
    >
      <div className="z-10 flex flex-col items-center text-primary">
        <LucideEarth className="mb-2 size-8" />
        <span>Tap Here</span>
      </div>
      <div className="absolute -left-4 top-0 h-72 w-72 animate-blob rounded-full bg-green-300 opacity-40 blur-xl filter dark:bg-green-500"></div>
      <div className="animation-delay-2000 absolute -right-4 top-0 h-72 w-72 animate-blob rounded-full bg-yellow-300 opacity-40 blur-xl filter dark:bg-yellow-500"></div>
      <div className="animation-delay-4000 absolute -bottom-8 left-28 h-72 w-72 animate-blob rounded-full bg-pink-300 opacity-40 blur-xl filter dark:bg-pink-500"></div>
    </Button>
  );
}
