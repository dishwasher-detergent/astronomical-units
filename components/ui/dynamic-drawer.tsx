"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

export function DynamicDrawer({
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
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {button && <DialogTrigger asChild>{button}</DialogTrigger>}
        <DialogContent className="flex max-h-[60vh] flex-col overflow-hidden p-4">
          <DialogHeader className="flex-none p-0">
            <DialogTitle className={`truncate pr-8 ${title ? "" : "hidden"}`}>
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
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
