"use client";

import { useAtomValue } from "jotai";

import { au } from "@/atoms/au";
import { formatMoney } from "@/lib/utils";

export function Balance() {
  const auVal = useAtomValue(au);

  return <>{formatMoney(auVal)} AU</>;
}
