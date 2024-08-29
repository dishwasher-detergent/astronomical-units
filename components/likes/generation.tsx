'use client'

import { useAtomValue } from "jotai";

import { engagementDelta } from "@/atoms/engagement";
import { likeWeight } from "@/atoms/likes";
import { showElement } from "@/atoms/show";
import { LOCALE } from "@/constants/GLOBAL";
import { ElementKey } from "@/types";

export function LikesGeneration() {
  const engagementDeltaValue = useAtomValue(engagementDelta);
  const likeWeightValue = useAtomValue(likeWeight);
  const showElementValue = useAtomValue(showElement);

  return (
    showElementValue[ElementKey.Engagement] && 
      <div>
        <span>
          <strong className="font-monospace">{engagementDeltaValue.toLocaleString(LOCALE)}</strong>
          &nbsp;Engagement per click
        </span>

        <span>
          <strong className="font-monospace">{likeWeightValue.toLocaleString(LOCALE)}</strong>
          {likeWeightValue === 1 ? " Like" : " Likes"} per Engagement
        </span>
      </div>
  );
}