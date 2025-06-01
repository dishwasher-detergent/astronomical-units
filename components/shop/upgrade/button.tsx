"use client";

import { useSetAtom } from "jotai";
import React, { useState, useRef, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { au } from "@/atoms/au";

const HOLD_DELAY = 500;
const HOLD_INTERVAL = 100;

export function UpgradeButton({
  cost,
  disabled = false,
  increment,
  children,
}: {
  cost: number;
  disabled: boolean;
  increment: (update?: unknown | number) => void;
  children: React.ReactNode;
}) {
  const setAu = useSetAtom(au);
  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePurchase = useCallback(() => {
    if (!disabled) {
      increment();
      setAu((current) => current - cost);
    }
  }, [disabled, increment, setAu, cost]);

  const startHolding = useCallback(() => {
    if (disabled) return;
    setIsHolding(true);
    timeoutRef.current = setTimeout(() => {
      handlePurchase();
      intervalRef.current = setInterval(() => {
        handlePurchase();
      }, HOLD_INTERVAL);
    }, HOLD_DELAY);
  }, [disabled, handlePurchase]);

  const stopHolding = useCallback(() => {
    setIsHolding(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleClick = () => {
    if (!isHolding && !intervalRef.current && !timeoutRef.current) {
      handlePurchase();
    }
  };

  return (
    <Button
      className="md:size-8 md:p-0"
      variant="default"
      disabled={disabled}
      onClick={handleClick}
      onMouseDown={() => {
        if (disabled) return;
        startHolding();
      }}
      onMouseUp={stopHolding}
      onMouseLeave={stopHolding}
      onTouchStart={() => {
        if (disabled) return;
        startHolding();
      }}
      onTouchEnd={stopHolding}
    >
      {children}
    </Button>
  );
}
