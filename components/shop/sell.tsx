"use client";

import { useAtom } from "jotai";
import React from "react";

import { au } from "@/atoms/au";
import { toast } from "sonner";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { useSellCost } from "@/hooks/useSellCost";
import { Button } from "@/components/ui/button";
import { LOCALE } from "@/constants/GLOBAL";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LucideHandCoins } from "lucide-react";

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
    <Dialog>
      <DialogTrigger>
        <Button
          variant="ghost"
          className="text-red-600 hover:bg-red-300/10 hover:text-red-600"
        >
          <LucideHandCoins className="mr-2 h-4 w-4" />
          Sell
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to sell {element.name}?
          </DialogTitle>
          <DialogDescription>
            <p className="text-red-600">
              Equipment is sold at 30% the buy price, if you sell your last
              equipment you lose all upgrades.
            </p>
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
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
      </DialogContent>
    </Dialog>
  );
}
