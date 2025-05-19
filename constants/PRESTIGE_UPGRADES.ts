import { Upgrade } from "@/types";
import { Activity, ArrowUp, Percent } from "lucide-react";

export const PRESTIGE_UPGRADES: Record<string, Upgrade> = {
  baseProduction: {
    name: "Base Production",
    description: "Increases base production of all equipment",
    cost: 1,
    maxCount: 10,
    multiplier: 1.1,
    threshold: 1,
    icon: ArrowUp,
  },
  upgradeDiscount: {
    name: "Upgrade Discount",
    description: "Reduces the cost of all regular upgrades",
    cost: 3,
    maxCount: 5,
    multiplier: 1.1,
    threshold: 1,
    icon: Percent,
  },
  offlineProduction: {
    name: "Offline Production",
    description: "Increases production while away",
    cost: 4,
    maxCount: 5,
    multiplier: 1.1,
    threshold: 1,
    icon: Activity,
  },
};
