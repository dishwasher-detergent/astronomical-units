import { type AcquirableElementKey, ElementKey, Equipment } from "@/types";

export const EQUIPMENT_ORDER: AcquirableElementKey[] = [
  ElementKey.Astronaut,
  ElementKey.MiningRig,
  ElementKey.Exploration,
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
  [ElementKey.MiningRig]: {
    name: "Astoroid Mining Rig",
    description: "Generate AU passively by mining asteroids.",
    baseCost: 100,
    costMultiplier: 1.15,
    incomeMultiplier: 3,
    threshold: 50,
  },
  [ElementKey.Exploration]: {
    name: "Exploration",
    description: "Generate AU passively by exploring galaxies.",
    baseCost: 400,
    costMultiplier: 1.15,
    incomeMultiplier: 5,
    threshold: 50,
  },
};
