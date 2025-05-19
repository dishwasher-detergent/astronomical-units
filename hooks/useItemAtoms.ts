import { equipment } from "@/atoms/equipment";
import { show } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
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
        const buildTime = EQUIPMENT_LIST[elementKey].buildTime || 0;

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
