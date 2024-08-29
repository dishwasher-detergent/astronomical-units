'use client'

import { useAtomValue, useSetAtom } from "jotai";

import { attritionGrace } from "@/atoms/attrition";
import { engagementDelta, engagementIncrement } from "@/atoms/engagement";
import { clicksPerSecond } from "@/atoms/global";
import { likeWeight } from "@/atoms/likes";
import { LOCALE } from "@/constants/GLOBAL";
import { useMeasure } from "@/hooks/useMeasure";
import { LucideThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LikeButton() {
  const engagementDeltaValue = useAtomValue(engagementDelta);
  const engagementWeightValue = useAtomValue(likeWeight);
  const incrementEngagement = useSetAtom(engagementIncrement);
  const setAttritionGrace = useSetAtom(attritionGrace);

  const measureClicks = useMeasure(clicksPerSecond);

  return (
    <Button
      onClick={({ currentTarget }) => {
        incrementEngagement();
        measureClicks(1);
        setAttritionGrace();
        currentTarget.blur();
      }}
      size="lg"
    >
      <LucideThumbsUp className="size-4" />
      &nbsp;
      <span className="font-monospace">
        +{(engagementDeltaValue * engagementWeightValue).toLocaleString(LOCALE)}
      </span>
    </Button>
  );
}