"use client";

import { useSetAtom } from "jotai";
import { scrollToEquipmentAtom } from "@/atoms/scrollTo";

import { useIsMobile } from "@/hooks/use-mobile";
import { MapItem } from "@/components/map/MapItem";
import { MapItemDrawer } from "@/components/map/MapItemDrawer";
import { BackgroundStars, ConnectionLines } from "@/components/map/MapElements";
import { useMapEquipment } from "@/hooks/useMapEquipment";
import { useMapStars } from "@/hooks/useMapStars";
import { EquipmentWithPosition } from "@/types";
import { MapKey } from "@/components/map/MapKey";

export function Map() {
  const isMobile = useIsMobile();
  const setScrollToEquipment = useSetAtom(scrollToEquipmentAtom);
  const equipmentWithPositions = useMapEquipment();
  const stars = useMapStars(100);

  const renderEquipmentItem = (props: EquipmentWithPosition) => {
    const { key, item, position, count, equipmentItem, auPerSecond } = props;

    if (isMobile) {
      return (
        <MapItemDrawer
          key={key}
          item={item}
          position={position}
          count={count}
          equipmentItem={equipmentItem}
          auPerSecond={auPerSecond}
          elementKey={key}
        />
      );
    }

    return (
      <MapItem
        key={key}
        item={item}
        position={position}
        count={count}
        equipmentItem={equipmentItem}
        auPerSecond={auPerSecond}
        onItemClick={() => setScrollToEquipment(key)}
      />
    );
  };

  return (
    <div className="bg-muted relative grid size-full place-items-center">
      <BackgroundStars stars={stars} />
      {equipmentWithPositions.map(renderEquipmentItem)}
      <ConnectionLines items={equipmentWithPositions} />
      <MapKey />
      {equipmentWithPositions.length === 0 && (
        <div className="z-10 rounded-lg p-4 text-center">
          <p className="text-muted-foreground text-sm font-semibold">
            Purchase equipment to see items on the map
          </p>
        </div>
      )}
    </div>
  );
}
