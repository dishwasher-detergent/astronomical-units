"use client";

import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { equipment } from "@/atoms/equipment";
import { Base } from "@/components/shop/base-item";

export function BaseEquipment({ elementKey }: { elementKey: string }) {
  const item = focusAtom(equipment, (optic) => optic.prop(elementKey));
  const equipmentCurrent = atom(
    (get) => get(item),
    (_, set) => {
      set(item, (current) => current + 1);
    }
  );

  return <Base atom={equipmentCurrent} elementKey={elementKey} />;
}
