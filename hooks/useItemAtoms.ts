import { equipment } from "@/atoms/equipment";
import { show } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

/**
 * Creates atom for equipment handling with proper update logic
 */
export function createEquipmentAtom(elementKey: string) {
  const item = focusAtom(equipment, (optic) => optic.prop(elementKey));

  return {
    purchase: atom(
      (get) => get(item),
      (get, set, quantity: number = 1) => {
        const equip = EQUIPMENT_LIST[elementKey].upgrades;
        const currentVal = get(item).value;
        const newVal = currentVal + quantity;

        set(item, (current) => ({
          ...current,
          value: newVal,
        }));

        if (equip) {
          Object.entries(equip).forEach(([key, value]: any) => {
            if (newVal >= value.threshold && currentVal < value.threshold) {
              set(show, `${elementKey}_${key}`);
            }
          });
        }
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
