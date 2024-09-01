"use client";

import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { equipment } from "@/atoms/equipment";
import { Base } from "@/components/equipment/base";
import { AcquirableElementKey } from "@/types";

export function BaseMiningRig({
  elementKey,
}: {
  elementKey: AcquirableElementKey;
}) {
  const item = focusAtom(equipment, (optic) => optic.prop(elementKey));
  const equipmentCurrent = atom(
    (get) => get(item),
    (_, set) => {
      set(item, (current) => current + 1);
    }
  );

  return <Base atom={equipmentCurrent} elementKey={elementKey} />;
}
