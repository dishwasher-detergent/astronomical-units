import { Equipment, EquipmentItem } from "@/types";

/**
 * Get the icon color class based on the count and item upgrades.
 * @param count
 * @param item
 * @returns The icon color class.
 */
export function getIconColorClass(
  count: number,
  equipmentItem: EquipmentItem,
  item: Equipment,
): string {
  if (!item.upgrades) return count > 10 ? "text-amber-400" : "currentColor";

  const thresholds = Object.values(item.upgrades).map(
    (upgrade) => upgrade.threshold,
  );
  if (thresholds.length === 0) return "currentColor";

  const minThreshold = Math.min(...thresholds);
  const maxThreshold = Math.max(...thresholds);

  const allUpgradesMaxed = Object.entries(equipmentItem.upgrades).every(
    ([key, value]) => {
      return value >= item.upgrades[key].maxCount;
    },
  );

  if (allUpgradesMaxed) return "text-emerald-400";

  if (count >= maxThreshold * 2) return "text-amber-400";
  if (count >= maxThreshold) return "text-purple-400";
  if (count >= minThreshold) return "text-blue-400";

  return "currentColor";
}
