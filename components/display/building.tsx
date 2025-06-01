// filepath: c:\Users\User\Documents\Coding\astronomical-units\components\display\DisplayBuilding.tsx
"use client";

import React from "react";

interface BuildingItemData {
  count: number;
  timeLeft: number;
  progress: number;
}

interface DisplayBuildingProps {
  buildingItems: Record<string, BuildingItemData>;
}

export function DisplayBuilding({ buildingItems }: DisplayBuildingProps) {
  if (Object.keys(buildingItems).length === 0) {
    return null;
  }

  return (
    <>
      <div>
        <p className="mt-3 mb-1 text-sm font-semibold">Currently Building</p>
        <div className="bg-muted/60 flex flex-row flex-wrap gap-2 rounded-lg p-3">
          {Object.entries(buildingItems).map(([time, data]) => (
            <div
              key={time}
              className="grid size-5 place-items-center rounded-xl"
            >
              <p className="text-xs font-semibold">
                {Math.ceil(data.timeLeft)}s
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
