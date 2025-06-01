"use client";

import { useAtom, useAtomValue } from "jotai";
import { WritableAtom } from "jotai";
import React, { useMemo, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { showElement } from "@/atoms/show";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideLock, LucidePlus } from "lucide-react";
import { formatMoney } from "@/lib/formatters";
import { calculateBulkCost, useBulkCosts } from "@/hooks/useItemCost";
import { prestigeUpgrades } from "@/atoms/prestige";

interface ShopItemProps {
  elementKey: string;
  itemAtom: WritableAtom<any, any, any>;
  details: any;
  currency: {
    value: number;
    update: (update: (current: number) => number) => void;
    name: string;
  };
  next?: string;
  maxCount?: number;
}

export function ShopItem({
  elementKey,
  itemAtom,
  details,
  currency,
  next,
  maxCount = Infinity,
}: ShopItemProps) {
  const showElementValue = useAtomValue(showElement);
  const [itemValue, setItemValue] = useAtom(itemAtom);
  const allUpgrades = useAtomValue(prestigeUpgrades) || {};

  const { cost1, cost5, cost10, cost20, itemCount } = useBulkCosts(elementKey);

  const isShowing = useMemo(
    () => showElementValue[elementKey],
    [showElementValue, elementKey],
  );
  const Icon = useMemo(() => details?.icon || LucidePlus, [details]);
  const canAcquire = useMemo(
    () => cost1 <= currency.value && itemCount < maxCount,
    [cost1, currency.value, itemCount, maxCount],
  );

  const handlePurchase = useCallback(
    (quantity: number = 1) => {
      if (!canAcquire && quantity === 1) return;
      if (itemCount >= maxCount) return;

      const isPrestigeUpgrade =
        details.multiplier !== undefined && details.auPerSecond === undefined;

      let totalCost: number;
      switch (quantity) {
        case 5:
          totalCost = cost5;
          break;
        case 10:
          totalCost = cost10;
          break;
        case 20:
          totalCost = cost20;
          break;
        default:
          totalCost = cost1;
      }

      if (totalCost > currency.value || itemCount + quantity > maxCount) return;
      const actualQuantity = Math.min(quantity, maxCount - itemCount);

      if (actualQuantity <= 0) return;

      let actualCost = totalCost;
      if (actualQuantity < quantity) {
        if (isPrestigeUpgrade) {
          actualCost = cost1 * actualQuantity;
        } else {
          const discountCount = allUpgrades.upgradeDiscount || 0;
          const discountPercentage = discountCount > 0 ? discountCount * 5 : 0;
          actualCost = calculateBulkCost(
            elementKey,
            itemCount,
            actualQuantity,
            discountPercentage,
          );
        }
      }

      const baseValue = typeof itemValue === "number" ? itemValue : 0;
      const newItemValue = Math.min(baseValue + actualQuantity, maxCount);
      setItemValue(newItemValue);

      currency.update((current) => current - actualCost);
    },
    [
      canAcquire,
      itemCount,
      maxCount,
      cost1,
      cost5,
      cost10,
      cost20,
      currency,
      details,
      elementKey,
      itemValue,
      setItemValue,
      allUpgrades,
    ],
  );

  if (isShowing) {
    const isPrestigeUpgrade =
      details.multiplier !== undefined && details.auPerSecond === undefined;
    const remainingCount = maxCount - itemCount;
    const canBuy5 = cost5 <= currency.value && remainingCount >= 5;
    const canBuy10 = cost10 <= currency.value && remainingCount >= 10;
    const canBuy20 = cost20 <= currency.value && remainingCount >= 20;

    return (
      <article className="w-full border-b border-dashed px-4 py-3">
        <header className="flex items-start justify-between">
          <div>
            <h3 className="flex items-center gap-2">
              <Icon className="size-4" aria-hidden="true" />
              <span className="truncate">{details.name}</span>
            </h3>
            <dl className="text-muted-foreground m-0 flex items-center gap-1 text-sm">
              {isPrestigeUpgrade ? (
                <dd>
                  {details.multiplier > 1
                    ? `+${((details.multiplier - 1) * 100).toFixed(0)}% boost`
                    : `${((1 - details.multiplier) * 100).toFixed(0)}% reduction`}
                </dd>
              ) : (
                details.auPerSecond > 0 && (
                  <>
                    <dd className="font-mono">
                      +{formatMoney(details.auPerSecond)}
                    </dd>
                    <dt>AU/s</dt>
                  </>
                )
              )}
            </dl>
          </div>
          <output
            aria-label="Current count"
            className="text-muted-foreground text-3xl font-bold"
          >
            {itemCount < maxCount ? itemCount : "MAX"}
            {maxCount !== Infinity && remainingCount > 0 && `/${maxCount}`}
          </output>
        </header>
        <footer className="mt-3">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Purchase options"
          >
            <div className="flex flex-1 flex-col items-center gap-1">
              <span className="text-muted-foreground text-xs font-semibold">
                1x
              </span>
              <Button
                variant="default"
                className="w-full px-0.5 text-xs md:h-8"
                disabled={!canAcquire}
                onClick={() => handlePurchase(1)}
              >
                {formatMoney(cost1)} {currency.name}
              </Button>
            </div>
            {maxCount >= 5 && (
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-muted-foreground text-xs font-semibold">
                  5x
                </span>
                <Button
                  variant="secondary"
                  className="w-full flex-1 px-0.5 text-xs md:h-8"
                  disabled={!canBuy5}
                  onClick={() => handlePurchase(5)}
                  title={`Cost: ${formatMoney(cost5)} ${currency.name}`}
                >
                  {formatMoney(cost5)} {currency.name}
                </Button>
              </div>
            )}
            {maxCount >= 10 && (
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-muted-foreground text-xs font-semibold">
                  10x
                </span>
                <Button
                  variant="secondary"
                  className="w-full flex-1 px-0.5 text-xs md:h-8"
                  disabled={!canBuy10}
                  onClick={() => handlePurchase(10)}
                  title={`Cost: ${formatMoney(cost10)} ${currency.name}`}
                >
                  {formatMoney(cost10)} {currency.name}
                </Button>
              </div>
            )}
            {maxCount >= 20 && (
              <div className="flex flex-1 flex-col items-center gap-1">
                <span className="text-muted-foreground text-xs font-semibold">
                  20x
                </span>
                <Button
                  variant="secondary"
                  className="w-full flex-1 px-0.5 text-xs md:h-8"
                  disabled={!canBuy20}
                  onClick={() => handlePurchase(20)}
                  title={`Cost: ${formatMoney(cost20)} ${currency.name}`}
                >
                  {formatMoney(cost20)} {currency.name}
                </Button>
              </div>
            )}
          </div>
        </footer>
      </article>
    );
  } else if (next === elementKey) {
    return (
      <article
        aria-busy="true"
        aria-label="Loading shop item"
        className="w-full overflow-hidden border-b px-4 py-3"
      >
        <header className="space-y-2 text-left">
          <div className="flex flex-row items-center gap-2">
            <LucideLock className="size-4" />
            <p>
              Unlocked After Earning {details.threshold} {currency.name}
            </p>
          </div>
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-32" />
        </header>
      </article>
    );
  }

  return null;
}
