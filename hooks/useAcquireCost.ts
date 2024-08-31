import { useAtomValue } from "jotai";

import { astronautCurrent } from "@/atoms/astronauts";
import { equipment } from "@/atoms/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { type AcquirableElementKey, ElementKey } from "@/types";

export function useAcquireCost(key: AcquirableElementKey) {
  const rankAtom = (() => {
    switch (key) {
      case ElementKey.Astronaut: {
        return astronautCurrent;
      }
      case ElementKey.IronMiningRig: {
        return equipment;
      }
      case ElementKey.ColbaltMiningRig: {
        return equipment;
      }
      case ElementKey.PlatinumMiningRig: {
        return equipment;
      }
    }
  })();
  const rank = useAtomValue(rankAtom);
  const { baseCost, costMultiplier } = EQUIPMENT_LIST[key];

  return Math.ceil(baseCost * Math.pow(costMultiplier, rank));
}
