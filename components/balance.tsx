"use client";

import { useAtomValue } from "jotai";

import { au } from "@/atoms/au";
import { LOCALE, NUMBER_OPTIONS } from "@/constants/GLOBAL";

export function Balance() {
  const auVal = useAtomValue(au);

  return (
    <div className="border-b bg-background px-4 pb-2 md:hidden">
      <p className="font-semibold">Balance</p>
      <p>{auVal.toLocaleString(LOCALE, NUMBER_OPTIONS)} AU</p>
    </div>
  );
}
