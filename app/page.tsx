"use client";

import { LucideSatellite, LucideStore } from "lucide-react";

import { ClickArea } from "@/components/click-area";
import { Shop } from "@/components/shop";
import { Crew } from "@/components/crew";
import { Statistics } from "@/components/statistics";
import { EquipmentDisplay } from "@/components/display";
import { Prestige } from "@/components/prestige";
import { DevMode } from "@/components/dev-mode";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
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
      <>
        <div className="flex h-full w-full flex-none flex-col overflow-y-auto pb-14">
          <div className="w-full flex-1">
            <ClickArea />
          </div>
          <Statistics />
        </div>
        <nav className="mb-safe bg-background fixed bottom-0 z-40 flex w-full flex-none items-center justify-center gap-4 border-t p-2">
          <Prestige />
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
                </DrawerHeader>
                <Balance />
                <div className="flex-1 overflow-y-auto pb-4">
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
                </DrawerHeader>
                <Balance />
                <div className="flex-1 overflow-y-auto pb-4">
                  <Crew />
                  <nav className="bg-background sticky top-0 z-10 flex h-12 items-center justify-between border-t px-4 font-semibold">
                    <p>Equipment</p>
                  </nav>
                  <EquipmentDisplay />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <DevMode />
        </nav>
      </>
    );
  }

  return (
    <section className="flex h-full w-full flex-row flex-nowrap overflow-hidden">
      <div className="flex h-full w-96 flex-none flex-col overflow-hidden border-r">
        <div className="w-full flex-1">
          <ClickArea />
        </div>
        <div className="sticky top-0 overflow-y-auto">
          <Statistics />
          <div className="flex flex-row gap-2 border-b p-4">
            <Prestige />
            <DevMode />
          </div>
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
