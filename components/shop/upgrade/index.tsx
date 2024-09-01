"use client";

import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { equipmentUpgrades } from "@/atoms/equipment";
import { BaseUpgrade } from "./base";

export function Upgrade({
  parentKey,
  elementKey,
}: {
  parentKey: string;
  elementKey: string;
}) {
  const item = focusAtom(equipmentUpgrades, (optic) =>
    optic.prop(`${parentKey}_${elementKey}`)
  );
  const upgradeCurrent = atom(
    (get) => get(item),
    (_, set) => {
      set(item, (current) => current + 1);
    }
  );

  return (
    <BaseUpgrade
      atom={upgradeCurrent}
      parentKey={parentKey}
      elementKey={elementKey}
    />
  );
}
