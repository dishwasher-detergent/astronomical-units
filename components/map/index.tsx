"use client";

import { useSetAtom } from "jotai";
import { scrollToEquipmentAtom } from "@/atoms/scrollTo";
import { useState, MouseEvent, TouchEvent, useRef, useEffect } from "react";

import { useIsMobile } from "@/hooks/use-mobile";
import { MapItem } from "@/components/map/item";
import { MapItemDrawer } from "@/components/map/item-drawer";
import { BackgroundStars, ConnectionLines } from "@/components/map/elements";
import { useMapEquipment } from "@/hooks/useMapEquipment";
import { useMapStars } from "@/hooks/useMapStars";
import { EquipmentWithPosition, MapPosition } from "@/types";
import { MapKey } from "@/components/map/legend";

export function Map() {
  const isMobile = useIsMobile();
  const setScrollToEquipment = useSetAtom(scrollToEquipmentAtom);
  const equipmentWithPositions = useMapEquipment();
  const stars = useMapStars(100);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapDimensions, setMapDimensions] = useState({ width: 0, height: 0 });

  const [panOffset, setPanOffset] = useState<MapPosition>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPanPosition, setStartPanPosition] = useState<MapPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (mapContainerRef.current) {
        setMapDimensions({
          width: mapContainerRef.current.offsetWidth,
          height: mapContainerRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const getEventPosition = (e: MouseEvent | TouchEvent): MapPosition => {
    if ("touches" in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handlePanStart = (e: MouseEvent | TouchEvent) => {
    let targetElement = e.target as HTMLElement;
    while (targetElement && targetElement !== mapContainerRef.current) {
      if (
        targetElement.tagName === "BUTTON" ||
        targetElement.getAttribute("role") === "button"
      ) {
        return;
      }
      targetElement = targetElement.parentElement as HTMLElement;
    }

    setIsPanning(true);
    setStartPanPosition(getEventPosition(e));
  };

  const handlePanMove = (e: MouseEvent | TouchEvent) => {
    if (!isPanning) return;
    const currentPosition = getEventPosition(e);
    const deltaX = currentPosition.x - startPanPosition.x;
    const deltaY = currentPosition.y - startPanPosition.y;
    const sensitivity = 1;

    setPanOffset((prevOffset) => ({
      x: prevOffset.x - deltaX * sensitivity,
      y: prevOffset.y - deltaY * sensitivity,
    }));
    setStartPanPosition(currentPosition);
  };

  const handlePanEnd = () => {
    setIsPanning(false);
  };

  const getScreenPosition = (centerRelativePos: MapPosition): MapPosition => {
    const centerX = mapDimensions.width / 2;
    const centerY = mapDimensions.height / 2;
    return {
      x: centerX + centerRelativePos.x - panOffset.x,
      y: centerY + centerRelativePos.y - panOffset.y,
    };
  };

  const renderEquipmentItem = (props: EquipmentWithPosition) => {
    const { key, item, position, count, equipmentItem, auPerSecond } = props;
    const screenPosition = getScreenPosition(position);

    if (isMobile) {
      return (
        <MapItemDrawer
          key={key}
          item={item}
          position={screenPosition}
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
        position={screenPosition}
        count={count}
        equipmentItem={equipmentItem}
        auPerSecond={auPerSecond}
        onItemClick={() => {
          setScrollToEquipment(key);
        }}
      />
    );
  };

  const pannedEquipmentWithPositions = equipmentWithPositions.map((eq) => ({
    ...eq,
    position: getScreenPosition(eq.position),
  }));

  return (
    <div
      ref={mapContainerRef}
      className="bg-muted relative grid size-full cursor-grab touch-none place-items-center overflow-hidden select-none active:cursor-grabbing"
      onMouseDown={handlePanStart as (e: MouseEvent) => void}
      onTouchStart={handlePanStart as (e: TouchEvent) => void}
      onMouseMove={handlePanMove as (e: MouseEvent) => void}
      onTouchMove={handlePanMove as (e: TouchEvent) => void}
      onMouseUp={handlePanEnd}
      onMouseLeave={handlePanEnd}
      onTouchEnd={handlePanEnd}
    >
      <BackgroundStars stars={stars} />
      {mapDimensions.width > 0 &&
        equipmentWithPositions.map(renderEquipmentItem)}
      {mapDimensions.width > 0 && (
        <ConnectionLines items={pannedEquipmentWithPositions} />
      )}
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
