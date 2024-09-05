import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { gameData } from "./global";
import { show } from "./show";

export const crew = focusAtom(gameData, (optic) =>
  optic.path("equipment.crew"),
);

export const crewCurrent = atom(
  (get) => get(crew).value,
  (get, set) => {
    const equip = EQUIPMENT_LIST.crew?.upgrades;
    const newVal = get(crew).value + 1;

    set(crew, (current) => ({
      ...current,
      value: newVal,
    }));

    if (equip) {
      Object.entries(equip).forEach(([key, value]: any) => {
        if (newVal >= value.threshold) {
          set(show, `crew_${key}`);
        }
      });
    }
  },
);

if (process.env.NODE_ENV !== "production") {
  crew.debugLabel = "Crew";
  crewCurrent.debugLabel = "Crew Current";
}
