import { MapPosition } from "@/types";

export type Star = {
  size: number;
  x: number;
  y: number;
  duration: number;
};

export function BackgroundStars({ stars }: { stars: Star[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={`star-${i}`}
          className="bg-muted-foreground absolute animate-pulse rounded-full opacity-70"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
        />
      ))}
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
        return (
          <line
            color="currentColor"
            key={`line-${index}`}
            x1={`${item.position.x}%`}
            y1={`${item.position.y}%`}
            x2={`${next.position.x}%`}
            y2={`${next.position.y}%`}
            strokeWidth="1"
            strokeDasharray="4"
          />
        );
      })}
    </svg>
  );
}
