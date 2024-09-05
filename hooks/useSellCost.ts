import { useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { useMemo } from "react";

import { crewCurrent } from "@/atoms/crew";
import { equipment } from "@/atoms/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";

const getRankAtom = (key: string) => {
  if (EQUIPMENT_LIST[key].equipment === false) {
    switch (key) {
      case "crew":
        return crewCurrent;
      default:
        return undefined;
    }
  }

  return focusAtom(equipment, (optic) => optic.prop(key));
};

export function useSellCost(key: string) {
  const rankAtom = useMemo(() => getRankAtom(key), [key]);

  const rank = rankAtom ? useAtomValue(rankAtom) : 0;

  const rankValue = (typeof rank === "number" ? rank : rank.value) - 1;

  const { baseCost, costMultiplier } = EQUIPMENT_LIST[key];

  return Math.ceil(baseCost * Math.pow(costMultiplier, rankValue)) * 0.3;
}
