export type AcquirableElementKey =
  | ElementKey.Astronaut
  | ElementKey.IronMiningRig
  | ElementKey.ColbaltMiningRig
  | ElementKey.PlatinumMiningRig;

export enum ElementKey {
  Upgrades,
  Astronaut,
  IronMiningRig,
  ColbaltMiningRig,
  PlatinumMiningRig,
}

export type UpgradableElementKey = AcquirableElementKey;

export type DeltaDirection = -1 | 1;
