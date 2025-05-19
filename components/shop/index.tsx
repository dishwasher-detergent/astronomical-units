"use client";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { PrestigeItem } from "@/components/shop/item/PrestigeItem";
import { CrewItem } from "@/components/shop/item/CrewItem";
import { ShopDisplay } from "@/components/shop/item/ShopDisplay";

export function Shop() {
  return (
    <div className="relative">
      <p className="hidden px-4 py-2 font-semibold md:block">Store</p>
      <Tabs defaultValue="general" className="w-full">
        <div className="sticky top-0 z-10 border-b">
          <TabsList className="w-full rounded-none bg-background">
            <TabsTrigger
              value="general"
              className="flex-1 data-[state=active]:bg-muted"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="prestige"
              className="flex-1 data-[state=active]:bg-muted"
            >
              Prestige
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="general" className="mt-0">
          <div className="w-full">
            <CrewItem />
            {Object.entries(EQUIPMENT_LIST).map(([key, value]) => {
              if (value.equipment === false) return null;
              return <ShopDisplay key={key} elementKey={key} />;
            })}
          </div>
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
