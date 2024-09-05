import { focusAtom } from "jotai-optics";
import { atomWithStorage } from "jotai/utils";

import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { AU } from "@/constants/GLOBAL";
import { generateEquipmentObject } from "@/lib/utils";
import { GameData } from "@/types";

const data: GameData = {
  income: AU,
  equipment: generateEquipmentObject(EQUIPMENT_LIST),
  show: {},
  last_updated: 0,
};

export const gameData = atomWithStorage("GAME_DATA", data, undefined, {
  getOnInit: true,
});

export const lastUpdated = focusAtom(gameData, (optic) =>
  optic.prop("last_updated"),
);

if (process.env.NODE_ENV !== "production") {
  gameData.debugLabel = "CPS";
}
