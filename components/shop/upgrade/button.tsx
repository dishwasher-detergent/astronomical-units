"use client";

import { useAtom } from "jotai";
import React from "react";

import { Button } from "@/components/ui/button";
import { au } from "@/atoms/au";

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
  const [auValue, setAu] = useAtom(au);

  return (
    <Button
      size="icon"
      className="size-8"
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
}
