import { atom } from "jotai";

import { followersCurrent } from "@/atoms/followers";
import { reachCurrent } from "@/atoms/reach";
import { show, showGameOver } from "@/atoms/show";
import { LIKES_MAXIMUM, LIKE_WEIGHT } from "@/constants/LIKES";
import { THRESHOLD, THRESHOLD_REACH } from "@/constants/THRESHOLD";
import { ReachDeltaDirection } from "@/types";

export const likes = atom(0);

export const likesIncrement = atom(null, (get, set) => {
  const newLikes = get(likes) + get(likeWeight);

  set(likes, newLikes);

  Object.entries(THRESHOLD).forEach(([key, value]: any) => {
    if (newLikes >= value) {
      set(show, parseInt(key));
    }
  });

  if (newLikes >= THRESHOLD_REACH) {
    set(reachCurrent, ReachDeltaDirection.Grow);
  }

  if (newLikes > LIKES_MAXIMUM) {
    set(showGameOver, true);
  }
});

export const likesPerSecond = atom(0);

export const likeWeight = atom((get) => LIKE_WEIGHT + get(followersCurrent));
