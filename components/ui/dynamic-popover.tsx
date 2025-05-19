"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
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

export function DynamicPopover({
  title,
  description,
  button,
  children,
  setOpen,
  open,
}: {
  title?: string;
  description?: string;
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
        <DrawerHeader className="mb-4 px-0 pb-0 text-left">
          {title && <DrawerTitle className="truncate">{title}</DrawerTitle>}
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
