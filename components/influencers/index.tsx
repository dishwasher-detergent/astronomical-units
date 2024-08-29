'use client'

import { useAtomValue, useSetAtom } from "jotai";

import { influencers } from "@/atoms/influencers";
import { showElement } from "@/atoms/show";
import { AcquireButton } from "@/components/aquire";
import { InfluencersCount } from "@/components/influencers/count";
import { InfluencersGeneration } from "@/components/influencers/generation";
import { ElementKey } from "@/types";

export function Influencers() {
  const showElementValue = useAtomValue(showElement);
  const incrementInfluencers = useSetAtom(influencers);

  return (
    showElementValue[ElementKey.Influencers] &&
      <div>
        <div>
          <div>
            <InfluencersCount />
          </div>

          <div>
            <AcquireButton elementKey={ElementKey.Influencers} increment={incrementInfluencers} />
          </div>
        </div>
        <InfluencersGeneration />
      </div>
  );
}