"use client";

import { useAtom } from "jotai";

import { au } from "@/atoms/au";
import { useAcquireCost } from "@/hooks/useAcquireCost";
import type { AcquirableElementKey } from "@/types";
import { Button } from "@/components/ui/button";

export function AcquireButton({
  elementKey,
  increment,
  isSmall = false,
}: {
  elementKey: AcquirableElementKey;
  increment: (update?: unknown) => void;
  isSmall?: boolean;
}) {
  const [auValue, setAu] = useAtom(au);

  const cost = useAcquireCost(elementKey);

  const canAcquire = cost <= auValue;

  return (
    <Button
      size="sm"
      disabled={!canAcquire}
      onClick={() => {
        if (canAcquire) {
          increment();
          setAu((current) => current - cost);
        }
      }}
    >
      {cost} AU
    </Button>
  );
}
