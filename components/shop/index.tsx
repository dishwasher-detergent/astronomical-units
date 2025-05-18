"use client";

import { Astronaut } from "@/components/shop/astronaut";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { BaseEquipment } from "@/components/shop/equipment/base";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Shop() {
  return (
    <div className="relative bg-background md:border-b">
      <p className="hidden bg-background px-4 py-2 font-semibold md:block">
        Store
      </p>
      <Tabs defaultValue="general" className="w-full">
        <div className="px-4 pt-4 md:pt-0">
          <TabsList className="w-full">
            <TabsTrigger value="general" className="flex-1">
              General
            </TabsTrigger>
            <TabsTrigger value="prestige" className="flex-1">
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
        <TabsContent value="prestige">Coming Soon.</TabsContent>
      </Tabs>
    </div>
  );
}
