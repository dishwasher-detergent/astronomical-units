import { Equipment } from "@/types";
import {
  LucideArmchair,
  LucideArrowBigUpDash,
  LucideBoxes,
  LucideBuilding,
  LucideChurch,
  LucideDrill,
  LucideHospital,
  LucideHouse,
  LucideMicroscope,
  LucidePersonStanding,
  LucidePickaxe,
  LucidePresentation,
  LucideRocket,
  LucideTentTree,
  LucidePlaneTakeoff,
  LucideCompass,
  LucideBatteryCharging,
  LucideBolt,
  LucideShieldCheck,
  LucideLink,
  LucideLeaf,
  LucideDroplet,
  LucideWind,
  LucideMountain,
  LucideShieldAlert,
  LucideBed,
  LucideBuilding2,
  LucideCpu,
  LucideSun,
  LucideSatelliteDish,
  LucideCableCar,
  LucideRotate3D
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
    icon: LucidePlaneTakeoff,
    upgrades: {
      seats: {
        name: "Additional Seats",
        description: "Increase your carrying capacity.",
        cost: 1000,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 5,
        icon: LucideArmchair,
      },
      crew: {
        name: "Crew Members",
        description: "Add more crew members to speed up research.",
        cost: 1500,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 10,
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
    baseCost: 1000,
    costMultiplier: 1.15,
    auPerSecond: 2,
    threshold: 500,
    icon: LucidePickaxe,
    upgrades: {
      cargo_capacity: {
        name: "Cargo Capacity",
        description: "Increase the Mining Rigs load capacity.",
        cost: 5000,
        multiplier: 0.125,
        maxCount: 10,
        threshold: 5,
        icon: LucideBoxes,
      },
      boosters: {
        name: "Rocket Boosters",
        description: "Increase the mining rigs travel speed.",
        cost: 7500,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 10,
        icon: LucideArrowBigUpDash,
      },
      drill: {
        name: "Drill Efficiency",
        description: "Increase the efficiency of the drill bit.",
        cost: 10000,
        multiplier: 0.5,
        maxCount: 2,
        threshold: 15,
        icon: LucideDrill,
      },
    },
  },
  exploration: {
    name: "Exploration",
    description: "Explore other galaxies in search of precious metals.",
    baseCost: 3000,
    costMultiplier: 1.15,
    auPerSecond: 4,
    threshold: 1500,
    icon: LucideRocket,
    upgrades: {
      boosters: {
        name: "Rocket Boosters",
        description: "Increase the mining rigs travel speed.",
        cost: 7500,
        multiplier: 0.125,
        maxCount: 5,
        threshold: 5,
        icon: LucideArrowBigUpDash,
      },
      crew: {
        name: "Crew Members",
        description: "Add more crew members to help around the ship.",
        cost: 10000,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 10,
        icon: LucidePersonStanding,
      },
      scientists: {
        name: "Scientists",
        description: "Add more scientists to speed up research.",
        cost: 15000,
        multiplier: 0.5,
        maxCount: 5,
        threshold: 15,
        icon: LucideMicroscope,
      },
    },
  },
  satellite: {
    name: "Satellite Network",
    description: "Deploy satellites to enhance communication and resource gathering.",
    baseCost: 5000,
    costMultiplier: 1.15,
    auPerSecond: 3,
    threshold: 2500,
    icon: LucideSatelliteDish,
    upgrades: {
      solarPanels: {
        name: "Solar Panels",
        description: "Increase energy efficiency of the satellites.",
        cost: 10000,
        multiplier: 0.15,
        maxCount: 10,
        threshold: 5,
        icon: LucideSun,
      },
      dataProcessing: {
        name: "Data Processing Units",
        description: "Improve data collection and analysis.",
        cost: 15000,
        multiplier: 0.2,
        maxCount: 5,
        threshold: 10,
        icon: LucideCpu,
      },
      thrusters: {
        name: "Advanced Thrusters",
        description: "Enable satellites to reposition faster.",
        cost: 20000,
        multiplier: 0.25,
        maxCount: 3,
        threshold: 15,
        icon: LucideRocket,
      },
    },
  },
  spaceStation: {
    name: "Space Station",
    description: "Construct a space station to serve as a hub for operations.",
    baseCost: 20000,
    costMultiplier: 1.15,
    auPerSecond: 10,
    threshold: 10000,
    icon: LucideBuilding2,
    upgrades: {
      livingQuarters: {
        name: "Living Quarters",
        description: "Expand the space station to accommodate more crew.",
        cost: 30000,
        multiplier: 0.15,
        maxCount: 5,
        threshold: 5,
        icon: LucideBed,
      },
      researchLab: {
        name: "Research Labs",
        description: "Improve scientific research and technological advancements.",
        cost: 50000,
        multiplier: 0.3,
        maxCount: 5,
        threshold: 10,
        icon: LucideMicroscope,
      },
      defenseSystem: {
        name: "Defense Systems",
        description: "Protect the station from asteroids and other threats.",
        cost: 75000,
        multiplier: 0.4,
        maxCount: 3,
        threshold: 15,
        icon: LucideShieldAlert,
      },
    },
  },
  colonization: {
    name: "Colonize a Planet",
    description: "Assist man in colonizing a helpless planet.",
    baseCost: 40000,
    costMultiplier: 1.15,
    auPerSecond: 8,
    threshold: 5000,
    icon: LucideTentTree,
    upgrades: {
      buildings: {
        name: "Buildings",
        description: "Additional buildings to house more people.",
        cost: 15000,
        multiplier: 0.125,
        maxCount: 2,
        threshold: 5,
        icon: LucideBuilding,
      },
      houses: {
        name: "Houses",
        description: "More houses, room to grow!",
        cost: 20000,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 10,
        icon: LucideHouse,
      },
      hospitals: {
        name: "Hospitals",
        description: "People can get hurt, and still survive!",
        cost: 25000,
        multiplier: 0.5,
        maxCount: 3,
        threshold: 15,
        icon: LucideHospital,
      },
      church: {
        name: "Churches",
        description: "People need something to believe in, right?",
        cost: 30000,
        multiplier: 0.75,
        maxCount: 1,
        threshold: 25,
        icon: LucideChurch,
      },
    },
  },
  terraforming: {
    name: "Terraforming Project",
    description: "Transform a barren planet into a habitable world.",
    baseCost: 50000,
    costMultiplier: 1.15,
    auPerSecond: 20,
    threshold: 25000,
    icon: LucideMountain,
    upgrades: {
      atmosphereGenerators: {
        name: "Atmosphere Generators",
        description: "Accelerate the creation of a breathable atmosphere.",
        cost: 75000,
        multiplier: 0.1,
        maxCount: 10,
        threshold: 5,
        icon: LucideWind,
      },
      waterPurification: {
        name: "Water Purification Plants",
        description: "Ensure a clean and sustainable water supply.",
        cost: 100000,
        multiplier: 0.2,
        maxCount: 5,
        threshold: 10,
        icon: LucideDroplet,
      },
      ecoSystem: {
        name: "Ecosystem Development",
        description: "Introduce flora and fauna to the new world.",
        cost: 150000,
        multiplier: 0.5,
        maxCount: 3,
        threshold: 15,
        icon: LucideLeaf,
      },
    },
  },
  spaceElevator: {
    name: "Space Elevator",
    description: "Build a space elevator to drastically reduce launch costs.",
    baseCost: 100000,
    costMultiplier: 1.15,
    auPerSecond: 30,
    threshold: 50000,
    icon: LucideCableCar,
    upgrades: {
      cableMaterial: {
        name: "Advanced Cable Materials",
        description: "Enhance the strength and durability of the elevator cable.",
        cost: 150000,
        multiplier: 0.15,
        maxCount: 10,
        threshold: 5,
        icon: LucideLink,
      },
      cargoCapacity: {
        name: "Cargo Capacity",
        description: "Increase the amount of materials that can be transported.",
        cost: 200000,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 10,
        icon: LucideBoxes,
      },
      safetyProtocols: {
        name: "Enhanced Safety Protocols",
        description: "Minimize the risks of catastrophic failure.",
        cost: 300000,
        multiplier: 0.35,
        maxCount: 3,
        threshold: 15,
        icon: LucideShieldCheck,
      },
    },
  },
  warpDrive: {
    name: "Warp Drive",
    description: "Develop warp drive technology for faster-than-light travel.",
    baseCost: 500000,
    costMultiplier: 1.15,
    auPerSecond: 50,
    threshold: 250000,
    icon: LucideBolt,
    upgrades: {
      energySource: {
        name: "Advanced Energy Source",
        description: "Power the warp drive with a highly efficient energy core.",
        cost: 750000,
        multiplier: 0.1,
        maxCount: 10,
        threshold: 5,
        icon: LucideBatteryCharging,
      },
      navigationSystem: {
        name: "Quantum Navigation System",
        description: "Navigate through space with pinpoint accuracy.",
        cost: 1000000,
        multiplier: 0.3,
        maxCount: 5,
        threshold: 10,
        icon: LucideCompass,
      },
      stabilizers: {
        name: "Warp Field Stabilizers",
        description: "Ensure a smooth and stable warp travel experience.",
        cost: 1500000,
        multiplier: 0.5,
        maxCount: 3,
        threshold: 15,
        icon: LucideRotate3D,
      },
    },
  },
};
