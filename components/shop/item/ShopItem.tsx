"use client";

import { atom, useAtom, useAtomValue } from "jotai";
import { WritableAtom } from "jotai";
import { toast } from "sonner";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";
import { Button } from "@/components/ui/button";
import { showElement } from "@/atoms/show";
import { useNextUpgrade } from "@/hooks/useNextUpgrade";
import { Skeleton } from "@/components/ui/skeleton";
import { LucidePlus, LucideTrendingUp } from "lucide-react";
import { Equipment } from "@/types";
import { Card } from "@/components/ui/card";

interface ShopItemProps {
  elementKey: string;
  itemAtom: WritableAtom<any, any, any>;
  details: any; // Allow any type to support both Equipment and Upgrade types
  currency: {
    value: number;
    update: (update: (current: number) => number) => void;
    name: string;
  };
  getCost: (key: string) => number;
  onPurchase?: () => void;
  nextUpgrade?: WritableAtom<string, [], void>;
  useNextHook?: (isShowing: boolean) => void;
  maxCount?: number;
}

export function ShopItem({
  elementKey,
  itemAtom,
  details,
  currency,
  getCost,
  onPurchase,
  nextUpgrade,
  useNextHook = useNextUpgrade,
  maxCount = Infinity,
}: ShopItemProps) {
  const showElementValue = useAtomValue(showElement);
  const next = useAtomValue(nextUpgrade ?? atom(""));
  const [itemValue, setItemValue] = useAtom(itemAtom);

  const isShowing = showElementValue[elementKey];
  const Icon = details?.icon || LucidePlus;
  const itemCount =
    typeof itemValue === "number" ? itemValue : itemValue?.value || 0;
  const cost = getCost(elementKey);
  const canAcquire = cost <= currency.value && itemCount < maxCount;

  useNextHook?.(isShowing);

  const handlePurchase = () => {
    if (canAcquire) {
      setItemValue(
        typeof itemValue === "number"
          ? itemValue + 1
          : { ...itemValue, value: itemValue.value + 1 },
      );
      currency.update((current) => current - cost);
      toast.success(
        `Purchased ${details.name} for ${cost.toLocaleString(LOCALE, NUMBER_OPTIONS)} ${currency.name}`,
      );
      onPurchase?.();
    }
  };

  if (isShowing) {
    // Check whether this is a prestige item (with multiplier) or regular equipment
    const isPrestigeUpgrade =
      details.multiplier !== undefined && details.auPerSecond === undefined;
    const isMaxed = itemCount >= maxCount;
    const cantAfford = cost > currency.value;

    return (
      <button
        className="flex w-full flex-col border-b border-dashed px-4 py-3 align-top hover:bg-muted/50 disabled:cursor-not-allowed disabled:text-muted-foreground"
        disabled={!canAcquire}
        onClick={handlePurchase}
      >
        <div className="mb-2 flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="size-4" />
            <p className="truncate text-lg font-semibold">{details.name}</p>
          </div>
          <Badge
            variant={
              isMaxed ? "destructive" : cantAfford ? "outline-solid" : "default"
            }
            className="ml-auto"
          >
            {itemCount < maxCount
              ? `${itemCount} / ${maxCount === Infinity ? "∞" : maxCount}`
              : "MAX"}
          </Badge>
        </div>
        <div className="mb-2 flex flex-col text-left">
          <p className="mb-2 text-sm">{details.description}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
            {isPrestigeUpgrade ? (
              <div className="flex items-center">
                <LucideTrendingUp className="mr-1 size-4 text-blue-500" />
                <span>
                  {details.multiplier > 1
                    ? `+${((details.multiplier - 1) * 100).toFixed(0)}% boost`
                    : `${((1 - details.multiplier) * 100).toFixed(0)}% reduction`}
                </span>
              </div>
            ) : (
              details.auPerSecond > 0 && (
                <div className="flex items-center">
                  <LucideTrendingUp className="mr-1 size-4 text-green-500" />
                  <span>
                    +
                    {details.auPerSecond.toLocaleString(LOCALE, NUMBER_OPTIONS)}{" "}
                    AU/s
                  </span>
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 text-sm">
          <span className="font-medium">Current cost:</span>
          {cost.toLocaleString(LOCALE, NUMBER_OPTIONS)} {currency.name}
        </div>
      </button>
    );
  } else if (next === elementKey) {
    return (
      <div className="w-full overflow-hidden border-b px-4 py-3">
        <div className="flex-1 space-y-2 text-left">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  return null;
}
