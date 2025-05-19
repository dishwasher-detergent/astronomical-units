"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useRef, useState } from "react";

import { addAu, auIncrement, clickValueAtom } from "@/atoms/au";
import { Button } from "@/components/ui/button";
import { crew } from "@/atoms/crew";
import { LOCALE } from "@/constants/GLOBAL";
import { prestigeMultiplier, prestigeUpgrades } from "@/atoms/prestige";
import { useClickParticles } from "./click-particles";
import { animationsEnabled } from "@/atoms/ui";

export function ClickArea() {
  const setClicks = useSetAtom(auIncrement);
  const addAuDirectly = useSetAtom(addAu);
  const multiplier = useAtomValue(prestigeMultiplier);
  const crewAtom = useAtomValue(crew);
  const clickValue = useAtomValue(clickValueAtom);
  const allUpgrades = useAtomValue(prestigeUpgrades) || {};
  const showAnimations = useAtomValue(animationsEnabled);
  const containerRef = useRef<HTMLDivElement>(null);

  const { renderParticles, addParticle } = useClickParticles();

  const handleClick = (e: React.MouseEvent) => {
    let valuePerClick = clickValue;
    let isBonus = false;

    const preciousFindsLevel = allUpgrades.preciousFinds || 0;
    if (preciousFindsLevel > 0) {
      const bonusChance = preciousFindsLevel * 0.07;
      if (Math.random() < bonusChance) {
        const bonusValue = valuePerClick * 0.5;
        isBonus = true;
        valuePerClick += bonusValue;
      }
    }

    if (showAnimations) {
      const rect = containerRef.current?.getBoundingClientRect();
      const x = e.clientX - (rect?.left || 0);
      const y = e.clientY - (rect?.top || 0);

      if (isBonus) {
        addParticle(x, y, clickValue, false);
        addParticle(x, y - 30, valuePerClick, true);
      } else {
        addParticle(x, y, valuePerClick, false);
      }
    }

    addAuDirectly(valuePerClick);
  };

  return (
    <div ref={containerRef} className="relative h-full min-h-48 w-full">
      {showAnimations && renderParticles()}
      <Button
        onClick={handleClick}
        className="bg-muted hover:bg-muted relative flex h-full min-h-48 w-full flex-none flex-col items-center justify-center overflow-hidden rounded-none border-b"
      >
        <div className="text-primary z-10 flex flex-col items-center">
          <span>Tap Here</span>
          <span className="text-xl font-semibold">
            +{((crewAtom.value + 1) * multiplier).toLocaleString(LOCALE)} AU
          </span>
          {allUpgrades.preciousFinds > 0 && (
            <span className="text-muted-foreground text-xs">
              {allUpgrades.preciousFinds * 7}% chance for +50% bonus
            </span>
          )}
        </div>
      </Button>
    </div>
  );
}
