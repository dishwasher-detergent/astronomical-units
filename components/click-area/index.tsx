"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { LucideEarth } from "lucide-react";

import { auIncrement } from "@/atoms/au";
import { Button } from "@/components/ui/button";
import { astronaut } from "@/atoms/astronauts";

export function ClickArea() {
  const setClicks = useSetAtom(auIncrement);
  const crew = useAtomValue(astronaut);

  return (
    <Button
      onClick={() => {
        setClicks();
      }}
      className="relative flex h-full w-full flex-none flex-col items-center justify-center overflow-hidden rounded-none border-b bg-muted hover:bg-muted"
    >
      <div className="z-10 flex flex-col items-center text-primary">
        <span>Tap Here</span>
        <span className="text-xl font-bold">+{crew.current + 1}</span>
      </div>
      <div className="absolute -left-4 top-0 h-72 w-72 animate-blob rounded-full bg-green-300 opacity-40 blur-xl filter dark:bg-green-500"></div>
      <div className="animation-delay-2000 absolute -right-4 top-0 h-72 w-72 animate-blob rounded-full bg-yellow-300 opacity-40 blur-xl filter dark:bg-yellow-500"></div>
      <div className="animation-delay-4000 absolute -bottom-8 left-28 h-72 w-72 animate-blob rounded-full bg-pink-300 opacity-40 blur-xl filter dark:bg-pink-500"></div>
    </Button>
  );
}
