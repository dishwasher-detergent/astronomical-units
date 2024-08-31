import { type AcquirableElementKey, ElementKey } from "@/types";

export const EQUIPMENT_ORDER: AcquirableElementKey[] = [
  ElementKey.Astronaut,
  ElementKey.IronMiningRig,
  ElementKey.ColbaltMiningRig,
  ElementKey.PlatinumMiningRig,
];

export const EQUIPMENT_LIST: Record<
  AcquirableElementKey,
  {
    name: string;
    baseCost: number;
    costMultiplier: number;
    incomeMultiplier: number;
    threshold: number;
    description: string;
  }
> = {
  [ElementKey.Astronaut]: {
    baseCost: 10,
    costMultiplier: 1.125,
    incomeMultiplier: 1,
    description: "Increases your clicks per second.",
    name: "Astronaut",
    threshold: 20,
  },
  [ElementKey.IronMiningRig]: {
    name: "Iron Mining Rig",
    description: "Increases your clicks per second.",
    baseCost: 20,
    costMultiplier: 1.5,
    incomeMultiplier: 1,
    threshold: 30,
  },
  [ElementKey.ColbaltMiningRig]: {
    baseCost: 30,
    costMultiplier: 1.5,
    incomeMultiplier: 1,
    description: "Increases your clicks per second.",
    name: "Cobalt Mining Rig",
    threshold: 40,
  },
  [ElementKey.PlatinumMiningRig]: {
    baseCost: 40,
    costMultiplier: 1.5,
    incomeMultiplier: 1,
    description: "Increases your clicks per second.",
    name: "Platinum Mining Rig",
    threshold: 50,
  },
};
