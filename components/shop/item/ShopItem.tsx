"use client";

import { atom, useAtom, useAtomValue } from "jotai";
import { WritableAtom } from "jotai";
import { toast } from "sonner";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { showElement } from "@/atoms/show";
import { useNextUpgrade } from "@/hooks/useNextUpgrade";
import { Skeleton } from "@/components/ui/skeleton";
import { LucidePlus, LucideTrendingUp } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import { calculateBulkCost, useBulkCosts } from "@/hooks/useItemCost";
import { prestigeUpgrades } from "@/atoms/prestige";

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
  const allUpgrades = useAtomValue(prestigeUpgrades) || {};

  const { cost1, cost10, cost20, cost50, itemCount } = useBulkCosts(elementKey);

  const isShowing = showElementValue[elementKey];
  const Icon = details?.icon || LucidePlus;
  const canAcquire = cost1 <= currency.value && itemCount < maxCount;

  useNextHook?.(isShowing);

  const handlePurchase = (quantity: number = 1) => {
    if (!canAcquire && quantity === 1) return;

    // Get the appropriate cost based on quantity
    let totalCost: number;
    switch (quantity) {
      case 10:
        totalCost = cost10;
        break;
      case 20:
        totalCost = cost20;
        break;
      case 50:
        totalCost = cost50;
        break;
      default:
        totalCost = cost1;
    }

    // Check if we can afford it and haven't hit max count
    if (totalCost > currency.value || itemCount + quantity > maxCount) return;

    // Calculate how many we can actually buy (might be limited by maxCount)
    const actualQuantity = Math.min(quantity, maxCount - itemCount);

    if (actualQuantity <= 0) return;

    // If we're buying less than the requested quantity, recalculate the cost
    let actualCost = totalCost;
    if (actualQuantity < quantity) {
      const discountCount = allUpgrades.upgradeDiscount || 0;
      const discountPercentage = discountCount > 0 ? discountCount * 5 : 0;
      actualCost = calculateBulkCost(
        elementKey,
        itemCount,
        actualQuantity,
        discountPercentage,
      );
    }

    // Update item count with the quantity
    if (typeof itemValue === "number") {
      setItemValue(itemValue + actualQuantity);
    } else {
      // For equipment atoms, we need to pass quantity to the purchase atom
      // The atom has been updated to handle quantity parameter
      setItemValue(actualQuantity);
    }

    // Deduct currency
    currency.update((current) => current - actualCost);

    // Show success toast
    toast.success(
      `Purchased ${actualQuantity} ${details.name} for ${formatMoney(actualCost)} ${currency.name}`,
    );

    onPurchase?.();
  };

  if (isShowing) {
    // Check whether this is a prestige item (with multiplier) or regular equipment
    const isPrestigeUpgrade =
      details.multiplier !== undefined && details.auPerSecond === undefined;
    const isMaxed = itemCount >= maxCount;
    const cantAfford = cost1 > currency.value;

    // Determine if we can afford each quantity
    const canBuy10 = cost10 <= currency.value && itemCount + 10 <= maxCount;
    const canBuy20 = cost20 <= currency.value && itemCount + 20 <= maxCount;
    const canBuy50 = cost50 <= currency.value && itemCount + 50 <= maxCount;

    return (
      <div className="flex w-full flex-col border-b border-dashed px-4 py-3 align-top">
        <div className="mb-2 flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="size-4" />
            <p className="truncate text-lg font-semibold">{details.name}</p>
          </div>
          <Badge
            variant={
              isMaxed ? "destructive" : cantAfford ? "outline" : "default"
            }
            className="ml-auto"
          >
            {itemCount < maxCount
              ? `${itemCount} / ${maxCount === Infinity ? "Unlimited" : maxCount}`
              : "MAX"}
          </Badge>
        </div>
        <div className="mb-2 flex flex-col text-left">
          <p className="mb-2 text-sm">{details.description}</p>
          <div className="text-muted-foreground flex flex-wrap gap-x-6 gap-y-1 text-sm">
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
                  <LucideTrendingUp className="mr-1 size-4 text-green-500" />+
                  <span className="font-mono">
                    {formatMoney(details.auPerSecond)}
                  </span>{" "}
                  AU/s
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 text-sm">
          <p className="font-medium">Current cost:</p>
          <p>
            <span className="font-mono">{formatMoney(cost1)}</span>{" "}
            {currency.name}
          </p>
        </div>

        {/* Add button group for different quantities */}
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="default"
            className="flex-1"
            disabled={!canAcquire}
            onClick={() => handlePurchase(1)}
          >
            Buy 1
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="flex-1"
            disabled={!canBuy10}
            onClick={() => handlePurchase(10)}
            title={`Cost: ${formatMoney(cost10)} ${currency.name}`}
          >
            Buy 10
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="flex-1"
            disabled={!canBuy20}
            onClick={() => handlePurchase(20)}
            title={`Cost: ${formatMoney(cost20)} ${currency.name}`}
          >
            Buy 20
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="flex-1"
            disabled={!canBuy50}
            onClick={() => handlePurchase(50)}
            title={`Cost: ${formatMoney(cost50)} ${currency.name}`}
          >
            Buy 50
          </Button>
        </div>
      </div>
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
