"use client";

import { useAtom, useAtomValue, WritableAtom } from "jotai";

import { showElement } from "@/atoms/show";
import { AcquireButton } from "@/components/aquire";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { useNextUpgrade } from "@/hooks/useNextUpgrade";
import { UpgradableElementKey } from "@/types";
import { Skeleton } from "../ui/skeleton";

export function Base({
  atom,
  elementKey,
}: {
  atom: WritableAtom<any, any, any>;
  elementKey: UpgradableElementKey;
}) {
  const showElementValue = useAtomValue(showElement);
  const [rankValue, setRank] = useAtom(atom);

  const isShowing = showElementValue[elementKey];
  const element = EQUIPMENT_LIST[elementKey];

  useNextUpgrade(isShowing);

  return isShowing ? (
    <AcquireButton elementKey={elementKey} increment={setRank}>
      <>
        <p className="text-sm font-bold">{element.name}</p>
        <p className="text-sm">{element.description}</p>
        <p className="text-sm">{rankValue} Units</p>
      </>
    </AcquireButton>
  ) : (
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
}
