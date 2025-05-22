"use client";

import React, { useRef, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "sonner";
import { RESET } from "jotai/utils";
import { LucideDatabaseBackup } from "lucide-react";

import { gameData } from "@/atoms/global";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { DynamicDrawer } from "@/components/ui/dynamic-drawer";

export function Backup() {
  const isMobile = useIsMobile();
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

  return (
    <DynamicDrawer
      title="Backup"
      description="Backup your game data"
      button={
        <Button variant="secondary">
          <LucideDatabaseBackup />
          Backup
        </Button>
      }
      open={open}
      setOpen={setOpen}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Button className="flex-1" onClick={handleDownload}>
            Download Backup
          </Button>
          <Button
            className="flex-1"
            variant="secondary"
            onClick={triggerFileInput}
          >
            Restore from Backup
          </Button>
        </div>
        <div>
          <p className="text-destructive mb-1 text-sm font-semibold">
            Danger Zone
          </p>
          <div className="border-destructive rounded-xl border border-dashed p-2">
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => {
                toast.error("Game data reset successfully!");
                setGameData(RESET);
                setOpen(false);
              }}
            >
              Reset Game Data
            </Button>
          </div>
        </div>
        <input
          type="file"
          accept="application/json"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleRestore}
        />
      </div>
    </DynamicDrawer>
  );
}
