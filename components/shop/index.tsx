"use client";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { PrestigeItem } from "@/components/shop/item/PrestigeItem";
import { CrewItem } from "@/components/shop/item/CrewItem";
import { EquipmentItem } from "@/components/shop/item/EquipmentItem";

export function Shop() {
  return (
    <div className="relative">
      <Tabs defaultValue="general" className="w-full">
        <nav className="bg-background sticky top-0 z-50 flex items-center justify-between border-b font-semibold flex-col">
          <p className="px-4 py-2 border-b w-full">Shop</p>
          <TabsList className="bg-background h-full w-full rounded-none p-0">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-muted flex-1 rounded-none"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="prestige"
              className="data-[state=active]:bg-muted flex-1 rounded-none"
            >
              Prestige
            </TabsTrigger>
          </TabsList>
        </nav>
        <TabsContent value="general" className="mt-0">
          <CrewItem />
          {Object.entries(EQUIPMENT_LIST).map(([key, value]) => {
            if (value.equipment === false) return null;
            return <EquipmentItem key={key} elementKey={key} />;
          })}
        </TabsContent>
        <TabsContent value="prestige" className="mt-0">
          {Object.entries(PRESTIGE_UPGRADES).map(([key]) => {
            return <PrestigeItem key={key} upgradeKey={key} />;
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
