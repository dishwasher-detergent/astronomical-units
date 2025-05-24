"use client";

import { LucideGithub, LucideStore, LucideTelescope } from "lucide-react";

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
import { useInstallDetection } from "@/hooks/useInstallDetection";
import { Map } from "@/components/map";
import { Settings } from "@/components/settings";

export default function Home() {
  const { isStandalone } = useInstallDetection();
  const isMobile = useIsMobile();

  if (isMobile == null) {
    return null;
  }

  if (isMobile) {
    return (
      <div
        className={`flex h-full w-full flex-col overflow-hidden ${isStandalone ? "pb-6" : ""}`}
      >
        <div className="flex w-full flex-1 flex-col overflow-y-auto">
          <div className="border-b p-2">
            <PrestigeLevelIndicator />
          </div>
          <div className="w-full flex-1 border-b">
            <ClickArea />
          </div>
          <Statistics />
        </div>
        <nav className="bg-background z-40 flex w-full flex-none items-center justify-center gap-4 border-t p-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="size-10 [&_svg]:size-5"
              >
                <LucideStore />
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
                <div className="flex-1 overflow-y-auto pb-4">
                  <Shop />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="size-10 [&_svg]:size-5"
              >
                <LucideTelescope />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Equipment Map</DrawerTitle>
                <DrawerDescription>
                  <Balance />
                </DrawerDescription>
              </DrawerHeader>
              <div className="mx-4 h-96 overflow-hidden rounded-xl border">
                <Map />
              </div>
            </DrawerContent>
          </Drawer>
          <Settings />
        </nav>
      </div>
    );
  }

  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex h-96 w-full flex-none flex-row border-b">
        <div className="w-1/2 flex-none border-r xl:w-96">
          <ClickArea />
        </div>
        <div className="w-1/2 xl:w-full">
          <Map />
        </div>
      </div>
      <div className="flex flex-1 flex-col overflow-hidden xl:flex-row">
        <div className="flex w-full flex-col border-b lg:border-r xl:w-96">
          <div className="grid h-22 place-items-center border-b p-2">
            <PrestigeLevelIndicator />
          </div>
          <div className="flex-1">
            <Statistics />
          </div>
          <div className="flex w-full flex-row gap-1 border-t p-2">
            <Settings />
            <Button asChild size="icon" variant="ghost">
              <a
                target="_blank"
                href="https://github.com/dishwasher-detergent/astronomical-units"
              >
                <LucideGithub className="size-4" />
              </a>
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-row overflow-hidden">
          <div className="w-96 flex-none overflow-y-auto border-r">
            <Shop />
          </div>
          <div className="flex-1 overflow-y-auto">
            <Crew />
            <nav className="bg-background sticky top-0 z-50 flex items-center justify-between border-b px-4 py-3 font-semibold">
              <p>Equipment</p>
            </nav>
            <EquipmentDisplay />
          </div>
        </div>
      </div>
    </section>
  );
}
