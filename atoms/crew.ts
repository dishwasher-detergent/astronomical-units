import { atom } from "jotai";
import { focusAtom } from "jotai-optics";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { equipmentItemFamily } from "./equipment";
import { gameData, saveGameState } from "./global";
import { show } from "./show";

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
    // Get the crew item using the equipment family pattern
    const crewItem = get(equipmentItemFamily("crew"));
    const newVal = crewItem.value + 1;

    // Update using the equipment family
    set(equipmentItemFamily("crew"), {
      ...crewItem,
      value: newVal,
    });

    // Check for upgrade unlocks
    const equip = EQUIPMENT_LIST.crew?.upgrades;
    if (equip) {
      Object.entries(equip).forEach(([key, value]: any) => {
        if (newVal >= value.threshold) {
          set(show, `crew_${key}`);
        }
      });
    }

    // Force save on important changes
    set(saveGameState);
  },
);

// Debug labels
if (process.env.NODE_ENV !== "production") {
  crew.debugLabel = "Crew";
  crewValue.debugLabel = "Crew Value";
  crewCurrent.debugLabel = "Crew Current";
}
