"use client";

import { ClickArea } from "@/components/click-area";
import { Shop } from "@/components/shop";
import { EquipmentDisplay } from "@/components/equipment/display";
import { Crew } from "@/components/crew";
import { Statistics } from "@/components/statistics";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <section className="flex h-full w-full flex-row flex-nowrap overflow-hidden">
        <div className="flex h-full w-72 flex-none flex-col overflow-y-hidden border-r">
          <ClickArea />
          <Statistics />
          <Crew />
          <Shop />
        </div>
        <div className="flex h-full flex-1 flex-col">
          <div className="flex-1 overflow-y-auto">
            <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b bg-background px-4 font-bold">
              <p>Equipment</p>
            </nav>
            <EquipmentDisplay />
          </div>
        </div>
      </section>
    );
  }

  return (
    <Tabs defaultValue="account" className="w-full">
      <div className="sticky top-12 border-b bg-background p-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="main">Main</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="main">
        <div className="flex h-full w-full flex-none flex-col">
          <ClickArea />
          <Statistics />
          <Crew />
          <Shop />
        </div>
      </TabsContent>
      <TabsContent value="equipment">
        <EquipmentDisplay />
      </TabsContent>
    </Tabs>
  );
}
