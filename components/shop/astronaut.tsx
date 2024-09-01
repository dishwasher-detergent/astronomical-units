"use client";

import { Base } from "@/components/shop/base-item";
import { astronautCurrent } from "@/atoms/astronauts";

export function Astronaut() {
  return <Base atom={astronautCurrent} elementKey="astronaut" />;
}
