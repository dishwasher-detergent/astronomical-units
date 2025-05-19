/**
 * Utils.ts
 * This file re-exports utility functions from specialized modules
 * to maintain backward compatibility while improving code organization
 */

// Common utilities
export { cn, getUpgrades, mergeNestedObjects } from "./common";

// Equipment-related utilities
export {
  calculateUpgradeMultiplier,
  generateEquipmentObject,
  generateEquipmentUpgradesObject,
  handleEquipmentThresholds,
} from "./equipment";

// Caching utilities
export { MemoizedCalculator, upgradeMultiplierCalc } from "./caching";

// Optimized calculators
export { calculateUpgradeMultiplierOptimized } from "./calculator";

// Formatting utilities
export { formatMoney } from "./formatters";

// Function moved to equipment.ts
