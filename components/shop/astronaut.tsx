"use client";

import { Base } from "@/components/shop/base-item";
import { crewCurrent } from "@/atoms/crew";

export function Astronaut() {
  return <Base atom={crewCurrent} elementKey="crew" />;
}
