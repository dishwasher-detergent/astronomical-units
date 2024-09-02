"use client";

import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { equipment } from "@/atoms/equipment";
import { SellBase } from "../sell-base-item";

export function SellBaseEquipment({ elementKey }: { elementKey: string }) {
  const item = focusAtom(equipment, (optic) => optic.prop(elementKey));
  const equipmentCurrent = atom(
    (get) => get(item),
    (get, set) => {
      const newVal = get(item).value - 1;
      if (newVal == 0) {
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
  );

  return <SellBase atom={equipmentCurrent} elementKey={elementKey} />;
}
