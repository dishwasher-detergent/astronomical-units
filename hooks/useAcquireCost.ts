import { useAtomValue } from "jotai";

import { engagementMultiplier } from "@/atoms/engagement";
import { followersDeltaMultiplier } from "@/atoms/followers";
import { influencers, influencersRateReduction } from "@/atoms/influencers";
import { reachMultiplier } from "@/atoms/reach";
import { COST } from "@/constants/COST";
import { type AcquirableElementKey, ElementKey } from "@/types";

export function useAcquireCost(key: AcquirableElementKey) {
  const rankAtom = (() => {
    switch (key) {
      case ElementKey.Based: {
        return influencersRateReduction;
      }
      case ElementKey.Dank: {
        return followersDeltaMultiplier;
      }
      case ElementKey.Influencers: {
        return influencers;
      }
      case ElementKey.Viral: {
        return reachMultiplier;
      }
      case ElementKey.Woke: {
        return engagementMultiplier;
      }
    }
  })();
  const rank = useAtomValue(rankAtom);
  const { base, multiplier } = COST[key];

  return Math.ceil(base * Math.pow(multiplier, rank));
}
