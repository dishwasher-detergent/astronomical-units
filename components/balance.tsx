"use client";

import { useAtomValue } from "jotai";

import { au } from "@/atoms/au";
import { formatMoney } from "@/lib/utils";

export function Balance() {
  const auVal = useAtomValue(au);

  return (
    <div className="bg-background border-b px-4 pb-2 md:hidden">
      <p className="font-semibold">Balance</p>
      <p>{formatMoney(auVal)} AU</p>
    </div>
  );
}
