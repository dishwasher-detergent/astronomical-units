"use client";

import { useAtom } from "jotai";
import React from "react";

import { au } from "@/atoms/au";
import { toast } from "sonner";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { useSellCost } from "@/hooks/useSellCost";
import { Button } from "@/components/ui/button";
import { LOCALE } from "@/constants/GLOBAL";

export function SellButton({
  elementKey,
  decrement,
  children,
}: {
  elementKey: string;
  decrement: (update?: unknown | number) => void;
  children: React.ReactNode;
}) {
  const [auValue, setAu] = useAtom(au);
  const element = EQUIPMENT_LIST[elementKey];

  const cost = useSellCost(elementKey);

  return (
    <Button
      variant="destructive"
      size="sm"
      className="h-6 px-2 text-xs"
      onClick={() => {
        decrement();
        setAu((current) => current + cost);
        toast.error(
          `Sold ${element.name} for ${cost.toLocaleString(LOCALE)} AU`,
        );
      }}
    >
      {children}
      {cost.toLocaleString(LOCALE)} AU
    </Button>
  );
}
