export type AcquirableElementKey =
  | ElementKey.Astronaut
  | ElementKey.IronMiningRig
  | ElementKey.CobaltMiningRig
  | ElementKey.PlatinumMiningRig;

export enum ElementKey {
  Upgrades,
  Astronaut,
  IronMiningRig,
  CobaltMiningRig,
  PlatinumMiningRig,
}

export type UpgradableElementKey = AcquirableElementKey;

export type DeltaDirection = -1 | 1;

export type Equipment = {
  name: string;
  baseCost: number;
  costMultiplier: number;
  incomeMultiplier: number;
  threshold: number;
  description: string;
  equipment?: boolean;
};
