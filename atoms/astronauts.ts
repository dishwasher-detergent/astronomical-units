import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { gameData } from "./global";
import { show } from "./show";

export const astronaut = focusAtom(gameData, (optic) =>
  optic.path("equipment.astronaut"),
);

export const astronautCurrent = atom(
  (get) => get(astronaut).value,
  (get, set) => {
    const equip = EQUIPMENT_LIST.astronaut?.upgrades;
    const newVal = get(astronaut).value + 1;

    set(astronaut, (current) => ({
      ...current,
      value: newVal,
    }));

    if (equip) {
      Object.entries(equip).forEach(([key, value]: any) => {
        if (newVal >= value.threshold) {
          set(show, `astronaut_${key}`);
        }
      });
    }
  },
);

if (process.env.NODE_ENV !== "production") {
  astronaut.debugLabel = "Astronaut";
  astronautCurrent.debugLabel = "Astronaut Current";
}
