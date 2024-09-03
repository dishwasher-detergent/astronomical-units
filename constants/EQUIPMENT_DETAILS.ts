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
    baseCost: 50, // Increased base cost
    costMultiplier: 1.2, // Slightly higher cost multiplier
    auPerSecond: 1,
    threshold: 20,
    equipment: false,
    icon: LucidePersonStanding,
  },
  charter: {
    name: "Charter a Billionaire",
    description: "Show some billionaire earth from space.",
    baseCost: 250,
    costMultiplier: 1.25,
    auPerSecond: 5, // Increased AU/s to balance the cost
    threshold: 50,
    icon: LucidePlaneTakeoff,
    upgrades: {
      seats: {
        name: "Additional Seats",
        description: "Increase your carrying capacity.",
        cost: 2000, // Higher cost
        multiplier: 0.2, // Lower upgrade effectiveness to balance the boost
        maxCount: 5,
        threshold: 5,
        icon: LucideArmchair,
      },
      crew: {
        name: "Crew Members",
        description: "Add more crew members to speed up research.",
        cost: 3000, // Increased cost
        multiplier: 0.25,
        maxCount: 5,
        threshold: 10,
        icon: LucidePersonStanding,
      },
      marketing: {
        name: "Marketing Budget",
        description: "Increase the marketing budget to scam more billionaires.",
        cost: 4000, // Increased cost
        multiplier: 0.3, // More impact due to higher cost
        maxCount: 5,
        threshold: 15,
        icon: LucidePresentation,
      },
    },
  },
  miningRig: {
    name: "Asteroid Mining Rig",
    description: "Mine asteroids around the galaxy to earn AU.",
    baseCost: 1500,
    costMultiplier: 1.3, // Higher cost multiplier to reflect scaling difficulty
    auPerSecond: 8, // Increased AU/s to balance the higher cost
    threshold: 500,
    icon: LucidePickaxe,
    upgrades: {
      cargo_capacity: {
        name: "Cargo Capacity",
        description: "Increase the Mining Rig's load capacity.",
        cost: 7500, // Increased upgrade cost
        multiplier: 0.15, // Reduced effectiveness to match increased cost
        maxCount: 10,
        threshold: 5,
        icon: LucideBoxes,
      },
      boosters: {
        name: "Rocket Boosters",
        description: "Increase the mining rig's travel speed.",
        cost: 10000, // Increased cost
        multiplier: 0.25,
        maxCount: 5,
        threshold: 10,
        icon: LucideArrowBigUpDash,
      },
      drill: {
        name: "Drill Efficiency",
        description: "Increase the efficiency of the drill bit.",
        cost: 15000, // Increased cost
        multiplier: 0.35, // Balanced effectiveness
        maxCount: 2,
        threshold: 15,
        icon: LucideDrill,
      },
    },
  },
  exploration: {
    name: "Exploration",
    description: "Explore other galaxies in search of precious metals.",
    baseCost: 4500, // Increased cost
    costMultiplier: 1.35, // Increased cost multiplier
    auPerSecond: 15, // Higher AU/s output
    threshold: 1500,
    icon: LucideRocket,
    upgrades: {
      boosters: {
        name: "Rocket Boosters",
        description: "Increase the exploration ship's travel speed.",
        cost: 10000,
        multiplier: 0.15, // Lowered multiplier
        maxCount: 5,
        threshold: 5,
        icon: LucideArrowBigUpDash,
      },
      crew: {
        name: "Crew Members",
        description: "Add more crew members to help around the ship.",
        cost: 15000,
        multiplier: 0.3, // Increased multiplier
        maxCount: 5,
        threshold: 10,
        icon: LucidePersonStanding,
      },
      scientists: {
        name: "Scientists",
        description: "Add more scientists to speed up research.",
        cost: 20000, // Increased cost
        multiplier: 0.4, // Balanced multiplier
        maxCount: 5,
        threshold: 15,
        icon: LucideMicroscope,
      },
    },
  },
  satellite: {
    name: "Satellite Network",
    description: "Deploy satellites to enhance communication and resource gathering.",
    baseCost: 7000,
    costMultiplier: 1.4,
    auPerSecond: 12, // Increased AU/s output
    threshold: 2500,
    icon: LucideSatelliteDish,
    upgrades: {
      solarPanels: {
        name: "Solar Panels",
        description: "Increase energy efficiency of the satellites.",
        cost: 15000, // Increased cost
        multiplier: 0.15,
        maxCount: 10,
        threshold: 5,
        icon: LucideSun,
      },
      dataProcessing: {
        name: "Data Processing Units",
        description: "Improve data collection and analysis.",
        cost: 20000, // Increased cost
        multiplier: 0.25, // Higher multiplier
        maxCount: 5,
        threshold: 10,
        icon: LucideCpu,
      },
      thrusters: {
        name: "Advanced Thrusters",
        description: "Enable satellites to reposition faster.",
        cost: 30000, // Increased cost
        multiplier: 0.35, // Higher multiplier
        maxCount: 3,
        threshold: 15,
        icon: LucideRocket,
      },
    },
  },
  spaceStation: {
    name: "Space Station",
    description: "Construct a space station to serve as a hub for operations.",
    baseCost: 25000, // Increased cost
    costMultiplier: 1.45, // Higher multiplier
    auPerSecond: 25, // Higher AU/s output
    threshold: 10000,
    icon: LucideBuilding2,
    upgrades: {
      livingQuarters: {
        name: "Living Quarters",
        description: "Expand the space station to accommodate more crew.",
        cost: 35000, // Increased cost
        multiplier: 0.2, // Increased multiplier
        maxCount: 5,
        threshold: 5,
        icon: LucideBed,
      },
      researchLab: {
        name: "Research Labs",
        description: "Improve scientific research and technological advancements.",
        cost: 60000, // Increased cost
        multiplier: 0.35, // Increased multiplier
        maxCount: 5,
        threshold: 10,
        icon: LucideMicroscope,
      },
      defenseSystem: {
        name: "Defense Systems",
        description: "Protect the station from asteroids and other threats.",
        cost: 90000, // Increased cost
        multiplier: 0.45, // Higher multiplier
        maxCount: 3,
        threshold: 15,
        icon: LucideShieldAlert,
      },
    },
  },
  colonization: {
    name: "Colonize a Planet",
    description: "Assist mankind in colonizing a new planet.",
    baseCost: 60000, // Increased cost
    costMultiplier: 1.5, // Higher multiplier
    auPerSecond: 40, // Higher AU/s output
    threshold: 5000,
    icon: LucideTentTree,
    upgrades: {
      buildings: {
        name: "Buildings",
        description: "Construct additional buildings to house more people.",
        cost: 25000, // Increased cost
        multiplier: 0.2, // Balanced multiplier
        maxCount: 2,
        threshold: 5,
        icon: LucideBuilding,
      },
      houses: {
        name: "Houses",
        description: "Build more houses, offering room for population growth.",
        cost: 35000, // Increased cost
        multiplier: 0.3, // Increased multiplier
        maxCount: 5,
        threshold: 10,
        icon: LucideHouse,
      },
      hospitals: {
        name: "Hospitals",
        description: "Provide medical facilities to ensure population health.",
        cost: 50000, // Increased cost
        multiplier: 0.4, // Increased multiplier
        maxCount: 3,
        threshold: 15,
        icon: LucideHospital,
      },
      church: {
        name: "Churches",
        description: "Establish places of worship to strengthen morale.",
        cost: 75000, // Increased cost
        multiplier: 0.6, // Higher multiplier
        maxCount: 1,
        threshold: 25,
        icon: LucideChurch,
      },
    },
  },
  terraforming: {
    name: "Terraforming Project",
    description: "Transform a barren planet into a habitable world.",
    baseCost: 100000, // Increased cost
    costMultiplier: 1.55, // Higher multiplier
    auPerSecond: 75, // Higher AU/s output
    threshold: 25000,
    icon: LucideMountain,
    upgrades: {
      atmosphereGenerators: {
        name: "Atmosphere Generators",
        description: "Accelerate the creation of a breathable atmosphere.",
        cost: 150000, // Increased cost
        multiplier: 0.2, // Balanced multiplier
        maxCount: 10,
        threshold: 5,
        icon: LucideWind,
      },
      waterPurification: {
        name: "Water Purification Plants",
        description: "Ensure a clean and sustainable water supply.",
        cost: 200000, // Increased cost
        multiplier: 0.3, // Increased multiplier
        maxCount: 5,
        threshold: 10,
        icon: LucideDroplet,
      },
      ecoSystem: {
        name: "Ecosystem Development",
        description: "Introduce flora and fauna to the new world.",
        cost: 300000, // Increased cost
        multiplier: 0.5, // Balanced multiplier
        maxCount: 3,
        threshold: 15,
        icon: LucideLeaf,
      },
    },
  },
  spaceElevator: {
    name: "Space Elevator",
    description: "Build a space elevator to drastically reduce launch costs.",
    baseCost: 200000, // Increased cost
    costMultiplier: 1.6, // Higher multiplier
    auPerSecond: 120, // Higher AU/s output
    threshold: 50000,
    icon: LucideCableCar,
    upgrades: {
      cableMaterial: {
        name: "Advanced Cable Materials",
        description: "Enhance the strength and durability of the elevator cable.",
        cost: 300000, // Increased cost
        multiplier: 0.2, // Balanced multiplier
        maxCount: 10,
        threshold: 5,
        icon: LucideLink,
      },
      cargoCapacity: {
        name: "Cargo Capacity",
        description: "Increase the amount of materials that can be transported.",
        cost: 400000, // Increased cost
        multiplier: 0.3, // Increased multiplier
        maxCount: 5,
        threshold: 10,
        icon: LucideBoxes,
      },
      safetyProtocols: {
        name: "Enhanced Safety Protocols",
        description: "Minimize the risks of catastrophic failure.",
        cost: 600000, // Increased cost
        multiplier: 0.4, // Higher multiplier
        maxCount: 3,
        threshold: 15,
        icon: LucideShieldCheck,
      },
    },
  },
  warpDrive: {
    name: "Warp Drive",
    description: "Develop warp drive technology for faster-than-light travel.",
    baseCost: 1000000, // Increased cost
    costMultiplier: 1.65, // Higher multiplier
    auPerSecond: 250, // Higher AU/s output
    threshold: 250000,
    icon: LucideBolt,
    upgrades: {
      energySource: {
        name: "Advanced Energy Source",
        description: "Power the warp drive with a highly efficient energy core.",
        cost: 1500000, // Increased cost
        multiplier: 0.2, // Balanced multiplier
        maxCount: 10,
        threshold: 5,
        icon: LucideBatteryCharging,
      },
      navigationSystem: {
        name: "Quantum Navigation System",
        description: "Navigate through space with pinpoint accuracy.",
        cost: 2000000, // Increased cost
        multiplier: 0.35, // Increased multiplier
        maxCount: 5,
        threshold: 10,
        icon: LucideCompass,
      },
      stabilizers: {
        name: "Warp Field Stabilizers",
        description: "Ensure a smooth and stable warp travel experience.",
        cost: 3000000, // Increased cost
        multiplier: 0.5, // Balanced multiplier
        maxCount: 3,
        threshold: 15,
        icon: LucideRotate3D,
      },
    },
  },
};