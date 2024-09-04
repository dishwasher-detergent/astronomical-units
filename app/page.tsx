"use client";

import { LucideSatellite, LucideStore } from "lucide-react";

import { ClickArea } from "@/components/click-area";
import { Shop } from "@/components/shop";
import { Crew } from "@/components/crew";
import { Statistics } from "@/components/statistics";
import { EquipmentDisplay } from "@/components/equipment/display";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Balance } from "@/components/balance";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop == null) {
    return null;
  }

  if (!isDesktop) {
    return (
      <>
        <div className="flex h-full w-full flex-none flex-col overflow-y-auto pb-16">
          <div className="aspect-square h-auto w-full flex-none">
            <ClickArea />
          </div>
          <Statistics />
        </div>
        <nav className="fixed bottom-0 z-[9999] flex w-full flex-none items-center justify-center gap-4 border-t bg-background p-2">
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
                <div className="flex-1 overflow-y-auto pb-4">
                  <Balance />
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
                <div className="flex-1 space-y-2 overflow-y-auto pb-4">
                  <Balance />
                  <Crew />
                  <nav className="flex h-12 items-center justify-between bg-background px-4 font-bold">
                    <p>Equipment</p>
                  </nav>
                  <EquipmentDisplay />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </nav>
      </>
    );
  }

  return (
    <section className="flex h-full w-full flex-row flex-nowrap overflow-hidden">
      <div className="flex h-full w-96 flex-none flex-col overflow-hidden border-r">
        <div className="aspect-video h-auto w-full flex-none">
          <ClickArea />
        </div>
        <div className="sticky top-0 overflow-y-auto">
          <Statistics />
          <Shop />
        </div>
      </div>
      <div className="flex h-full flex-1 flex-col">
        <div className="relative flex-1 overflow-y-auto">
          <Crew />
          <nav className="sticky top-0 z-50 flex h-12 items-center justify-between bg-background px-4 font-bold">
            <p>Equipment</p>
          </nav>
          <EquipmentDisplay />
        </div>
      </div>
    </section>
  );
}
