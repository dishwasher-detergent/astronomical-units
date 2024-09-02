import { focusAtom } from "jotai-optics";
import { atomWithStorage } from "jotai/utils";

import { ASTRONAUT_DELTA_MULTIPLIER } from "@/constants/ASTRONAUT";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { AU } from "@/constants/GLOBAL";
import { generateEquipmentObject } from "@/lib/utils";
import { GameData } from "@/types";

const data: GameData = {
  income: AU,
  equipment: generateEquipmentObject(EQUIPMENT_LIST),
  astronaut: {
    current: 0,
    deltaMultiplier: ASTRONAUT_DELTA_MULTIPLIER,
  },
  show: {},
  clicks_per_second: 0,
};

export const gameData = atomWithStorage("GAME_DATA", data);

export const clicksPerSecond = focusAtom(gameData, (optic) =>
  optic.prop("clicks_per_second"),
);

if (process.env.NODE_ENV !== "production") {
  clicksPerSecond.debugLabel = "CPS";
}
