import { Upgrade } from "@/types";
import {
  Activity,
  ArrowUp,
  LucideGem,
  LucideMagnet,
  Percent,
  Zap,
} from "lucide-react";

export const PRESTIGE_UPGRADES: Record<string, Upgrade> = {
  baseProduction: {
    name: "Base Production",
    description: "Increases base production of all equipment by 15% per level",
    cost: 1,
    maxCount: 20,
    multiplier: 1.15,
    threshold: 1,
    icon: ArrowUp,
  },
  upgradeDiscount: {
    name: "Upgrade Discount",
    description: "Reduces the cost of all regular upgrades by 8% per level",
    cost: 2,
    maxCount: 10,
    multiplier: 1.08,
    threshold: 1,
    icon: Percent,
  },
  offlineProduction: {
    name: "Offline Production",
    description: "Increases production while away by 20% per level",
    cost: 3,
    maxCount: 8,
    multiplier: 1.2,
    threshold: 1,
    icon: Activity,
  },
  criticalProduction: {
    name: "Critical Production",
    description: "5% chance per level to double production for a tick",
    cost: 8,
    maxCount: 10,
    multiplier: 1.05,
    threshold: 3,
    icon: Zap,
  },
  resourceMagnetism: {
    name: "Resource Magnetism",
    description:
      "Increases all passive resource gains by 10% per level (multiplicative)",
    cost: 10,
    maxCount: 5,
    multiplier: 1.1,
    threshold: 4,
    icon: LucideMagnet,
  },
  preciousFinds: {
    name: "Precious Finds",
    description:
      "7% chance per level to find bonus AUs (+50% of normal click value) when collecting",
    cost: 12,
    maxCount: 8,
    multiplier: 1.07,
    threshold: 5,
    icon: LucideGem,
  },
};
