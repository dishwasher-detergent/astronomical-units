"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useRef, useEffect } from "react";

import {
  auIncrement,
  clickValueAtom,
  equipmentProductionRates,
} from "@/atoms/au";
import { Button } from "@/components/ui/button";
import { crew } from "@/atoms/crew";
import { LOCALE } from "@/constants/GLOBAL";
import { prestigeMultiplier, prestigeUpgrades } from "@/atoms/prestige";
import { useClickParticles } from "./click-particles";
import { useIsMobile } from "@/hooks/use-mobile";

export function ClickArea() {
  const setClicks = useSetAtom(auIncrement);
  const multiplier = useAtomValue(prestigeMultiplier);
  const crewAtom = useAtomValue(crew);
  const clickValue = useAtomValue(clickValueAtom);
  const allUpgrades = useAtomValue(prestigeUpgrades) || {};
  const containerRef = useRef<HTMLDivElement>(null);
  const productionRates = useAtomValue(equipmentProductionRates);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  const auPerSecond = [...productionRates.values()].reduce((a, b) => a + b, 0);

  const { renderParticles, addParticle, addPassiveParticle } =
    useClickParticles();

  const handleClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left || 0);
    const y = e.clientY - (rect?.top || 0);

    addParticle(x, y, clickValue, false);

    setClicks();
  };

  const triggerParticleInCenter = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      addParticle(centerX, centerY, clickValue, false);
    }

    setClicks();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Space" || e.key === " ") {
      e.preventDefault();
      triggerParticleInCenter();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [clickValue]);

  useEffect(() => {
    if (auPerSecond <= 0) return;

    const containerWidth = containerRef.current?.clientWidth || 0;
    const containerHeight = containerRef.current?.clientHeight || 0;

    if (containerWidth === 0 || containerHeight === 0) return;

    const interval = setInterval(() => {
      addPassiveParticle(containerWidth, containerHeight, auPerSecond);
    }, 1000);

    return () => clearInterval(interval);
  }, [auPerSecond]);

  return (
    <div ref={containerRef} className="relative h-full min-h-48 w-full">
      {renderParticles()}
      <Button
        ref={buttonRef}
        onClick={handleClick}
        tabIndex={0}
        className="bg-primary hover:bg-primary relative flex h-full min-h-48 w-full flex-none flex-col items-center justify-center overflow-hidden rounded-none"
      >
        <div className="text-primary-foreground z-10 flex flex-col items-center">
          {isMobile ? (
            <span>Tap Here</span>
          ) : (
            <span>Click Here or Press Space</span>
          )}
          <span className="text-xl font-semibold">
            +{((crewAtom.value + 1) * multiplier).toLocaleString(LOCALE)} AU
          </span>
          {allUpgrades.preciousFinds > 0 && (
            <span className="text-xs">
              {allUpgrades.preciousFinds * 7}% chance for +50% bonus
            </span>
          )}
        </div>
      </Button>
    </div>
  );
}
