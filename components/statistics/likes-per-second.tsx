"use client";

import { useAtomValue } from "jotai";

import { likesPerSecond } from "@/atoms/likes";
import { showElement } from "@/atoms/show";
import { Stats } from "@/components/ui/stats";
import { ElementKey } from "@/types";

export function LikesPerSecond() {
  const likesPerSecondValue = useAtomValue(likesPerSecond);
  const showElementValue = useAtomValue(showElement);

  return (
    showElementValue[ElementKey.LikesPerSecond] && (
      <div>
        <Stats label="Likes per second" value={likesPerSecondValue} />
      </div>
    )
  );
}
