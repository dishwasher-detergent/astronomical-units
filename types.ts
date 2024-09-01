export type DeltaDirection = -1 | 1;

export type Upgrade = {
  name: string;
  description: string;
  cost: number;
  multiplier: number;
  maxCount: number;
  threshold: number;
};

export type Upgrades = Record<string, Upgrade>;

export type Equipment = {
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  auPerSecond: number;
  threshold: number;
  equipment?: boolean;
  icon?: any;
  upgrades?: Upgrades;
};
