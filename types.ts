export type DeltaDirection = -1 | 1;

export type Upgrade = {
  name: string;
  description: string;
  cost: number;
  multiplier?: number;
  maxCount: number;
  threshold: number;
  icon: any;
};

export type Upgrades = Record<string, Upgrade>;

export type MapPosition = {
  x: number;
  y: number;
};

export type Equipment = {
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  auPerSecond: number;
  threshold: number;
  icon: any;
  mapPosition: MapPosition;
  upgrades: Upgrades;
  equipment?: boolean;
  buildTime?: number;
};

export type EquipmentWithPosition = {
  key: string;
  item: Equipment;
  equipmentItem: EquipmentItem;
  position: MapPosition;
  count: number;
  auPerSecond: number;
};

export type EquipmentObject = {
  [key: string]: EquipmentItem;
};

export type EquipmentItem = {
  value: number;
  upgrades?: Record<string, number>;
  building?: Record<string, number>; // Map of timestamp when building will be complete
};

export type GameData = {
  income: {
    total: number;
    current: number;
  };
  equipment: EquipmentObject;
  show: Record<string, boolean>;
  last_updated: number;
  prestige: {
    income: number;
    level: number;
    points: number;
    multiplier: number;
    lifetime: number;
    upgrades: Record<string, number>;
  };
};
