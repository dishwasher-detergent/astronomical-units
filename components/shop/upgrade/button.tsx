"use client";

import { useAtom } from "jotai";
import React, { forwardRef } from "react";

import { Button } from "@/components/ui/button";
import { au } from "@/atoms/au";

export const UpgradeButton = forwardRef<
  HTMLButtonElement,
  {
    cost: number;
    disabled: boolean;
    increment: (update?: unknown | number) => void;
    children: React.ReactNode;
  }
>(({ cost, disabled = false, increment, children }, ref) => {
  const [auValue, setAu] = useAtom(au);

  return (
    <Button
      ref={ref}
      size="icon"
      className="size-6"
      variant="outline"
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          increment();
          setAu((current) => current - cost);
        }
      }}
    >
      {children}
    </Button>
  );
});
