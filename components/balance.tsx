"use client";

import { useAtomValue } from "jotai";

import { au } from "@/atoms/au";
import { LOCALE } from "@/constants/GLOBAL";

export function Balance() {
  const auVal = useAtomValue(au);

  return (
    <div className="sticky top-0 z-10 mb-2 border-b bg-background pb-2 md:hidden">
      <p className="font-bold">Balance</p>
      <p>{auVal.toLocaleString(LOCALE, {
        style: 'currency',
        currency: 'USD',
      })} AU</p>
    </div>
  );
}
