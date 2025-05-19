"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

export function DyanmicPopover({
  title,
  button,
  children,
  setOpen,
  open,
}: {
  title: string;
  button: string | React.ReactNode;
  children: React.ReactNode;
  setOpen: (e: boolean) => void;
  open: boolean;
}) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{button}</PopoverTrigger>
        <PopoverContent className="w-[300px] max-w-full p-0" align="start">
          {children}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{button}</DrawerTrigger>
      <DrawerContent className="mb-4 p-4">
        <DrawerHeader className="mb-4 p-0 text-left">
          <DrawerTitle className="truncate">{title}</DrawerTitle>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
