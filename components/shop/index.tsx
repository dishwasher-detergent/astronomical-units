"use client";

import { useAtomValue } from "jotai";
import { LucideLock } from "lucide-react";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { PrestigeItem } from "@/components/shop/item/PrestigeItem";
import { CrewItem } from "@/components/shop/item/CrewItem";
import { EquipmentItem } from "@/components/shop/item/EquipmentItem";
import { prestigeLevel } from "@/atoms/prestige";
import { Tip } from "@/components/ui/tip";

export function Shop() {
  const prestigeLevelValue = useAtomValue(prestigeLevel) || 0;
  const showPrestigeTab = prestigeLevelValue > 0;

  return (
    <div className="relative">
      <Tabs defaultValue="general" className="w-full">
        <nav className="bg-background sticky top-0 z-50 flex h-10 flex-col items-center justify-between font-semibold md:h-20">
          <p className="hidden w-full px-4 py-2 md:inline">Shop</p>
          <TabsList className="bg-background h-full w-full rounded-none border-y p-0">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-muted h-full flex-1 rounded-none"
            >
              General
            </TabsTrigger>
            {showPrestigeTab ? (
              <TabsTrigger
                value="prestige"
                className="data-[state=active]:bg-muted h-full flex-1 rounded-none"
              >
                Prestige
              </TabsTrigger>
            ) : (
              <Tip content="Must reach level 100, and prestige once to unlock this shop.">
                <div className="flex w-1/2 items-center justify-center">
                  <LucideLock className="mr-2 size-3" />
                  Prestige
                </div>
              </Tip>
            )}
          </TabsList>
        </nav>
        <TabsContent value="general" className="mt-0">
          <CrewItem />
          {Object.entries(EQUIPMENT_LIST).map(([key, value]) => {
            if (value.equipment === false) return null;
            return <EquipmentItem key={key} elementKey={key} />;
          })}
        </TabsContent>
        {showPrestigeTab && (
          <TabsContent value="prestige" className="mt-0">
            {Object.entries(PRESTIGE_UPGRADES).map(([key]) => {
              return <PrestigeItem key={key} upgradeKey={key} />;
            })}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
