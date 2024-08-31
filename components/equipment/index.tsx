"use client";

import { Fragment } from "react";

import { Astronaut } from "@/components/equipment/astronaut";
import { ElementKey } from "@/types";
import { Generation } from "./generation";
import { IronMiningRig } from "./mining-rigs/iron";
import { ColbaltMiningRig } from "./mining-rigs/colbalt";
import { PlatinumMiningRig } from "./mining-rigs/platinum";
import { EQUIPMENT_ORDER } from "@/constants/EQUIPMENT_DETAILS";

export function Equipment() {
  return (
    <div className="p-4 space-y-2">
      <p className="font-bold text-xl">Shop</p>
      <div>
        {EQUIPMENT_ORDER.map((key) => (
          <Fragment key={key}>
            {(() => {
              switch (key) {
                case ElementKey.Astronaut: {
                  return <Astronaut />;
                }
                case ElementKey.IronMiningRig: {
                  return <IronMiningRig />;
                }
                case ElementKey.ColbaltMiningRig: {
                  return <ColbaltMiningRig />;
                }
                case ElementKey.PlatinumMiningRig: {
                  return <PlatinumMiningRig />;
                }
              }
            })()}
          </Fragment>
        ))}
      </div>

      <Generation />
    </div>
  );
}
