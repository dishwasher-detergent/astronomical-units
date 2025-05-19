import { Equipment, EquipmentItem, EquipmentObject } from "@/types";

/**
 * Creates an object with equipment upgrade keys initialized to zero
 * @param equipment - The equipment item containing upgrades to initialize
 * @returns Object with upgrade keys set to zero values
 */
export function generateEquipmentUpgradesObject(equipment: Equipment) {
  const newObject: Record<string, number> = {};
  if (equipment?.upgrades) {
    Object.entries(equipment.upgrades).forEach(([upgradeKey, _]) => {
      newObject[upgradeKey] = 0;
    });
  }

  return newObject;
}

/**
 * Creates an initialized equipment object with values set to zero and upgrades initialized
 * @param equipmentList - Record of equipment types to initialize
 * @returns Equipment object with all values initialized to zero
 */
export function generateEquipmentObject(
  equipmentList: Record<string, Equipment>,
) {
  const newObject: EquipmentObject = {};

  Object.entries(equipmentList).forEach(([key, value]: [string, Equipment]) => {
    newObject[key] = {
      value: 0,
      upgrades: generateEquipmentUpgradesObject(value),
    };
  });

  return newObject;
}

/**
 * Calculates the total multiplier for an equipment item based on upgrades and prestige
 * @param equipment - The equipment item to calculate multiplier for
 * @param item - The equipment type definition
 * @param prestigeMultiplier - The prestige multiplier to apply (default: 1)
 * @returns Total calculated upgrade multiplier
 */
export function calculateUpgradeMultiplier(
  equipment: EquipmentItem,
  item: Equipment,
  prestigeMultiplier: number = 1,
) {
  let multiplier = 1;

  if (!item) {
    return multiplier * prestigeMultiplier;
  }

  if (equipment?.upgrades) {
    multiplier += Object.entries(equipment.upgrades).reduce(
      (acc, [upgradeKey, upgradeVal]) => {
        const upgradeItem = item.upgrades?.[upgradeKey];
        if (!upgradeItem) return acc;
        return acc + (upgradeItem.multiplier ?? 1) * upgradeVal;
      },
      0,
    );
  }

  return multiplier * prestigeMultiplier;
}

/**
 * Helper function to handle all logic related to checking and showing equipment thresholds
 * @param key - The equipment key being updated
 * @param currentVal - The current value of the equipment
 * @param newVal - The new value after update
 * @param showFunc - Function to update the show state
 * @param equipmentList - The list of all equipment
 */
export function handleEquipmentThresholds(
  key: string,
  currentVal: number,
  newVal: number,
  showFunc: (key: string) => void,
  equipmentList: Record<string, Equipment>,
) {
  const equip = equipmentList[key]?.upgrades;
  if (equip) {
    Object.entries(equip).forEach(([upgradeKey, value]: [string, any]) => {
      if (newVal >= value.threshold) {
        if (currentVal < value.threshold || currentVal === 0) {
          showFunc(`${key}_${upgradeKey}`);
        }
      }
    });
  }

  Object.entries(equipmentList).forEach(([equipKey, equipDetails]) => {
    if (
      equipKey !== key && // Don't check the same equipment we're updating
      newVal >= equipDetails.threshold // Check if we've met the threshold
    ) {
      if (currentVal < equipDetails.threshold || currentVal === 0) {
        showFunc(equipKey);
      }
    }
  });
}
