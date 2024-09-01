import { useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo } from "react";

import { astronautCurrent } from "@/atoms/astronauts";
import { equipment } from "@/atoms/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { type AcquirableElementKey, ElementKey } from "@/types";

const getRankAtom = (key: AcquirableElementKey) => {
  switch (key) {
    case ElementKey.Astronaut:
      return astronautCurrent;
    case ElementKey.IronMiningRig:
    case ElementKey.CobaltMiningRig:
    case ElementKey.PlatinumMiningRig:
      return focusAtom(equipment, (optic) => optic.prop(key));
    default:
      return undefined;
  }
};

export function useAcquireCost(key: AcquirableElementKey) {
  const rankAtom = useMemo(() => getRankAtom(key), [key]);

  const rank = rankAtom ? useAtomValue(rankAtom) : 0;

  const { baseCost, costMultiplier } = EQUIPMENT_LIST[key];

  return Math.ceil(baseCost * Math.pow(costMultiplier, rank));
}
