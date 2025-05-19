"use client";

import { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { LucideCode2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { au, totalAu, addAu, setAuDirectly } from "@/atoms/au";
import {
  performPrestige,
  prestigeLevel,
  prestigeMultiplier,
  prestigePoints,
  addPrestigePoints,
} from "@/atoms/prestige";
import { addEquipment, unlockAllEquipment } from "@/atoms/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showElement } from "@/atoms/show";
import { DynamicDrawer } from "@/components/ui/dynamic-drawer";
import { formatMoney } from "@/lib/formatters";

export function DevMode() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return <DevModeContent />;
}

function DevModeContent() {
  const [open, setOpen] = useState(false);
  const currentAu = useAtomValue(au);
  const currentTotalAu = useAtomValue(totalAu);
  const [auAmount, setAuAmount] = useState("1000");
  const [prestigeAmount, setPrestigeAmount] = useState("1");
  const level = useAtomValue(prestigeLevel);
  const points = useAtomValue(prestigePoints);
  const multiplier = useAtomValue(prestigeMultiplier);
  const setAuAmountDirectly = useSetAtom(setAuDirectly);
  const addAuAmount = useSetAtom(addAu);
  const addEquipmentAmount = useSetAtom(addEquipment);
  const addPrestigeAmount = useSetAtom(addPrestigePoints);
  const [selectedEquipment, setSelectedEquipment] = useState(
    Object.keys(EQUIPMENT_LIST)[0],
  );
  const [equipmentAmount, setEquipmentAmount] = useState("1");
  const setShow = useSetAtom(showElement);
  const handleAddAu = () => {
    const amount = parseFloat(auAmount);
    if (isNaN(amount)) return;

    addAuAmount(amount);
  };

  const handleSetAu = () => {
    const amount = parseFloat(auAmount);
    if (isNaN(amount)) return;

    setAuAmountDirectly(amount);
  };

  const handleAddPrestigePoints = () => {
    const amount = parseInt(prestigeAmount);
    if (isNaN(amount)) return;

    addPrestigeAmount(amount);
  };

  const handleAddEquipment = () => {
    const amount = parseInt(equipmentAmount);
    if (isNaN(amount) || amount < 1) return;

    addEquipmentAmount({ key: selectedEquipment, amount });
  };

  const unlockAllEquipmentItems = useSetAtom(unlockAllEquipment);

  const handleUnlockAllEquipment = () => {
    unlockAllEquipmentItems();
  };

  return (
    <DynamicDrawer
      title="Developer Mode"
      description="Debug tools for development environment only"
      open={open}
      setOpen={setOpen}
      button={
        <Button variant="outline" size="icon" className="size-8">
          <LucideCode2 className="size-6" />
        </Button>
      }
    >
      <Tabs defaultValue="currency">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="currency">Currency</TabsTrigger>
          <TabsTrigger value="prestige">Prestige</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>
        <TabsContent value="currency" className="space-y-4">
          <div className="bg-muted rounded-md p-3">
            <p className="text-muted-foreground text-sm">
              Current AU: {formatMoney(currentAu)}
            </p>
            <p className="text-muted-foreground text-sm">
              Total AU: {formatMoney(currentTotalAu)}
            </p>
          </div>
          <div className="flex items-end gap-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="au-amount">AU Amount</Label>
              <Input
                id="au-amount"
                type="number"
                value={auAmount}
                onChange={(e) => setAuAmount(e.target.value)}
              />{" "}
            </div>
            <Button onClick={handleAddAu}>Add AU</Button>
            <Button onClick={handleSetAu} variant="outline">
              Set AU
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="prestige" className="space-y-4 py-4">
          <div className="bg-muted rounded-md p-3">
            <p className="text-muted-foreground text-sm">
              Prestige Level: {level || 0}
            </p>
            <p className="text-muted-foreground text-sm">
              Prestige Points: {points || 0}
            </p>
            <p className="text-muted-foreground text-sm">
              Production Multiplier: {formatMoney(multiplier) || 1}x
            </p>
          </div>
          <div className="flex items-end gap-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="prestige-amount">Prestige Points</Label>
              <Input
                id="prestige-amount"
                type="number"
                value={prestigeAmount}
                onChange={(e) => setPrestigeAmount(e.target.value)}
              />
            </div>
            <Button onClick={handleAddPrestigePoints}>Add Points</Button>
          </div>
        </TabsContent>
        <TabsContent value="equipment" className="space-y-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="equipment-select">Equipment</Label>
              <select
                id="equipment-select"
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                value={selectedEquipment}
                onChange={(e) => setSelectedEquipment(e.target.value)}
              >
                {Object.entries(EQUIPMENT_LIST).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end gap-4">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="equipment-amount">Amount</Label>
                <Input
                  id="equipment-amount"
                  type="number"
                  value={equipmentAmount}
                  onChange={(e) => setEquipmentAmount(e.target.value)}
                />
              </div>
              <Button onClick={handleAddEquipment}>Add Equipment</Button>
            </div>

            <Button onClick={handleUnlockAllEquipment} variant="outline">
              Unlock All Equipment
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </DynamicDrawer>
  );
}
