"use client";

import { useAtom, useAtomValue, WritableAtom } from "jotai";

import { showElement } from "@/atoms/show";
import { nextUpgrade } from "@/atoms/upgrades";
import { AcquireButton } from "@/components/shop/aquire";
import { Skeleton } from "@/components/ui/skeleton";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { useNextUpgrade } from "@/hooks/useNextUpgrade";

export function Base({
  atom,
  elementKey,
}: {
  atom: WritableAtom<any, any, any>;
  elementKey: string;
}) {
  const showElementValue = useAtomValue(showElement);
  const next = useAtomValue(nextUpgrade);
  const [rankValue, setRank] = useAtom(atom);

  const isShowing = showElementValue[elementKey];
  const element = EQUIPMENT_LIST[elementKey];

  useNextUpgrade(isShowing);

  if (isShowing) {
    return (
      <AcquireButton elementKey={elementKey} increment={setRank}>
        <>
          <p className="text-sm font-bold mb-1">{element.name}</p>
          <p className="text-xs">{element.description}</p>
        </>
      </AcquireButton>
    );
  } else if (next == elementKey) {
    return (
      <div className="flex gap-1 flex-row align-top px-4 py-2">
        <div className="flex-1 text-left space-y-1">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-12 h-4" />
        </div>
        <div className="flex-none">
          <Skeleton className="w-12 h-4" />
        </div>
      </div>
    );
  } else {
    null;
  }
}
