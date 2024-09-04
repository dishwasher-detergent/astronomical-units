"use client";

import { useAtom } from "jotai";
import React from "react";

import { au } from "@/atoms/au";
import { useAcquireCost } from "@/hooks/useAcquireCost";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";

export function AcquireButton({
  elementKey,
  increment,
  children,
}: {
  elementKey: string;
  increment: (update?: unknown | number) => void;
  children: React.ReactNode;
}) {
  const [auValue, setAu] = useAtom(au);
  const element = EQUIPMENT_LIST[elementKey];

  const cost = useAcquireCost(elementKey);

  const canAcquire = cost <= auValue;

  return (
    <button
      className="flex w-full flex-row gap-4 rounded-lg bg-muted/30 px-4 py-2 align-top hover:bg-muted disabled:cursor-not-allowed disabled:text-muted-foreground md:rounded-none md:bg-background"
      disabled={!canAcquire}
      onClick={() => {
        if (canAcquire) {
          increment();
          setAu((current) => current - cost);
          toast.success(`Purchased ${element.name} for ${cost} AU`);
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
