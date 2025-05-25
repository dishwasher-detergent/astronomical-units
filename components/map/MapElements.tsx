import { MapPosition } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { getAdjustedPosition } from "@/lib/map";

export type Star = {
  size: number;
  x: number;
  y: number;
  duration: number;
};

export function BackgroundStars({ stars }: { stars: Star[] }) {
  // Check if we're on mobile to adjust star positions
  const isMobile = useIsMobile();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star, i) => {
        // For stars, we'll use a simpler adjustment to ensure they're distributed
        // evenly across the entire map area on mobile
        const x = isMobile
          ? Math.min(Math.max(star.x * 0.9 + 5, 2), 98)
          : star.x;
        const y = isMobile
          ? Math.min(Math.max(star.y * 0.8 + 5, 2), 98)
          : star.y;

        return (
          <div
            key={`star-${i}`}
            className="bg-muted-foreground absolute animate-pulse rounded-full opacity-70"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${x}%`,
              top: `${y}%`,
            }}
          />
        );
      })}
    </div>
  );
}

export function ConnectionLines({
  items,
}: {
  items: { position: MapPosition; key: string }[];
}) {
  if (items.length <= 1) return null;

  return (
    <svg className="stroke-muted-foreground/30 pointer-events-none absolute inset-0 h-full w-full">
      {items.slice(0, -1).map((item, index) => {
        const next = items[index + 1];
        const adjustedItemPos = getAdjustedPosition(item.position);
        const adjustedNextPos = getAdjustedPosition(next.position);

        return (
          <line
            color="currentColor"
            key={`line-${index}`}
            x1={`${adjustedItemPos.x}%`}
            y1={`${adjustedItemPos.y}%`}
            x2={`${adjustedNextPos.x}%`}
            y2={`${adjustedNextPos.y}%`}
            strokeWidth="1"
            strokeDasharray="4"
          />
        );
      })}
    </svg>
  );
}
