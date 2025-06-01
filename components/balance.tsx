"use client";

import { useAtomValue } from "jotai";

import { au } from "@/atoms/au";
import { formatMoney } from "@/lib/formatters";
import { prestigePoints } from "@/atoms/prestige";

export function AuBalance() {
  const auVal = useAtomValue(au);

  return <>{formatMoney(auVal)} AU</>;
}

export function PpBalance() {
  const ppVal = useAtomValue(prestigePoints);

  return <>{formatMoney(ppVal)} PP</>;
}

export function MobileBalance() {
  return (
    <div className="absolute bottom-full flex flex-row gap-2 p-2">
      <div className="bg-background rounded-lg border px-4 py-2">
        <p className="text-muted-foreground text-sm font-semibold">
          AU Balance
        </p>
        <p className="font-mono">
          <AuBalance />
        </p>
      </div>
      <div className="bg-background rounded-lg border px-4 py-2">
        <p className="text-muted-foreground text-sm font-semibold">
          PP Balance
        </p>
        <p className="font-mono">
          <PpBalance />
        </p>
      </div>
    </div>
  );
}
