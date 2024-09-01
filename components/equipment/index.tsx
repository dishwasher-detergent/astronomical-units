"use client";

import { Fragment } from "react";

import { Astronaut } from "@/components/equipment/astronaut";
import { ElementKey } from "@/types";
import { Generation } from "@/components/equipment/generation";
import { IronMiningRig } from "@/components/equipment/mining-rigs/iron";
import { CobaltMiningRig } from "@/components/equipment/mining-rigs/colbalt";
import { PlatinumMiningRig } from "@/components/equipment/mining-rigs/platinum";
import { EQUIPMENT_ORDER } from "@/constants/EQUIPMENT_DETAILS";

export function Equipment() {
  return (
    <div className="sticky top-0 border-t bg-background">
      <p className="font-bold px-4 py-2">Store</p>
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
                case ElementKey.CobaltMiningRig: {
                  return <CobaltMiningRig />;
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
