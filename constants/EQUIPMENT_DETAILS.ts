import { type AcquirableElementKey, ElementKey, Equipment } from "@/types";

export const EQUIPMENT_ORDER: AcquirableElementKey[] = [
  ElementKey.Astronaut,
  ElementKey.IronMiningRig,
  ElementKey.CobaltMiningRig,
  ElementKey.PlatinumMiningRig,
];

export const EQUIPMENT_LIST: Record<AcquirableElementKey, Equipment> = {
  [ElementKey.Astronaut]: {
    name: "Crew Member",
    description: "Adds another member to your mining crew.",
    baseCost: 15,
    costMultiplier: 1.15,
    incomeMultiplier: 1,
    threshold: 20,
    equipment: false,
  },
  [ElementKey.IronMiningRig]: {
    name: "Iron Mining Rig",
    description: "Increases your clicks per second.",
    baseCost: 100,
    costMultiplier: 1.15,
    incomeMultiplier: 3,
    threshold: 50,
  },
  [ElementKey.CobaltMiningRig]: {
    name: "Cobalt Mining Rig",
    description: "Increases your clicks per second.",
    baseCost: 400,
    costMultiplier: 1.15,
    incomeMultiplier: 5,
    threshold: 200,
  },
  [ElementKey.PlatinumMiningRig]: {
    name: "Platinum Mining Rig",
    description: "Increases your clicks per second.",
    baseCost: 1000,
    costMultiplier: 1.15,
    incomeMultiplier: 20,
    threshold: 500,
  },
};
