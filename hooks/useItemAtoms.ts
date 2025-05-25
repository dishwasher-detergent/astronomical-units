import { equipment } from "@/atoms/equipment";
import { prestigeUpgrades } from "@/atoms/prestige";
import { show } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";
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
        const currentItemState = get(item);
        const currentVal = currentItemState.value;
        const newVal = currentVal + quantity;

        const equipmentData = EQUIPMENT_LIST[elementKey];
        const baseBuildTime = equipmentData.buildTime || 0;

        let buildTime = baseBuildTime;

        if (baseBuildTime > 0) {
          const allUpgrades = get(prestigeUpgrades) || {};
          const rapidConstructionLevel = allUpgrades.rapidConstruction || 0;

          if (rapidConstructionLevel > 0) {
            const prestigeMultiplier =
              PRESTIGE_UPGRADES.rapidConstruction?.multiplier ?? 0.9;
            buildTime *= Math.pow(prestigeMultiplier, rapidConstructionLevel);
          }
        }

        if (buildTime > 0) {
          const now = Date.now();
          const completionTime = now + buildTime * 1000;
          set(item, (current) => ({
            ...current,
            value: newVal,
            building: {
              ...(current.building || {}),
              [completionTime]: quantity,
            },
          }));
        } else {
          set(item, (current) => ({
            ...current,
            value: newVal,
          }));
        }

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
        const currentValue = get(item).value;
        const newVal = currentValue - 1;

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
