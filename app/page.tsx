"use client";

import { LucideSatellite, LucideStore } from "lucide-react";

import { ClickArea } from "@/components/click-area";
import { Shop } from "@/components/shop";
import { Crew } from "@/components/crew";
import { Statistics } from "@/components/statistics";
import { EquipmentDisplay } from "@/components/display";
import { PrestigeLevelIndicator } from "@/components/prestige-level-indicator";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Balance } from "@/components/balance";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile == null) {
    return null;
  }

  if (isMobile) {
    return (
      <div className="flex h-full w-full flex-col overflow-hidden pb-6">
        <div className="flex w-full flex-1 flex-col overflow-y-auto">
          <div className="border-b p-2">
            <PrestigeLevelIndicator />
          </div>
          <div className="w-full flex-1">
            <ClickArea />
          </div>
          <Statistics />
        </div>
        <nav className="mb-safe bg-background z-40 flex w-full flex-none items-center justify-center gap-4 p-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="ghost">
                <LucideStore className="size-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto flex h-full w-full flex-col overflow-hidden">
                <DrawerHeader className="flex-none">
                  <DrawerTitle>Shop</DrawerTitle>
                  <DrawerDescription>
                    <Balance />
                  </DrawerDescription>
                </DrawerHeader>
                <div className="mb-8 flex-1 overflow-y-auto pb-4">
                  <Shop />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="ghost">
                <LucideSatellite className="size-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto flex h-full w-full flex-col overflow-hidden">
                <DrawerHeader className="flex-none">
                  <DrawerTitle>Equipment</DrawerTitle>
                  <DrawerDescription>
                    <Balance />
                  </DrawerDescription>
                </DrawerHeader>
                <div className="mb-8 flex-1 overflow-y-auto pb-4">
                  <Crew />
                  <nav className="bg-background sticky top-0 z-10 flex h-12 items-center justify-between border-t px-4 font-semibold">
                    <p>Equipment</p>
                  </nav>
                  <EquipmentDisplay />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </nav>
      </div>
    );
  }

  return (
    <section className="flex h-full w-full flex-col flex-nowrap overflow-hidden lg:flex-row">
      <div className="flex w-full flex-none flex-row-reverse overflow-hidden lg:h-full lg:w-96 lg:flex-col lg:border-r">
        <div className="w-full flex-1">
          <ClickArea />
        </div>
        <div className="sticky top-0 overflow-y-auto md:w-96 md:border-r">
          {" "}
          <div className="flex flex-row items-center justify-between border-b p-2">
            <PrestigeLevelIndicator />
          </div>
          <Statistics />
        </div>
      </div>
      <div className="flex h-full flex-1 flex-row">
        <div className="relative h-full w-96 overflow-y-auto border-r">
          <Shop />
        </div>
        <div className="relative flex-1 overflow-y-auto">
          <Crew />
          <nav className="bg-background sticky top-0 z-50 flex h-12 items-center justify-between px-4 font-semibold">
            <p>Equipment</p>
          </nav>
          <EquipmentDisplay />
        </div>
      </div>
    </section>
  );
}
