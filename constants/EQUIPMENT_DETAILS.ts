import { Equipment } from "@/types";
import { LucidePickaxe, LucideRocket } from "lucide-react";

export const EQUIPMENT_LIST: Record<string, Equipment> = {
  astronaut: {
    name: "Crew Member",
    description: "Adds another member to your mining crew.",
    baseCost: 15,
    costMultiplier: 1.15,
    auPerSecond: 1,
    threshold: 20,
    equipment: false,
  },
  miningRig: {
    name: "Astoroid Mining Rig",
    description: "Generate AU passively by mining asteroids.",
    baseCost: 100,
    costMultiplier: 1.15,
    auPerSecond: 1,
    threshold: 50,
    icon: LucidePickaxe,
    upgrades: {
      rocket: {
        name: "Rocket Boosters",
        description: "string",
        baseCost: 100,
        costMultiplier: 1.15,
        delta: 1,
        threshold: 10,
      },
    },
  },
  exploration: {
    name: "Exploration",
    description: "Generate AU passively by exploring galaxies.",
    baseCost: 400,
    costMultiplier: 1.15,
    auPerSecond: 8,
    threshold: 200,
    icon: LucideRocket,
  },
};
