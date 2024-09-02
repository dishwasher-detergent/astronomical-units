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
          <p className="mb-1 text-sm font-bold">{element.name}</p>
          <p className="text-xs">{element.description}</p>
        </>
      </AcquireButton>
    );
  } else if (next == elementKey) {
    return (
      <div className="flex flex-row gap-1 px-4 py-2 align-top">
        <div className="flex-1 space-y-1 text-left">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex-none">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    );
  } else {
    null;
  }
}
