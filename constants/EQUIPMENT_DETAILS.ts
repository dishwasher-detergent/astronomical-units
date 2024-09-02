import { Equipment } from "@/types";
import {
  LucideArrowBigUpDash,
  LucideBoxes,
  LucideDrill,
  LucidePersonStanding,
  LucidePickaxe,
  LucideRocket,
} from "lucide-react";

export const EQUIPMENT_LIST: Record<string, Equipment> = {
  astronaut: {
    name: "Crew Member",
    description: "Adds another member to your crew.",
    baseCost: 15,
    costMultiplier: 1.15,
    auPerSecond: 1,
    threshold: 20,
    equipment: false,
  },
  miningRig: {
    name: "Astoroid Mining Rig",
    description: "Mine asteroids around the galaxy to earn AU.",
    baseCost: 100,
    costMultiplier: 1.15,
    auPerSecond: 1,
    threshold: 50,
    icon: LucidePickaxe,
    upgrades: {
      boosters: {
        name: "Rocket Boosters",
        description: "Increase the mining rigs travel speed.",
        cost: 1000,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 10,
        icon: LucideArrowBigUpDash,
      },
      cargo_capacity: {
        name: "Cargo Capacity",
        description: "Increase the Mining Rigs load capacity.",
        cost: 750,
        multiplier: 0.125,
        maxCount: 10,
        threshold: 15,
        icon: LucideBoxes,
      },
      drill: {
        name: "Drill Efficiency",
        description: "Increase the efficiency of the drill bit.",
        cost: 2500,
        multiplier: 0.5,
        maxCount: 2,
        threshold: 20,
        icon: LucideDrill,
      },
    },
  },
  exploration: {
    name: "Exploration",
    description: "Explore other galaxies in search of precious metals.",
    baseCost: 400,
    costMultiplier: 1.15,
    auPerSecond: 8,
    threshold: 200,
    icon: LucideRocket,
    upgrades: {
      boosters: {
        name: "Rocket Boosters",
        description: "Increase the mining rigs travel speed.",
        cost: 1000,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 10,
        icon: LucideArrowBigUpDash,
      },
      crew: {
        name: "Crew Members",
        description: "Add more crew members to speed up research.",
        cost: 1500,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 15,
        icon: LucidePersonStanding,
      },
    },
  },
};
