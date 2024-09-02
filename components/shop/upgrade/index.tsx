"use client";

import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { equipment } from "@/atoms/equipment";
import { BaseUpgrade } from "@/components/shop/upgrade/base";

export function Upgrade({
  parentKey,
  elementKey,
}: {
  parentKey: string;
  elementKey: string;
}) {
  const item = focusAtom(equipment, (optic) =>
    optic.path(`${parentKey}.upgrades.${elementKey}`),
  );
  const upgradeCurrent = atom(
    (get) => get(item),
    (_, set) => {
      // @ts-ignore
      set(item, (current) => current + 1);
    },
  );

  return (
    <BaseUpgrade
      atom={upgradeCurrent}
      parentKey={parentKey}
      elementKey={elementKey}
    />
  );
}
