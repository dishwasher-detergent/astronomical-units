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
import { useState } from "react";

export function DynamicPopover({
  title,
  description,
  button,
  children,
  setOpen,
  open,
  dismissible = true,
}: {
  title?: string;
  description?: string;
  button?: string | React.ReactNode;
  children: React.ReactNode;
  dismissible?: boolean;
  setOpen?: (e: boolean) => void;
  open?: boolean;
}) {
  const isMobile = useIsMobile();
  const [internalOpen, setInternalOpen] = useState(false);

  const isOpen = open !== undefined ? open : internalOpen;
  const handleOpenChange = (value: boolean) => {
    if (setOpen) {
      setOpen(value);
    } else {
      setInternalOpen(value);
    }
  };

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
    <Drawer
      open={isOpen}
      onOpenChange={handleOpenChange}
      dismissible={dismissible}
    >
      {button && <DrawerTrigger asChild>{button}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="mb-4 px-0 pb-0 text-left">
          <DrawerTitle className={`truncate ${title ? "" : "hidden"}`}>
            {title}
          </DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
}
