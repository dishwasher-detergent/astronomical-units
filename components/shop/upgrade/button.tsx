"use client";

import { useAtom } from "jotai";
import React from "react";

import { Button } from "@/components/ui/button";
import { au } from "@/atoms/au";

export function UpgradeButton({
  cost,
  name,
  disabled = false,
  increment,
  children,
}: {
  cost: number;
  name: string;
  disabled: boolean;
  increment: (update?: unknown | number) => void;
  children: React.ReactNode;
}) {
  const [auValue, setAu] = useAtom(au);

  return (
    <Button
      className="h-8 md:w-8 md:p-0"
      variant="default"
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
