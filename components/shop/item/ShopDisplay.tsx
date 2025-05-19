"use client";

import { EquipmentItem } from "@/components/shop/item/EquipmentItem";

interface ShopDisplayProps {
  elementKey: string;
}

export function ShopDisplay({ elementKey }: ShopDisplayProps) {
  return <EquipmentItem elementKey={elementKey} />;
}
