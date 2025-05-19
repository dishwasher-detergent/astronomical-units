"use client";

import { useAtom, useAtomValue } from "jotai";
import { WritableAtom } from "jotai";
import { toast } from "sonner";
import React from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { LucideHandCoins } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";

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
  onSell
}: SellItemProps) {
  const [itemValue, setItemValue] = useAtom(itemAtom);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const sellPrice = getSellPrice(elementKey);

  const handleSell = () => {
    const newValue = typeof itemValue === "number" 
      ? itemValue - 1 
      : { ...itemValue, value: itemValue.value - 1 };
    
    setItemValue(newValue);
    currency.update(current => current + sellPrice);
    toast.error(
      `Sold ${details.name} for ${sellPrice.toLocaleString(LOCALE, NUMBER_OPTIONS)} ${currency.name}`
    );
    onSell?.();
  };

  const SellContent = () => (
    <Button variant="destructive" onClick={handleSell} className="w-full">
      Sell For {sellPrice.toLocaleString(LOCALE, NUMBER_OPTIONS)} {currency.name}
    </Button>
  );

  if (!isDesktop) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            className="text-red-600 hover:bg-red-300/10 hover:text-red-600"
          >
            <LucideHandCoins className="mr-2 h-4 w-4" />
            Sell
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="flex-none">
            <DrawerTitle className="text-left">
              Are you sure you want to sell {details.name}?
            </DrawerTitle>
            <DrawerDescription className="text-left">
              Equipment is sold at 30% the buy price, if you sell your last
              equipment you lose all upgrades.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-2">
            <SellContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
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
            Are you sure you want to sell {details.name}?
          </DialogTitle>
          <DialogDescription>
            Equipment is sold at 30% the buy price, if you sell your last
            equipment you lose all upgrades.
          </DialogDescription>
        </DialogHeader>
        <SellContent />
      </DialogContent>
    </Dialog>
  );
}
