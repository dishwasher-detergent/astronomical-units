export type DeltaDirection = -1 | 1;

export type Upgrade = {
  name: string;
  description: string;
  cost: number;
  multiplier: number;
  maxCount: number;
  threshold: number;
  icon: any;
};

export type Upgrades = Record<string, Upgrade>;

export type Equipment = {
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  auPerSecond: number;
  threshold: number;
  icon: any;
  equipment?: boolean;
  upgrades?: Upgrades;
};

export type EquipmentObject = {
  [key: string]: EquipmentItem;
};

export type EquipmentItem = {
  value: number;
  upgrades?: Record<string, number>;
};

export type GameData = {
  income: {
    total: number;
    current: number;
  };
  equipment: EquipmentObject;
  astronaut: {
    current: number;
    deltaMultiplier: number;
  };
  show: Record<string, boolean>;
  last_updated: number;
};
