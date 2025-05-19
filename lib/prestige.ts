import {
  PRESTIGE_LEVEL_REQUIREMENTS,
  getLevelRequirements,
} from "@/constants/GLOBAL";

/**
 * Calculate the prestige level based on prestige income
 * @param prestigeIncome Prestige income earned in current prestige cycle
 * @param currentPrestigeLevel Current prestige level (for scaling requirements)
 * @returns The prestige level
 */
export function calculatePrestigeLevel(
  prestigeIncome: number,
  currentPrestigeLevel: number = 0,
): number {
  let level = 0;

  const requirements =
    currentPrestigeLevel === 0
      ? PRESTIGE_LEVEL_REQUIREMENTS
      : getLevelRequirements(currentPrestigeLevel);

  for (let i = 0; i < requirements.length; i++) {
    if (prestigeIncome >= requirements[i]) {
      level = i;
    } else {
      break;
    }
  }

  return level;
}

/**
 * Calculate progress to the next prestige level
 * @param prestigeIncome Prestige income earned in current prestige cycle
 * @param currentPrestigeLevel Current prestige level (for scaling requirements)
 * @returns Progress percentage (0-100) to the next level
 */
export function calculateNextLevelProgress(
  prestigeIncome: number,
  currentPrestigeLevel: number = 0,
): number {
  const currentLevel = calculatePrestigeLevel(
    prestigeIncome,
    currentPrestigeLevel,
  );

  const requirements =
    currentPrestigeLevel === 0
      ? PRESTIGE_LEVEL_REQUIREMENTS
      : getLevelRequirements(currentPrestigeLevel);

  if (currentLevel >= requirements.length - 1 || currentLevel >= 100) {
    return 100;
  }

  const currentThreshold = requirements[currentLevel];
  const nextThreshold = requirements[currentLevel + 1];

  const progress =
    ((prestigeIncome - currentThreshold) / (nextThreshold - currentThreshold)) *
    100;

  return Math.min(Math.max(0, progress), 100);
}

/**
 * Get the income requirement for the next prestige level
 * @param currentLevel Current level
 * @param currentPrestigeLevel Current prestige level (for scaling requirements)
 * @returns Income requirement for the next level or null if at max level
 */
export function getNextLevelRequirement(
  currentLevel: number,
  currentPrestigeLevel: number = 0,
): number | null {
  const requirements =
    currentPrestigeLevel === 0
      ? PRESTIGE_LEVEL_REQUIREMENTS
      : getLevelRequirements(currentPrestigeLevel);

  if (currentLevel >= requirements.length - 1 || currentLevel >= 100) {
    return null;
  }

  return requirements[currentLevel + 1];
}
