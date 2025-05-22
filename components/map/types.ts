import { Equipment, EquipmentItem, MapPosition } from "@/types";

export type EquipmentWithPosition = {
  key: string;
  item: Equipment;
  equipmentItem: EquipmentItem;
  position: MapPosition;
  count: number;
  auPerSecond: number;
};
