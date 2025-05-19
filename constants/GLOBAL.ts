export const LOCALE = "en-US";
export const APP_NAME = "Astronomical Units";
export const APP_SHORT_NAME = "AU Idle";
export const APP_DESCRIPTION =
  "Embark on a cosmic journey where you start as a small space explorer gathering resources from nearby asteroids. As you accumulate more energy and materials, expand your fleet, colonize distant planets, and unlock advanced technologies. Set your sights on conquering the galaxy by discovering new star systems, establishing trade routes, and managing interstellar alliances. The universe is vast, and with every click, your empire grows—one astronomical unit at a time!";

export const EFFECT_MAX = 25;
export const EFFECT_MIN = 1;

export const NUMBER_OPTIONS: Intl.NumberFormatOptions = {
  style: "decimal",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
};

export const AU = {
  total: 0,
  current: 0,
};

// Generate level requirements for levels 1-100 with increasing costs
// Formula: base * (multiplier^level)
export const generateLevelRequirements = (
  prestigeLevel: number = 0,
): number[] => {
  const requirements: number[] = [0]; // Level 0 (starting)
  const baseRequirement = 1_000 * Math.pow(1.5, prestigeLevel); // Base increases with prestige level
  const growthMultiplier = 1.1 + prestigeLevel * 0.01; // Growth rate increases with prestige

  for (let level = 1; level <= 100; level++) {
    // For early levels (1-10), use a gentler curve
    if (level <= 10) {
      requirements.push(Math.floor(baseRequirement * level));
    }
    // For mid levels (11-50), use moderate growth
    else if (level <= 50) {
      requirements.push(
        Math.floor(
          baseRequirement * Math.pow(growthMultiplier, level - 10) * 10,
        ),
      );
    }
    // For higher levels (51-100), use exponential growth
    else {
      requirements.push(
        Math.floor(
          baseRequirement * Math.pow(growthMultiplier * 1.05, level - 40) * 50,
        ),
      );
    }
  }

  return requirements;
};

// Get base requirements (prestige level 0)
export const BASE_PRESTIGE_LEVEL_REQUIREMENTS = generateLevelRequirements(0);

// This will be used as the default requirement list
export const PRESTIGE_LEVEL_REQUIREMENTS = BASE_PRESTIGE_LEVEL_REQUIREMENTS;

// Function to get requirements adjusted for current prestige level
export function getLevelRequirements(prestigeLevel: number): number[] {
  if (prestigeLevel === 0) {
    return BASE_PRESTIGE_LEVEL_REQUIREMENTS;
  }
  return generateLevelRequirements(prestigeLevel);
}
