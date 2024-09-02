"use client";

import { useAtom, WritableAtom } from "jotai";

import { SellButton } from "@/components/shop/sell";

export function SellBase({
  atom,
  elementKey,
}: {
  atom: WritableAtom<any, any, any>;
  elementKey: string;
}) {
  const [rankValue, setRank] = useAtom(atom);

  return (
    <SellButton elementKey={elementKey} decrement={setRank}>
      Sell For{" "}
    </SellButton>
  );
}
