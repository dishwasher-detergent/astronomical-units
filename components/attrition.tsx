'use client'

import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { attrition, attritionGrace } from "@/atoms/attrition";
import { showElement } from "@/atoms/show";
import { Stats } from "@/components/ui/stats";
import { ATTRITION_MAXIMUM, ATTRITION_RATE } from "@/constants/ATTRITION";
import { PRECISION } from "@/constants/GLOBAL";
import { useAnimation } from "@/hooks/useAnimation";
import { ElementKey } from "@/types";

export function Attrition() {
  const [attritionValue, setAttrition] = useAtom(attrition);
  const [attritionGraceValue, changeAttritionGrace] = useAtom(attritionGrace);
  const showElementValue = useAtomValue(showElement);

  const [delta, setDelta] = useState(0);
  const isShowing = showElementValue[ElementKey.Attrition];

  useAnimation((deltaTime) => {
    changeAttritionGrace(deltaTime);
    setDelta((current) => current + deltaTime);
  }, !isShowing);

  useEffect(() => {
    if (
      attritionGraceValue === 0 &&
      delta >= ATTRITION_RATE &&
      attritionValue < ATTRITION_MAXIMUM
    ) {
      setAttrition(1);
      setDelta(0);
    }
  }, [attritionGraceValue, attritionValue, delta, setAttrition]);

  return (
    isShowing &&
      <div>
        <Stats
          value={`${(attritionValue * 100).toFixed(PRECISION)}%`}
          label="Attrition"
        />
      </div>
  );
}