'use client'

import { useAtomValue } from "jotai";

import { influencers } from "@/atoms/influencers";
import { Stats } from "@/components/ui/stats";
import { LOCALE } from "@/constants/GLOBAL";

export function InfluencersCount() {
  const influencersValue = useAtomValue(influencers);

  return <Stats value={influencersValue.toLocaleString(LOCALE)} label="Influencers" />;
}