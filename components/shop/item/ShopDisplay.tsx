"use client";

import { EquipmentItem } from "@/components/shop/item/EquipmentItem";
import { SellEquipmentItem } from "@/components/shop/item/EquipmentItem";

interface ShopDisplayProps {
  elementKey: string;
}

export function ShopDisplay({ elementKey }: ShopDisplayProps) {
  // We're keeping this simple now as our ShopItem has been redesigned
  // to include more info in a better layout
  return <EquipmentItem elementKey={elementKey} />;
}
