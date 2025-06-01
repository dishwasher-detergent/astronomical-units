export const LOCALE = "en-US";
export const APP_NAME = "Astronomical Units";
export const APP_SHORT_NAME = "AU Idle";
export const APP_DESCRIPTION =
  "Embark on a cosmic journey where you start as a small space explorer gathering resources from nearby asteroids. As you accumulate more energy and materials, expand your fleet, colonize distant planets, and unlock advanced technologies. Set your sights on conquering the galaxy by discovering new star systems, establishing trade routes, and managing interstellar alliances. The universe is vast, and with every click, your empire grows—one astronomical unit at a time!";

export const NUMBER_OPTIONS: Intl.NumberFormatOptions = {
  style: "decimal",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
};

export const generateLevelRequirements = (
  prestigeLevel: number = 0,
): number[] => {
  const requirements: number[] = [0];
  const baseRequirement = 1_000 * Math.pow(1.5, prestigeLevel);
  const growthMultiplier = 1.5 + prestigeLevel * 0.01;

  for (let level = 1; level <= MAX_LEVEL_PRESTIGE; level++) {
    if (level <= 10) {
      requirements.push(Math.floor(baseRequirement * level));
    } else if (level <= 50) {
      requirements.push(
        Math.floor(
          baseRequirement * Math.pow(growthMultiplier, level - 10) * 10,
        ),
      );
    } else {
      requirements.push(
        Math.floor(
          baseRequirement * Math.pow(growthMultiplier * 1.05, level - 40) * 50,
        ),
      );
    }
  }

  return requirements;
};

export const MAX_LEVEL_PRESTIGE = 100;
export const BASE_PRESTIGE_LEVEL_REQUIREMENTS = generateLevelRequirements(0);
export const PRESTIGE_LEVEL_REQUIREMENTS = BASE_PRESTIGE_LEVEL_REQUIREMENTS;

export function getLevelRequirements(prestigeLevel: number): number[] {
  if (prestigeLevel === 0) {
    return BASE_PRESTIGE_LEVEL_REQUIREMENTS;
  }
  return generateLevelRequirements(prestigeLevel);
}
