import { Star } from "@/components/map/elements";
import { useEffect, useState } from "react";

/**
 * Hook to generate stars for the map background
 */
export function useMapStars(count: number = 100): Star[] {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: count }).map(() => ({
      size: 0.5 + Math.random() * 1.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 2 + Math.random() * 3,
    }));
    setStars(newStars);
  }, [count]);

  return stars;
}
