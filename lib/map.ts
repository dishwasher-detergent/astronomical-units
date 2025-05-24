import { Equipment, EquipmentItem } from "@/types";

/**
 * Get the icon color class based on the count and item upgrades.
 * @param count
 * @param item
 * @returns The icon color class.
 */
export function getIconColor(
  count: number,
  equipmentItem: EquipmentItem,
  item: Equipment,
): string {
  if (!item.upgrades) return "currentColor";

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

  if (allUpgradesMaxed) return "var(--upgrade-3)";
  if (count >= maxThreshold) return "var(--upgrade-2)";
  if (count >= minThreshold) return "var(--upgrade-1)";

  return "currentColor";
}
