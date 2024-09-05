"use client";

import { useAtom } from "jotai";
import React from "react";

import { au } from "@/atoms/au";
import { toast } from "sonner";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { useSellCost } from "@/hooks/useSellCost";
import { Button } from "@/components/ui/button";
import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LucideHandCoins, LucideStore } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function SellButton({
  elementKey,
  decrement,
  children,
}: {
  elementKey: string;
  decrement: (update?: unknown | number) => void;
  children: React.ReactNode;
}) {
  return (
    <Modal elementKey={elementKey} decrement={decrement}>
      {children}
    </Modal>
  );
}

function Modal({
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
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
        <DrawerContent className="max-h-[80%]">
          <DrawerHeader className="flex-none">
            <DrawerTitle className="text-left">
              Are you sure you want to sell {element.name}?
            </DrawerTitle>
            <DrawerDescription className="text-left">
              Equipment is sold at 30% the buy price, if you sell your last
              equipment you lose all upgrades.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-2">
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => {
                decrement();
                setAu((current) => current + cost);
                toast.error(
                  `Sold ${element.name} for ${cost.toLocaleString(LOCALE, NUMBER_OPTIONS)} AU`,
                );
              }}
            >
              {children}
              {cost.toLocaleString(LOCALE, NUMBER_OPTIONS)} AU
            </Button>
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
            Are you sure you want to sell {element.name}?
          </DialogTitle>
          <DialogDescription>
            Equipment is sold at 30% the buy price, if you sell your last
            equipment you lose all upgrades.
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          onClick={() => {
            decrement();
            setAu((current) => current + cost);
            toast.error(
              `Sold ${element.name} for ${cost.toLocaleString(LOCALE, NUMBER_OPTIONS)} AU`,
            );
          }}
        >
          {children}
          {cost.toLocaleString(LOCALE, NUMBER_OPTIONS)} AU
        </Button>
      </DialogContent>
    </Dialog>
  );
}
