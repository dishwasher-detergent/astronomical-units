"use client";

import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { equipment } from "@/atoms/equipment";
import { Base } from "@/components/shop/base-item";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { show } from "@/atoms/show";

export function BaseEquipment({ elementKey }: { elementKey: string }) {
  const item = focusAtom(equipment, (optic) => optic.prop(elementKey));
  const equipmentCurrent = atom(
    (get) => get(item),
    (get, set) => {
      const equip = EQUIPMENT_LIST[elementKey].upgrades;
      const newVal = get(item).value + 1;

      set(item, (current) => ({
        ...current,
        value: newVal,
      }));

      if (equip) {
        Object.entries(equip).forEach(([key, value]: any) => {
          if (newVal >= value.threshold) {
            set(show, `${elementKey}_${key}`);
          }
        });
      }
    },
  );

  return <Base atom={equipmentCurrent} elementKey={elementKey} />;
}
