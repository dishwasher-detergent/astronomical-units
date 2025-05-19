import { equipment } from "@/atoms/equipment";
import { prestigeUpgrades } from "@/atoms/prestige";
import { show } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { handleEquipmentThresholds } from "@/lib/equipment";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

/**
 * Function to create an atom for a specific equipment item
 * @param elementKey - The key of the equipment item
 * @returns An object containing purchase and sell atoms
 */
export function createEquipmentAtom(elementKey: string) {
  const item = focusAtom(equipment, (optic) => optic.prop(elementKey));

  return {
    purchase: atom(
      (get) => get(item),
      (get, set, quantity: number = 1) => {
        const currentVal = get(item).value;
        const newVal = currentVal + quantity;
        const baseBuildTime = EQUIPMENT_LIST[elementKey].buildTime || 0;

        // Apply Rapid Construction prestige upgrade effect if available
        const allUpgrades = get(prestigeUpgrades) || {};
        const rapidConstructionLevel = allUpgrades.rapidConstruction || 0;
        let buildTimeMultiplier = 1;

        if (rapidConstructionLevel > 0 && baseBuildTime > 0) {
          // Apply multiplicative reduction (0.9^level)
          buildTimeMultiplier = Math.pow(
            PRESTIGE_UPGRADES.rapidConstruction.multiplier || 0.9,
            rapidConstructionLevel,
          );
        }

        const buildTime = baseBuildTime * buildTimeMultiplier;

        // If build time is specified, set up the building process
        if (buildTime > 0) {
          const now = Date.now();
          const completionTime = now + buildTime * 1000; // Convert seconds to milliseconds

          set(item, (current) => ({
            ...current,
            value: newVal, // Increment value immediately, but item won't produce until completion
            building: {
              ...current.building,
              [completionTime]: quantity, // Store how many items will complete at this time
            },
          }));
        } else {
          // No build time, instant completion
          set(item, (current) => ({
            ...current,
            value: newVal,
          }));
        }

        // Use the shared function to handle threshold checks
        handleEquipmentThresholds(
          elementKey,
          currentVal,
          newVal,
          (key) => set(show, key),
          EQUIPMENT_LIST,
        );
      },
    ),

    sell: atom(
      (get) => get(item),
      (get, set) => {
        const newVal = get(item).value - 1;
        if (newVal === 0) {
          set(item, () => ({
            upgrades: {},
            value: newVal,
          }));
        } else {
          set(item, (current) => ({
            ...current,
            value: newVal,
          }));
        }
      },
    ),
  };
}
