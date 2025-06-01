"use client";

import { useSetAtom } from "jotai";
import { scrollToEquipmentAtom } from "@/atoms/scrollTo";
import { useState, MouseEvent, TouchEvent } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { MapItem } from "@/components/map/MapItem";
import { MapItemDrawer } from "@/components/map/MapItemDrawer";
import { BackgroundStars, ConnectionLines } from "@/components/map/MapElements";
import { useMapEquipment } from "@/hooks/useMapEquipment";
import { useMapStars } from "@/hooks/useMapStars";
import { EquipmentWithPosition, MapPosition } from "@/types";
import { MapKey } from "@/components/map/MapKey";

export function Map() {
  const isMobile = useIsMobile();
  const setScrollToEquipment = useSetAtom(scrollToEquipmentAtom);
  const equipmentWithPositions = useMapEquipment();
  const stars = useMapStars(100);

  const [panOffset, setPanOffset] = useState<MapPosition>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPosition, setStartPanPosition] = useState<MapPosition>({
    x: 0,
    y: 0,
  });

  const getEventPosition = (e: MouseEvent | TouchEvent): MapPosition => {
    if ("touches" in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handlePanStart = (e: MouseEvent | TouchEvent) => {
    setIsPanning(true);
    setStartPanPosition(getEventPosition(e));
  };

  const handlePanMove = (e: MouseEvent | TouchEvent) => {
    if (!isPanning) return;
    const currentPosition = getEventPosition(e);
    const deltaX = currentPosition.x - startPanPosition.x;
    const deltaY = currentPosition.y - startPanPosition.y;
    const sensitivity = 0.1;

    setPanOffset((prevOffset) => ({
      x: prevOffset.x - deltaX * sensitivity,
      y: prevOffset.y - deltaY * sensitivity,
    }));
    setStartPanPosition(currentPosition);
  };

  const handlePanEnd = () => {
    setIsPanning(false);
  };

  const renderEquipmentItem = (props: EquipmentWithPosition) => {
    const { key, item, position, count, equipmentItem, auPerSecond } = props;
    const pannedPosition: MapPosition = {
      x: position.x - panOffset.x,
      y: position.y - panOffset.y,
    };

    if (isMobile) {
      return (
        <MapItemDrawer
          key={key}
          item={item}
          position={pannedPosition}
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
        position={pannedPosition}
        count={count}
        equipmentItem={equipmentItem}
        auPerSecond={auPerSecond}
        onItemClick={() => setScrollToEquipment(key)}
      />
    );
  };

  const pannedEquipmentWithPositions = equipmentWithPositions.map((eq) => ({
    ...eq,
    position: {
      x: eq.position.x - panOffset.x,
      y: eq.position.y - panOffset.y,
    },
  }));

  return (
    <div
      className="bg-muted relative grid size-full cursor-grab touch-none place-items-center select-none active:cursor-grabbing" // Added touch-none, select-none and cursor styles
      onMouseDown={handlePanStart as (e: MouseEvent) => void}
      onTouchStart={handlePanStart as (e: TouchEvent) => void}
      onMouseMove={handlePanMove as (e: MouseEvent) => void}
      onTouchMove={handlePanMove as (e: TouchEvent) => void}
      onMouseUp={handlePanEnd}
      onMouseLeave={handlePanEnd}
      onTouchEnd={handlePanEnd}
    >
      <BackgroundStars stars={stars} />
      {equipmentWithPositions.map(renderEquipmentItem)}
      <ConnectionLines items={pannedEquipmentWithPositions} /> <MapKey />
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
