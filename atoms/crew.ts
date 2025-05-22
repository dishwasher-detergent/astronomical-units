import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { equipmentItemFamily } from "@/atoms/equipment";
import { gameData, saveGameState } from "@/atoms/global";
import { show } from "@/atoms/show";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";

/**
 * Direct focus atom to the crew equipment
 * This is a shorthand for accessing crew data
 */
export const crew = focusAtom(gameData, (optic) =>
  optic.path("equipment.crew"),
);

/**
 * Memoized atom for crew value
 * This improves performance by avoiding unnecessary recalculations
 */
export const crewValue = atom((get) => get(crew).value);

/**
 * Optimized atom for crew interactions
 * Using the equipment item family under the hood for better state management
 */
export const crewCurrent = atom(
  (get) => get(crewValue),
  (get, set) => {
    const crewItem = get(equipmentItemFamily("crew"));
    const newVal = crewItem.value + 1;

    set(equipmentItemFamily("crew"), {
      ...crewItem,
      value: newVal,
    });

    const equip = EQUIPMENT_LIST.crew?.upgrades;
    if (equip) {
      Object.entries(equip).forEach(([key, value]: any) => {
        if (newVal >= value.threshold) {
          set(show, `crew_${key}`);
        }
      });
    }

    set(saveGameState);
  },
);

if (process.env.NODE_ENV !== "production") {
  crew.debugLabel = "Crew";
  crewValue.debugLabel = "Crew Value";
  crewCurrent.debugLabel = "Crew Current";
}
