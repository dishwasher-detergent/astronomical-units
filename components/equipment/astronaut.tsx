"use client";

import { Base } from "@/components/equipment/base";
import { ElementKey } from "@/types";
import { astronautCurrent } from "@/atoms/astronauts";

export function Astronaut() {
  return <Base atom={astronautCurrent} elementKey={ElementKey.Astronaut} />;
}
