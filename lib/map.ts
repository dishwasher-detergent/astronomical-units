import { Equipment, EquipmentItem, MapPosition } from "@/types";

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

/**
 * Adjust map positions for mobile displays to fit better in a square format
 * @param position Original position (percentage based)
 * @returns Adjusted position object with x and y coordinates
 */
export function getAdjustedPosition(position: MapPosition): MapPosition {
  const centerX = 50;
  const centerY = 70;

  const distanceFromCenter = position.x - centerX;
  const expandedX = centerX + distanceFromCenter * 1.5;

  const verticalDistance = position.y - centerY;
  const expandedY = centerY + verticalDistance * 1.6;

  return {
    x: Math.min(Math.max(expandedX, 5), 95),
    y: Math.min(Math.max(expandedY, 5), 70),
  };
}
