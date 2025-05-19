"use client";

import { Astronaut } from "@/components/shop/astronaut";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { BaseEquipment } from "@/components/shop/equipment/base";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { BasePrestigeUpgrade } from "@/components/shop/prestige/base";

export function Shop() {
  return (
    <div className="relative bg-background md:border-b">
      <p className="hidden bg-background px-4 py-2 font-semibold md:block">
        Store
      </p>
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
        <TabsContent value="general">
          <div className="w-full">
            <Astronaut />
            {Object.entries(EQUIPMENT_LIST).map(([key, value]) => {
              if (value.equipment === false) return null;

              return <BaseEquipment key={key} elementKey={key} />;
            })}
          </div>
        </TabsContent>
        <TabsContent value="prestige">
          {Object.entries(PRESTIGE_UPGRADES).map(([key, value]) => {
            return <BasePrestigeUpgrade key={key} upgradeKey={key} />;
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
