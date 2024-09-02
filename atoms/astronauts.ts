import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import {
  ASTRONAUT_DELTA,
  ASTRONAUT_DELTA_MULTIPLIER_DELTA,
} from "@/constants/ASTRONAUT";
import { gameData } from "./global";

export const astronaut = focusAtom(gameData, (optic) =>
  optic.prop("astronaut"),
);

export const astronautCurrent = atom(
  (get) => get(astronaut).current,
  (get, set) => {
    set(astronaut, ({ current, ...astronautContents }) => {
      const newastronaut = current + get(astronautDelta);

      return {
        ...astronautContents,
        current: newastronaut < 0 ? 0 : newastronaut,
      };
    });
  },
);

export const astronautDelta = atom(
  (get) => ASTRONAUT_DELTA + ASTRONAUT_DELTA * get(astronautDeltaMultiplier),
);

export const astronautDeltaMultiplier = atom(
  (get) => get(astronaut).deltaMultiplier,
  (_, set) => {
    set(astronaut, ({ deltaMultiplier, ...astronautContents }) => ({
      deltaMultiplier: deltaMultiplier + ASTRONAUT_DELTA_MULTIPLIER_DELTA,
      ...astronautContents,
    }));
  },
);

if (process.env.NODE_ENV !== "production") {
  astronaut.debugLabel = "Astronaut";
  astronautCurrent.debugLabel = "Astronaut Current";
  astronautDelta.debugLabel = "Astronaut Delta";
  astronautDeltaMultiplier.debugLabel = "Astronaut Delta Multiplier";
}
