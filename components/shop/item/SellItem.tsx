"use client";

import { useAtom } from "jotai";
import { WritableAtom } from "jotai";
import { toast } from "sonner";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { LucideHandCoins } from "lucide-react";
import { DyanmicDrawer } from "@/components/ui/dynamic-drawer";
import { formatMoney } from "@/lib/formatters";

interface SellItemProps {
  elementKey: string;
  itemAtom: WritableAtom<any, any, any>;
  details: any;
  currency: {
    update: (update: (current: number) => number) => void;
    name: string;
  };
  getSellPrice: (key: string) => number;
  onSell?: () => void;
}

export function SellItem({
  elementKey,
  itemAtom,
  details,
  currency,
  getSellPrice,
  onSell,
}: SellItemProps) {
  const [itemValue, setItemValue] = useAtom(itemAtom);
  const [open, setOpen] = useState(false);
  const sellPrice = getSellPrice(elementKey);

  const handleSell = () => {
    const newValue =
      typeof itemValue === "number"
        ? itemValue - 1
        : { ...itemValue, value: itemValue.value - 1 };

    setItemValue(newValue);
    currency.update((current) => current + sellPrice);
    toast.error(
      `Sold ${details.name} for ${formatMoney(sellPrice)} ${currency.name}`,
    );
    onSell?.();
  };

  const SellContent = () => (
    <Button variant="destructive" onClick={handleSell} className="w-full">
      Sell For <span className="font-mono">{formatMoney(sellPrice)}</span>{" "}
      {currency.name}
    </Button>
  );

  return (
    <DyanmicDrawer
      title={`Are you sure you want to sell ${details.name}?`}
      description="Equipment is sold at 30% the buy price, if you sell your last
              equipment you lose all upgrades."
      open={open}
      setOpen={setOpen}
      button={
        <Button variant="secondary" size="sm">
          <LucideHandCoins className="size-4" />
          Sell
        </Button>
      }
    >
      <SellContent />
    </DyanmicDrawer>
  );
}
