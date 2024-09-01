"use client";

import { useAtom } from "jotai";
import React from "react";

import { au } from "@/atoms/au";
import { useAcquireCost } from "@/hooks/useAcquireCost";
import type { AcquirableElementKey } from "@/types";
import { Badge } from "./ui/badge";

export function AcquireButton({
  elementKey,
  increment,
  children,
}: {
  elementKey: AcquirableElementKey;
  increment: (update?: unknown | number) => void;
  children: React.ReactNode;
}) {
  const [auValue, setAu] = useAtom(au);

  const cost = useAcquireCost(elementKey);

  const canAcquire = cost <= auValue;

  return (
    <button
      className="flex gap-1 flex-row align-top hover:bg-muted px-4 py-2 disabled:text-muted-foreground disabled:cursor-not-allowed"
      disabled={!canAcquire}
      onClick={() => {
        if (canAcquire) {
          increment();
          setAu((current) => current - cost);
        }
      }}
    >
      <div className="flex-1 text-left">{children}</div>
      <div className="flex-none">
        <Badge>{cost} AU</Badge>
      </div>
    </button>
  );
}
