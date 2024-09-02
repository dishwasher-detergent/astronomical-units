"use client";

import { ClickArea } from "@/components/click-area";
import { Shop } from "@/components/shop";
import { EquipmentDisplay } from "@/components/equipment/display";
import { Crew } from "@/components/crew";
import { Statistics } from "@/components/statistics";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import { LucideSatellite, LucideStore } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop == null) {
    return <div>Loading...</div>;
  }

  if (!isDesktop) {
    return (
      <>
        <div className="flex h-full w-full flex-none flex-col pb-14">
          <ClickArea />
          <Statistics />
          <Crew />
        </div>
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-4 border-t bg-background p-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="ghost">
                <LucideStore />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80%]">
              <div className="mx-auto flex h-full w-full flex-col overflow-hidden px-4">
                <DrawerHeader className="flex-none">
                  <DrawerTitle>Shop</DrawerTitle>
                </DrawerHeader>
                <div className="flex-1 overflow-y-auto py-2">
                  <Shop />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="ghost">
                <LucideSatellite />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80%]">
              <div className="mx-auto flex h-full w-full flex-col overflow-hidden px-4">
                <DrawerHeader className="flex-none">
                  <DrawerTitle>Equipment</DrawerTitle>
                </DrawerHeader>
                <div className="flex-1 space-y-2 overflow-y-auto py-2">
                  <EquipmentDisplay />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </>
    );
  }

  return (
    <section className="flex h-full w-full flex-row flex-nowrap overflow-hidden">
      <div className="flex h-full w-96 flex-none flex-col overflow-y-hidden border-r">
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
