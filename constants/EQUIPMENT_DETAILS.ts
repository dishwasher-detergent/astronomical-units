import { Equipment } from "@/types";
import {
  LucideArmchair,
  LucideArrowBigUpDash,
  LucideBoxes,
  LucideBuilding,
  LucideChurch,
  LucideDollarSign,
  LucideDrill,
  LucideHouse,
  LucideMicroscope,
  LucidePersonStanding,
  LucidePickaxe,
  LucidePresentation,
  LucideRocket,
  LucideTentTree,
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
    icon: LucidePersonStanding,
  },
  charter: {
    name: "Charter a Billionaire",
    description: "Show some billionaire earth from space.",
    baseCost: 100,
    costMultiplier: 1.15,
    auPerSecond: 1,
    threshold: 50,
    icon: LucideDollarSign,
    upgrades: {
      seats: {
        name: "Additional Seats",
        description: "Increase your carrying capacity.",
        cost: 1000,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 10,
        icon: LucideArmchair,
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
      marketing: {
        name: "Marketing Budget",
        description: "Increase the marketing budget to scam more billionaires.",
        cost: 2000,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 15,
        icon: LucidePresentation,
      },
    },
  },
  miningRig: {
    name: "Astoroid Mining Rig",
    description: "Mine asteroids around the galaxy to earn AU.",
    baseCost: 250,
    costMultiplier: 1.15,
    auPerSecond: 2,
    threshold: 125,
    icon: LucidePickaxe,
    upgrades: {
      cargo_capacity: {
        name: "Cargo Capacity",
        description: "Increase the Mining Rigs load capacity.",
        cost: 750,
        multiplier: 0.125,
        maxCount: 10,
        threshold: 10,
        icon: LucideBoxes,
      },
      boosters: {
        name: "Rocket Boosters",
        description: "Increase the mining rigs travel speed.",
        cost: 1000,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 15,
        icon: LucideArrowBigUpDash,
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
    baseCost: 600,
    costMultiplier: 1.15,
    auPerSecond: 4,
    threshold: 300,
    icon: LucideRocket,
    upgrades: {
      boosters: {
        name: "Rocket Boosters",
        description: "Increase the mining rigs travel speed.",
        cost: 750,
        multiplier: 0.125,
        maxCount: 5,
        threshold: 10,
        icon: LucideArrowBigUpDash,
      },
      crew: {
        name: "Crew Members",
        description: "Add more crew members to help around the ship.",
        cost: 1500,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 15,
        icon: LucidePersonStanding,
      },
      scientists: {
        name: "Scientists",
        description: "Add more scientists to speed up research.",
        cost: 3000,
        multiplier: 0.5,
        maxCount: 5,
        threshold: 20,
        icon: LucideMicroscope,
      },
    },
  },
  colonization: {
    name: "Colonize a Planet",
    description: "Assist man in colonizing a helpless planet.",
    baseCost: 5000,
    costMultiplier: 1.15,
    auPerSecond: 8,
    threshold: 1000,
    icon: LucideTentTree,
    upgrades: {
      buildings: {
        name: "Buildings",
        description: "Additional buildings to house more people.",
        cost: 1000,
        multiplier: 0.125,
        maxCount: 2,
        threshold: 10,
        icon: LucideBuilding,
      },
      houses: {
        name: "Houses",
        description: "More houses, room to grow!",
        cost: 1500,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 15,
        icon: LucideHouse,
      },
      hospitals: {
        name: "Hospitals",
        description: "People can get hurt, and still survive!",
        cost: 2500,
        multiplier: 0.5,
        maxCount: 3,
        threshold: 20,
        icon: LucideChurch,
      },
      church: {
        name: "Churches",
        description: "People need something to believe in, right?",
        cost: 5000,
        multiplier: 0.75,
        maxCount: 1,
        threshold: 25,
        icon: LucideChurch,
      },
    },
  },
};
