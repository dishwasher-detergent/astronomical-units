import { useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo } from "react";

import { astronautCurrent } from "@/atoms/astronauts";
import { equipment } from "@/atoms/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { type AcquirableElementKey, ElementKey } from "@/types";

const getRankAtom = (key: AcquirableElementKey) => {
  if (EQUIPMENT_LIST[key].equipment === false) {
    switch (key) {
      case ElementKey.Astronaut:
        return astronautCurrent;
      default:
        return undefined;
    }
  }

  return focusAtom(equipment, (optic) => optic.prop(key));
};

export function useAcquireCost(key: AcquirableElementKey) {
  const rankAtom = useMemo(() => getRankAtom(key), [key]);

  const rank = rankAtom ? useAtomValue(rankAtom) : 0;

  const { baseCost, costMultiplier } = EQUIPMENT_LIST[key];

  return Math.ceil(baseCost * Math.pow(costMultiplier, rank));
}
