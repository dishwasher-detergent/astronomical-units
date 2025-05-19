"use client";

import { useAtomValue } from "jotai";

import { au } from "@/atoms/au";
import { Stats } from "@/components/ui/stats";
import { formatMoney } from "@/lib/utils";

export function ClickTotalCount() {
  const auValue = useAtomValue(au);

  return <Stats label="Astronomical Units (AU)" value={formatMoney(auValue)} />;
}
