'use client'

import { useAtomValue } from "jotai";

import { followersCurrent } from "@/atoms/followers";
import { showElement } from "@/atoms/show";
import { Stats } from "@/components/ui/stats";
import { LOCALE } from "@/constants/GLOBAL";
import { ElementKey } from "@/types";

export function Followers() {
  const followersCurrentValue = useAtomValue(followersCurrent);
  const showElementValue = useAtomValue(showElement);

  return (
    showElementValue[ElementKey.Followers] &&
      <div>
        <Stats
          value={followersCurrentValue.toLocaleString(LOCALE)}
          label="Followers"
        />
      </div>
  );
}