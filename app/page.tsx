"use client";

import { ClickArea } from "@/components/click-area";
import { Shop } from "@/components/shop";
import { Crew } from "@/components/crew";
import { Statistics } from "@/components/statistics";
import { EquipmentDisplay } from "@/components/equipment/display";
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
import { Sidebar } from "@/components/ui/sidebar";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop == null) {
    return <div>Loading...</div>;
  }

  if (!isDesktop) {
    return (
      <>
        <div className="flex h-full w-full flex-none flex-col overflow-y-auto pb-16">
          <div className="aspect-video h-auto w-full">
            <ClickArea />
          </div>
          <Statistics />
          <Crew />
        </div>
        <div className="fixed bottom-0 flex w-full flex-none items-center justify-center gap-4 border-t bg-background p-2">
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
                <div className="flex-1 overflow-y-auto pb-4">
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
      <Sidebar />
      <div className="flex h-full flex-1 flex-col">
        <div className="relative flex-1 overflow-y-auto">
          <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b bg-background px-4 font-bold">
            <p>Equipment</p>
          </nav>
          <EquipmentDisplay />
        </div>
      </div>
    </section>
  );
}
