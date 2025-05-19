import { Equipment } from "@/types";
import {
  LucideAnvil,
  LucideArmchair,
  LucideArrowBigUpDash,
  LucideArrowRight,
  LucideAtom,
  LucideBattery,
  LucideBatteryCharging,
  LucideBed,
  LucideBolt,
  LucideBox,
  LucideBoxes,
  LucideBuilding,
  LucideBuilding2,
  LucideCableCar,
  LucideCastle,
  LucideChurch,
  LucideCircleDot,
  LucideClock,
  LucideCode,
  LucideCompass,
  LucideCpu,
  LucideCrown,
  LucideDoorOpen,
  LucideDrill,
  LucideDroplet,
  LucideFastForward,
  LucideGem,
  LucideGraduationCap,
  LucideHospital,
  LucideHouse,
  LucideLayers,
  LucideLeaf,
  LucideLink,
  LucideMagnet,
  LucideMapPin,
  LucideMicroscope,
  LucideMountain,
  LucideNetwork,
  LucidePersonStanding,
  LucidePickaxe,
  LucidePlaneTakeoff,
  LucidePresentation,
  LucideRadar,
  LucideRocket,
  LucideRotate3D,
  LucideSatelliteDish,
  LucideShield,
  LucideShieldAlert,
  LucideShieldCheck,
  LucideShip,
  LucideSignal,
  LucideSmile,
  LucideSun,
  LucideSword,
  LucideTableCellsSplit,
  LucideTentTree,
  LucideThermometer,
  LucideTrain,
  LucideWind,
} from "lucide-react";

export const EQUIPMENT_LIST: Record<string, Equipment> = {
  crew: {
    name: "Crew Member",
    description:
      "Adds another member to your crew, increasing your AU per click.",
    baseCost: 15,
    costMultiplier: 1.12,
    auPerSecond: 1,
    threshold: 20,
    equipment: false,
    icon: LucidePersonStanding,
    upgrades: {
      training: {
        name: "Training",
        description: "Train your crew members to more efficiently operate.",
        cost: 3000,
        multiplier: 0.25,
        maxCount: 20,
        threshold: 5,
        icon: LucideGraduationCap,
      },
      moraleBoost: {
        name: "Morale Boost",
        description: "Increase the morale of your crew, boosting productivity.",
        cost: 8000,
        multiplier: 0.2,
        maxCount: 10,
        threshold: 10,
        icon: LucideSmile,
      },
      equipmentUpgrade: {
        name: "Equipment Upgrade",
        description:
          "Provide better tools for your crew, enhancing efficiency.",
        cost: 12000,
        multiplier: 0.35,
        maxCount: 10,
        threshold: 15,
        icon: LucideBolt,
      },
    },
  },
  charter: {
    name: "Charter a Billionaire",
    description: "Show some billionaire Earth from space.",
    baseCost: 100,
    costMultiplier: 1.13,
    auPerSecond: 6,
    threshold: 50,
    icon: LucidePlaneTakeoff,
    upgrades: {
      seats: {
        name: "Additional Seats",
        description: "Increase your carrying capacity.",
        cost: 1800,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 5,
        icon: LucideArmchair,
      },
      crew: {
        name: "Crew Members",
        description: "Add more crew members to speed up research.",
        cost: 2800,
        multiplier: 0.3,
        maxCount: 5,
        threshold: 10,
        icon: LucidePersonStanding,
      },
      marketing: {
        name: "Marketing Budget",
        description: "Increase the marketing budget to scam more billionaires.",
        cost: 3800,
        multiplier: 0.35,
        maxCount: 5,
        threshold: 15,
        icon: LucidePresentation,
      },
    },
  },
  miningRig: {
    name: "Asteroid Mining Rig",
    description: "Mine asteroids around the galaxy to earn AU.",
    baseCost: 1200,
    costMultiplier: 1.13,
    auPerSecond: 10,
    threshold: 500,
    icon: LucidePickaxe,
    upgrades: {
      cargo_capacity: {
        name: "Cargo Capacity",
        description: "Increase the Mining Rig's load capacity.",
        cost: 6500,
        multiplier: 0.18,
        maxCount: 8,
        threshold: 5,
        icon: LucideBoxes,
      },
      boosters: {
        name: "Rocket Boosters",
        description: "Increase the mining rig's travel speed.",
        cost: 9000,
        multiplier: 0.3,
        maxCount: 5,
        threshold: 10,
        icon: LucideArrowBigUpDash,
      },
      drill: {
        name: "Drill Efficiency",
        description: "Increase the efficiency of the drill bit.",
        cost: 13500,
        multiplier: 0.45,
        maxCount: 3,
        threshold: 15,
        icon: LucideDrill,
      },
    },
  },
  exploration: {
    name: "Exploration",
    description: "Explore other galaxies in search of precious metals.",
    baseCost: 4000,
    costMultiplier: 1.13,
    auPerSecond: 18,
    threshold: 1500,
    icon: LucideRocket,
    upgrades: {
      boosters: {
        name: "Rocket Boosters",
        description: "Increase the exploration ship's travel speed.",
        cost: 9000,
        multiplier: 0.18,
        maxCount: 5,
        threshold: 5,
        icon: LucideArrowBigUpDash,
      },
      crew: {
        name: "Crew Members",
        description: "Add more crew members to help around the ship.",
        cost: 13000,
        multiplier: 0.35,
        maxCount: 5,
        threshold: 10,
        icon: LucidePersonStanding,
      },
      scientists: {
        name: "Scientists",
        description: "Add more scientists to speed up research.",
        cost: 18000,
        multiplier: 0.5,
        maxCount: 4,
        threshold: 15,
        icon: LucideMicroscope,
      },
    },
  },
  satellite: {
    name: "Satellite Network",
    description:
      "Deploy satellites to enhance communication and resource gathering.",
    baseCost: 6000,
    costMultiplier: 1.13,
    auPerSecond: 15,
    threshold: 2500,
    icon: LucideSatelliteDish,
    upgrades: {
      solarPanels: {
        name: "Solar Panels",
        description: "Increase energy efficiency of the satellites.",
        cost: 13000,
        multiplier: 0.18,
        maxCount: 8,
        threshold: 5,
        icon: LucideSun,
      },
      dataProcessing: {
        name: "Data Processing Units",
        description: "Improve data collection and analysis.",
        cost: 18000,
        multiplier: 0.3,
        maxCount: 5,
        threshold: 10,
        icon: LucideCpu,
      },
      thrusters: {
        name: "Advanced Thrusters",
        description: "Enable satellites to reposition faster.",
        cost: 25000,
        multiplier: 0.45,
        maxCount: 3,
        threshold: 15,
        icon: LucideRocket,
      },
    },
  },
  spaceStation: {
    name: "Space Station",
    description: "Construct a space station to serve as a hub for operations.",
    baseCost: 22000,
    costMultiplier: 1.13,
    auPerSecond: 30,
    threshold: 10000,
    icon: LucideBuilding2,
    upgrades: {
      livingQuarters: {
        name: "Living Quarters",
        description: "Expand the space station to accommodate more crew.",
        cost: 30000,
        multiplier: 0.25,
        maxCount: 5,
        threshold: 5,
        icon: LucideBed,
      },
      researchLab: {
        name: "Research Labs",
        description:
          "Improve scientific research and technological advancements.",
        cost: 50000,
        multiplier: 0.4,
        maxCount: 5,
        threshold: 10,
        icon: LucideMicroscope,
      },
      defenseSystem: {
        name: "Defense Systems",
        description: "Protect the station from asteroids and other threats.",
        cost: 75000,
        multiplier: 0.55,
        maxCount: 3,
        threshold: 15,
        icon: LucideShieldAlert,
      },
    },
  },
  terraforming: {
    name: "Terraforming Project",
    description: "Transform a barren planet into a habitable world.",
    baseCost: 50000,
    costMultiplier: 1.13,
    auPerSecond: 50,
    threshold: 25000,
    icon: LucideMountain,
    upgrades: {
      atmosphereGenerators: {
        name: "Atmosphere Generators",
        description: "Accelerate the creation of a breathable atmosphere.",
        cost: 22000,
        multiplier: 0.25,
        maxCount: 8,
        threshold: 5,
        icon: LucideWind,
      },
      waterPurification: {
        name: "Water Purification Plants",
        description: "Ensure a clean and sustainable water supply.",
        cost: 30000,
        multiplier: 0.35,
        maxCount: 5,
        threshold: 10,
        icon: LucideDroplet,
      },
      ecoSystem: {
        name: "Ecosystem Development",
        description: "Introduce flora and fauna to the new world.",
        cost: 40000,
        multiplier: 0.6,
        maxCount: 3,
        threshold: 15,
        icon: LucideLeaf,
      },
    },
  },
  colonization: {
    name: "Colonize a Planet",
    description: "Assist mankind in colonizing a new planet.",
    baseCost: 85000,
    costMultiplier: 1.13,
    auPerSecond: 90,
    threshold: 50000,
    icon: LucideTentTree,
    upgrades: {
      buildings: {
        name: "Buildings",
        description: "Construct additional buildings to house more people.",
        cost: 125000,
        multiplier: 0.25,
        maxCount: 3,
        threshold: 5,
        icon: LucideBuilding,
      },
      houses: {
        name: "Houses",
        description: "Build more houses, offering room for population growth.",
        cost: 175000,
        multiplier: 0.35,
        maxCount: 5,
        threshold: 10,
        icon: LucideHouse,
      },
      hospitals: {
        name: "Hospitals",
        description: "Provide medical facilities to ensure population health.",
        cost: 225000,
        multiplier: 0.45,
        maxCount: 3,
        threshold: 15,
        icon: LucideHospital,
      },
      church: {
        name: "Churches",
        description: "Everyone needs something to believe in, right?",
        cost: 275000,
        multiplier: 0.6,
        maxCount: 2,
        threshold: 25,
        icon: LucideChurch,
      },
      stori: {
        name: "Stori Beans",
        description: "The queen of the world!",
        cost: 450000,
        multiplier: 1.0,
        maxCount: 1,
        threshold: 50,
        icon: LucideCrown,
      },
    },
  },
  spaceElevator: {
    name: "Space Elevator",
    description: "Build a space elevator to drastically reduce launch costs.",
    baseCost: 175000,
    costMultiplier: 1.13,
    auPerSecond: 150,
    threshold: 75000,
    icon: LucideCableCar,
    upgrades: {
      cableMaterial: {
        name: "Advanced Cable Materials",
        description:
          "Enhance the strength and durability of the elevator cable.",
        cost: 250000,
        multiplier: 0.25,
        maxCount: 8,
        threshold: 5,
        icon: LucideLink,
      },
      cargoCapacity: {
        name: "Cargo Capacity",
        description:
          "Increase the amount of materials that can be transported.",
        cost: 350000,
        multiplier: 0.35,
        maxCount: 5,
        threshold: 10,
        icon: LucideBoxes,
      },
      safetyProtocols: {
        name: "Enhanced Safety Protocols",
        description: "Minimize the risks of catastrophic failure.",
        cost: 500000,
        multiplier: 0.5,
        maxCount: 3,
        threshold: 15,
        icon: LucideShieldCheck,
      },
    },
  },
  warpDrive: {
    name: "Warp Drive",
    description: "Develop warp drive technology for faster-than-light travel.",
    baseCost: 800000,
    costMultiplier: 1.13,
    auPerSecond: 300,
    threshold: 250000,
    icon: LucideBolt,
    upgrades: {
      energySource: {
        name: "Advanced Energy Source",
        description:
          "Power the warp drive with a highly efficient energy core.",
        cost: 1200000,
        multiplier: 0.25,
        maxCount: 8,
        threshold: 5,
        icon: LucideBatteryCharging,
      },
      navigationSystem: {
        name: "Quantum Navigation System",
        description: "Navigate through space with pinpoint accuracy.",
        cost: 1600000,
        multiplier: 0.4,
        maxCount: 5,
        threshold: 10,
        icon: LucideCompass,
      },
      stabilizers: {
        name: "Warp Field Stabilizers",
        description: "Ensure a smooth and stable warp travel experience.",
        cost: 2400000,
        multiplier: 0.6,
        maxCount: 3,
        threshold: 15,
        icon: LucideRotate3D,
      },
    },
  },
  orbitalRing: {
    name: "Orbital Ring",
    description:
      "Construct an orbital ring around the planet for enhanced logistics.",
    baseCost: 2400000,
    costMultiplier: 1.13,
    auPerSecond: 500,
    threshold: 750000,
    icon: LucideCircleDot,
    upgrades: {
      constructionMaterials: {
        name: "Advanced Construction Materials",
        description: "Enhance the durability and longevity of the ring.",
        cost: 4000000,
        multiplier: 0.25,
        maxCount: 8,
        threshold: 5,
        icon: LucideLayers,
      },
      transportNetwork: {
        name: "Efficient Transport Network",
        description: "Increase the capacity and speed of material transport.",
        cost: 5600000,
        multiplier: 0.4,
        maxCount: 5,
        threshold: 10,
        icon: LucideTrain,
      },
      defenseGrid: {
        name: "Orbital Defense Grid",
        description: "Protect the ring from potential threats.",
        cost: 8000000,
        multiplier: 0.6,
        maxCount: 3,
        threshold: 15,
        icon: LucideShieldCheck,
      },
    },
  },
  quantumComputer: {
    name: "Quantum Computer",
    description: "Develop a quantum computer to perform advanced calculations.",
    baseCost: 6000000,
    costMultiplier: 1.13,
    auPerSecond: 650,
    threshold: 1500000,
    icon: LucideCpu,
    upgrades: {
      qubits: {
        name: "Qubit Expansion",
        description: "Increase the computational power with more qubits.",
        cost: 8000000,
        multiplier: 0.25,
        maxCount: 8,
        threshold: 5,
        icon: LucideBox,
      },
      coolingSystem: {
        name: "Advanced Cooling System",
        description: "Improve the stability and efficiency of the computer.",
        cost: 12000000,
        multiplier: 0.4,
        maxCount: 5,
        threshold: 10,
        icon: LucideThermometer,
      },
      algorithms: {
        name: "Optimized Algorithms",
        description: "Enhance the processing speed with better algorithms.",
        cost: 20000000,
        multiplier: 0.6,
        maxCount: 3,
        threshold: 15,
        icon: LucideCode,
      },
    },
  },
  stargate: {
    name: "Stargate",
    description: "Build a Stargate to instantly travel between distant points.",
    baseCost: 12000000,
    costMultiplier: 1.13,
    auPerSecond: 900,
    threshold: 3000000,
    icon: LucideDoorOpen,
    upgrades: {
      portalStabilization: {
        name: "Portal Stabilization",
        description: "Reduce the risk of unstable portal openings.",
        cost: 16000000,
        multiplier: 0.25,
        maxCount: 8,
        threshold: 5,
        icon: LucideWind,
      },
      powerSupply: {
        name: "Enhanced Power Supply",
        description: "Ensure continuous power for smooth portal operation.",
        cost: 24000000,
        multiplier: 0.4,
        maxCount: 5,
        threshold: 10,
        icon: LucideBatteryCharging,
      },
      networkExpansion: {
        name: "Network Expansion",
        description: "Increase the number of connected destinations.",
        cost: 40000000,
        multiplier: 0.6,
        maxCount: 3,
        threshold: 15,
        icon: LucideNetwork,
      },
    },
  },
  fusionReactor: {
    name: "Fusion Reactor",
    description:
      "Harness the power of fusion to generate vast amounts of energy.",
    baseCost: 20000000, // Reduced from 25000000
    costMultiplier: 1.13, // Reduced from 1.15
    auPerSecond: 1100, // Increased from 850
    threshold: 5000000,
    icon: LucideAtom,
    upgrades: {
      fuelEfficiency: {
        name: "Fuel Efficiency",
        description: "Optimize the use of fusion fuel for more output.",
        cost: 24000000, // Reduced from 30000000
        multiplier: 0.25, // Increased from 0.2
        maxCount: 8, // Reduced from 10
        threshold: 5,
        icon: LucideDroplet,
      },
      magneticContainment: {
        name: "Magnetic Containment",
        description:
          "Improve the stability of the reactor's containment field.",
        cost: 36000000, // Reduced from 45000000
        multiplier: 0.45, // Increased from 0.4
        maxCount: 5,
        threshold: 10,
        icon: LucideMagnet,
      },
      heatDissipation: {
        name: "Heat Dissipation",
        description: "Enhance cooling systems to handle higher energy output.",
        cost: 48000000, // Reduced from 60000000
        multiplier: 0.6, // Increased from 0.5
        maxCount: 3,
        threshold: 15,
        icon: LucideThermometer,
      },
    },
  },
  starshipFleet: {
    name: "Starship Fleet",
    description: "Assemble a fleet of starships for exploration and defense.",
    baseCost: 40000000, // Reduced from 50000000
    costMultiplier: 1.13, // Reduced from 1.15
    auPerSecond: 1300, // Increased from 1000
    threshold: 10000000,
    icon: LucideShip,
    upgrades: {
      fleetSize: {
        name: "Expand Fleet Size",
        description: "Increase the number of starships in your fleet.",
        cost: 56000000, // Reduced from 70000000
        multiplier: 0.25, // Increased from 0.2
        maxCount: 8, // Reduced from 10
        threshold: 5,
        icon: LucideBox,
      },
      weaponSystems: {
        name: "Advanced Weapon Systems",
        description: "Equip your fleet with cutting-edge weaponry.",
        cost: 80000000, // Reduced from 100000000
        multiplier: 0.45, // Increased from 0.4
        maxCount: 5,
        threshold: 10,
        icon: LucideSword,
      },
      shieldGenerators: {
        name: "Shield Generators",
        description: "Enhance the fleet's defensive capabilities.",
        cost: 120000000, // Reduced from 150000000
        multiplier: 0.65, // Increased from 0.5
        maxCount: 3,
        threshold: 15,
        icon: LucideShield,
      },
    },
  },
  wormholeGenerator: {
    name: "Wormhole Generator",
    description: "Create wormholes to traverse vast distances instantly.",
    baseCost: 60000000, // Reduced from 75000000
    costMultiplier: 1.13, // Reduced from 1.15
    auPerSecond: 2000, // Increased from 1500
    threshold: 20000000,
    icon: LucideHouse,
    upgrades: {
      generatorStability: {
        name: "Generator Stability",
        description: "Reduce the risk of wormhole collapse.",
        cost: 80000000, // Reduced from 100000000
        multiplier: 0.25, // Increased from 0.2
        maxCount: 8, // Reduced from 10
        threshold: 5,
        icon: LucideWind,
      },
      destinationAccuracy: {
        name: "Destination Accuracy",
        description: "Increase the precision of wormhole exits.",
        cost: 120000000, // Reduced from 150000000
        multiplier: 0.5, // Increased from 0.4
        maxCount: 5,
        threshold: 10,
        icon: LucideMapPin,
      },
      energyEfficiency: {
        name: "Energy Efficiency",
        description: "Optimize energy consumption for sustained operation.",
        cost: 160000000, // Reduced from 200000000
        multiplier: 0.7, // Increased from 0.5
        maxCount: 3,
        threshold: 15,
        icon: LucideBatteryCharging,
      },
    },
  },
  orbitalCity: {
    name: "Orbital City",
    description: "Construct a city in orbit to house millions of people.",
    baseCost: 80000000, // Reduced from 100000000
    costMultiplier: 1.13, // Reduced from 1.15
    auPerSecond: 2500, // Increased from 2000
    threshold: 25000000,
    icon: LucideCastle,
    upgrades: {
      populationCapacity: {
        name: "Expand Population Capacity",
        description: "Increase the city's capacity to house more residents.",
        cost: 120000000, // Reduced from 150000000
        multiplier: 0.25, // Increased from 0.2
        maxCount: 8, // Reduced from 10
        threshold: 5,
        icon: LucideBuilding,
      },
      energyGrid: {
        name: "Advanced Energy Grid",
        description: "Improve the city's energy efficiency and output.",
        cost: 160000000, // Reduced from 200000000
        multiplier: 0.5, // Increased from 0.4
        maxCount: 5,
        threshold: 10,
        icon: LucideBattery,
      },
      transportationNetwork: {
        name: "Efficient Transportation Network",
        description: "Enhance the city's internal transportation systems.",
        cost: 240000000, // Reduced from 300000000
        multiplier: 0.7, // Increased from 0.5
        maxCount: 3,
        threshold: 15,
        icon: LucideTrain,
      },
    },
  },
  intergalacticProbe: {
    name: "Intergalactic Probe",
    description: "Launch a probe to explore other galaxies.",
    baseCost: 120000000, // Reduced from 150000000
    costMultiplier: 1.13, // Reduced from 1.15
    auPerSecond: 3000, // Increased from 2500
    threshold: 50000000,
    icon: LucideCompass,
    upgrades: {
      sensorArray: {
        name: "Advanced Sensor Array",
        description: "Improve the probe's data collection capabilities.",
        cost: 160000000, // Reduced from 200000000
        multiplier: 0.25, // Increased from 0.2
        maxCount: 8, // Reduced from 10
        threshold: 5,
        icon: LucideRadar,
      },
      propulsionSystem: {
        name: "High-Efficiency Propulsion System",
        description: "Increase the probe's travel speed.",
        cost: 240000000, // Reduced from 300000000
        multiplier: 0.5, // Increased from 0.4
        maxCount: 5,
        threshold: 10,
        icon: LucideArrowRight,
      },
      dataTransmission: {
        name: "Quantum Data Transmission",
        description: "Enhance the probe's ability to send data back quickly.",
        cost: 400000000, // Reduced from 500000000
        multiplier: 0.7, // Increased from 0.5
        maxCount: 3,
        threshold: 15,
        icon: LucideSignal,
      },
    },
  },
  matterSynthesizer: {
    name: "Matter Synthesizer",
    description: "Synthesize raw materials from energy.",
    baseCost: 160000000, // Reduced from 200000000
    costMultiplier: 1.13, // Reduced from 1.15
    auPerSecond: 3800, // Increased from 3000
    threshold: 75000000,
    icon: LucideAnvil,
    upgrades: {
      energyConversion: {
        name: "Energy Conversion Efficiency",
        description: "Improve the efficiency of matter synthesis.",
        cost: 200000000, // Reduced from 250000000
        multiplier: 0.25, // Increased from 0.2
        maxCount: 8, // Reduced from 10
        threshold: 5,
        icon: LucideBattery,
      },
      materialPurity: {
        name: "Material Purity Enhancement",
        description: "Increase the quality of synthesized materials.",
        cost: 280000000, // Reduced from 350000000
        multiplier: 0.5, // Increased from 0.4
        maxCount: 5,
        threshold: 10,
        icon: LucideGem,
      },
      productionRate: {
        name: "Accelerated Production",
        description: "Boost the rate of material synthesis.",
        cost: 400000000, // Reduced from 500000000
        multiplier: 0.7, // Increased from 0.5
        maxCount: 3,
        threshold: 15,
        icon: LucideClock,
      },
    },
  },
  timeDilationDevice: {
    name: "Time Dilation Device",
    description: "Manipulate time to accelerate progress.",
    baseCost: 240000000, // Reduced from 300000000
    costMultiplier: 1.13, // Reduced from 1.15
    auPerSecond: 4500, // Increased from 3500
    threshold: 100000000,
    icon: LucideClock,
    upgrades: {
      temporalStability: {
        name: "Temporal Stability",
        description: "Improve the stability of time manipulation.",
        cost: 320000000, // Reduced from 400000000
        multiplier: 0.25, // Increased from 0.2
        maxCount: 8, // Reduced from 10
        threshold: 5,
        icon: LucideShield,
      },
      timeCompression: {
        name: "Time Compression",
        description: "Increase the effect of time dilation.",
        cost: 480000000, // Reduced from 600000000
        multiplier: 0.5, // Increased from 0.4
        maxCount: 5,
        threshold: 10,
        icon: LucideFastForward,
      },
      energyConservation: {
        name: "Energy Conservation",
        description: "Optimize energy usage during time manipulation.",
        cost: 640000000, // Reduced from 800000000
        multiplier: 0.7, // Increased from 0.5
        maxCount: 3,
        threshold: 15,
        icon: LucideBattery,
      },
    },
  },
  DysonSphere: {
    name: "Dyson Sphere",
    description: "Construct a Dyson Sphere to harness the power of a star.",
    baseCost: 400000000, // Reduced from 500000000
    costMultiplier: 1.13, // Reduced from 1.15
    auPerSecond: 6500, // Increased from 5000
    threshold: 200000000,
    icon: LucideSun,
    upgrades: {
      solarCollectors: {
        name: "Advanced Solar Collectors",
        description: "Increase energy collection efficiency.",
        cost: 480000000, // Reduced from 600000000
        multiplier: 0.25, // Increased from 0.2
        maxCount: 8, // Reduced from 10
        threshold: 5,
        icon: LucideBatteryCharging,
      },
      energyStorage: {
        name: "High-Capacity Energy Storage",
        description: "Store excess energy for later use.",
        cost: 720000000, // Reduced from 900000000
        multiplier: 0.5, // Increased from 0.4
        maxCount: 5,
        threshold: 10,
        icon: LucideShield,
      },
      stabilityEnhancements: {
        name: "Structural Stability Enhancements",
        description: "Ensure the Dyson Sphere remains stable over time.",
        cost: 960000000, // Reduced from 1200000000
        multiplier: 0.8, // Increased from 0.5
        maxCount: 3,
        threshold: 15,
        icon: LucideTableCellsSplit,
      },
    },
  },
};
