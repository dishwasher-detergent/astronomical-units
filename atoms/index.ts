/**
 * This file provides a structured export of all atoms
 * This makes importing atoms more organized and consistent
 */

// Core game state
export { gameData, lastUpdated, saveGameState } from "./global";

// Currency
export {
  addAu,
  au,
  auIncrement,
  autoIncrement,
  clickValueAtom,
  equipmentProductionRates,
  setAuDirectly,
  totalAu,
} from "./au";

// Equipment
export {
  addEquipment,
  equipment,
  equipmentItemFamily,
  equipmentRate,
  equipmentRateReduction,
  incrementEquipment,
  unlockAllEquipment,
} from "./equipment";

// Crew handling
export { crew, crewCurrent, crewValue } from "./crew";

// Prestige system
export {
  addPrestigePoints,
  calculatePrestigeMultiplier,
  canPrestige,
  lifetimePrestigePoints,
  performPrestige,
  potentialPrestigePoints,
  prestigeLevel,
  prestigeMultiplier,
  prestigePoints,
  prestigeUpgradeFamily,
  prestigeUpgrades,
  setPrestigeMultiplier,
} from "./prestige";

// UI state
export {
  animationsEnabled,
  isShownFamily,
  show,
  showElement,
  showUpgrade,
  themePreference,
} from "./ui";

// Upgrade navigation
export {
  nextPrestigeUpgrade,
  nextUpgrade,
  prestigeUpgradeIndex,
  upgradeIndex,
} from "./upgrades";
