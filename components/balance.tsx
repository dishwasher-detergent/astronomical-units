"use client";

import { useAtomValue } from "jotai";

import { au } from "@/atoms/au";
import { formatMoney } from "@/lib/formatters";

export function Balance() {
  const auVal = useAtomValue(au);

  return <>{formatMoney(auVal)} AU</>;
}
