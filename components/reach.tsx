'use client'

import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { followersDelta } from "@/atoms/followers";
import {
  reachCurrent,
  reachDelta,
  reachMaximum,
  reachPerSecond,
  reachTotal,
} from "@/atoms/reach";
import { showElement } from "@/atoms/show";
import { ATTRITION_TICK } from "@/constants/ATTRITION";
import { REACH_PER_SECOND_CONTINUOUS } from "@/constants/REACH";
import { useAnimation } from "@/hooks/useAnimation";
import { useMeasureDifference } from "@/hooks/useMeasureDifference";
import { ElementKey, ReachDeltaDirection } from "@/types";
import { Progress } from "@/components/ui/progress";

export function Reach() {
  const [reachCurrentValue, setReachCurrent] = useAtom(reachCurrent);
  const followersDeltaValue = useAtomValue(followersDelta);
  const reachDeltaValue = useAtomValue(reachDelta);
  const reachMaximumValue = useAtomValue(reachMaximum);
  const reachPerSecondValue = useAtomValue(reachPerSecond);
  const reachTotalValue = useAtomValue(reachTotal);
  const showElementValue = useAtomValue(showElement);
  const [delta, setDelta] = useState(0);

  const isContinuous = reachPerSecondValue > REACH_PER_SECOND_CONTINUOUS;

  useAnimation((deltaTime) => {
    setDelta((current) => current + deltaTime);
  }, !showElementValue[ElementKey.Attrition]);

  useEffect(() => {
    if (delta >= ATTRITION_TICK) {
      setReachCurrent(ReachDeltaDirection.Decay);
      setDelta(0);
    }
  }, [delta, setReachCurrent]);

  useMeasureDifference(reachPerSecond, reachTotalValue);

  return (
    showElementValue[ElementKey.Reach] &&
      <div>
        <Progress
          value={(reachCurrentValue / reachMaximumValue) * 100}
        />

        <span className="text-uppercase">Reach</span>

        <div>
          <span>
            <strong className="font-monospace">{reachDeltaValue}</strong> Reach per Engagement
          </span>

          <span>
            <strong className="font-monospace">{followersDeltaValue}</strong>
            {followersDeltaValue === 1 ? " Follower" : " Followers"} per{" "}
            <strong className="font-monospace">{reachMaximumValue}</strong> Reach
          </span>
        </div>
      </div>
  );
}