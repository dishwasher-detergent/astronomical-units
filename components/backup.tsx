"use client";

import React, { useRef, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import { gameData } from "@/atoms/global";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { toast } from "sonner";

export function Backup() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
  const data = useAtomValue(gameData);
  const setGameData = useSetAtom(gameData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownload = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gameData-backup.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setOpen(false);
    toast.success("Backup downloaded successfully!");
  };

  const handleRestore = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        setGameData(json);
        toast.success("Backup restored successfully!");
      } catch (error) {
        toast.error(`Error parsing JSON file: ${error}`);
      }

      setOpen(false);
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (!isDesktop) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            Backup
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto flex h-full w-full flex-col overflow-hidden p-4">
            <DrawerHeader className="flex-none">
              <DrawerTitle>Backup your game data</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col gap-2">
              <p className="text-center text-sm font-semibold">
                Would you like to...
              </p>
              <Button onClick={handleDownload}>Download Backup</Button>
              <p className="text-center text-sm font-semibold">Or</p>
              <Button variant="secondary" onClick={triggerFileInput}>
                Restore from Backup
              </Button>
              <input
                type="file"
                accept="application/json"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleRestore}
              />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          Backup
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Backup your game data</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <p className="text-center text-sm font-semibold">
            Would you like to...
          </p>
          <Button onClick={handleDownload}>Download Backup</Button>
          <p className="text-center text-sm font-semibold">Or</p>
          <Button variant="secondary" onClick={triggerFileInput}>
            Restore from Backup
          </Button>
          <input
            type="file"
            accept="application/json"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleRestore}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
