export type AcquirableElementKey =
  | ElementKey.Astronaut
  | ElementKey.MiningRig
  | ElementKey.Exploration;

export enum ElementKey {
  Upgrades,
  Astronaut,
  MiningRig,
  Exploration,
}

export type UpgradableElementKey = AcquirableElementKey;

export type DeltaDirection = -1 | 1;

export type Equipment = {
  name: string;
  description: string;
  baseCost: number;
  costMultiplier: number;
  incomeMultiplier: number;
  threshold: number;
  equipment?: boolean;
};
