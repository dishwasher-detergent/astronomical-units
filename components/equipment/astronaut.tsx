"use client";

import { useAtomValue } from "jotai";

import { showElement } from "@/atoms/show";
import { Base } from "@/components/equipment/base";
import { useNextUpgrade } from "@/hooks/useNextUpgrade";
import { ElementKey } from "@/types";
import { astronautCurrent } from "@/atoms/astronauts";

export function Astronaut() {
  const showElementValue = useAtomValue(showElement);

  const isShowing = showElementValue[ElementKey.Astronaut];

  useNextUpgrade(isShowing);

  return (
    isShowing && (
      <div>
        <Base atom={astronautCurrent} elementKey={ElementKey.Astronaut} />
      </div>
    )
  );
}
