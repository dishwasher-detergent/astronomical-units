"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { equipment, equipmentRate } from "@/atoms/equipment";
import { autoIncrement } from "@/atoms/au";
import { useAnimation } from "@/hooks/useAnimation";
import { generateEquipmentObject } from "@/lib/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { lastUpdated } from "@/atoms/global";

export function Generation() {
  const [equipmentValue, setEquipment] = useAtom(equipment);
  const last = useSetAtom(lastUpdated);
  const newEquipment = generateEquipmentObject(EQUIPMENT_LIST);
  const equipmentRateValue = useAtomValue(equipmentRate);
  const increment = useSetAtom(autoIncrement);
  const [delta, setDelta] = useState(0);

  const show =
    Object.keys(equipmentValue).filter((key) => equipmentValue[key].value > 0)
      .length > 0;

  useAnimation((deltaTime) => {
    setDelta((current) => current + deltaTime);
  }, !show);
  // Check for completed buildings
  useEffect(() => {
    const checkBuildingCompletion = () => {
      const now = Date.now();
      let hasUpdates = false;

      // Create a copy of the equipment state to modify
      const updatedEquipment = { ...equipmentValue };

      Object.entries(equipmentValue).forEach(([key, item]) => {
        if (item.building && Object.keys(item.building).length > 0) {
          const newBuilding = { ...item.building };
          let completedCount = 0;

          Object.entries(item.building).forEach(([completionTime, count]) => {
            if (parseInt(completionTime) <= now) {
              completedCount += count;
              delete newBuilding[completionTime];
              hasUpdates = true;
            }
          });

          if (completedCount > 0) {
            updatedEquipment[key] = {
              ...item,
              building: newBuilding,
            };
          }
        }
      });

      if (hasUpdates) {
        setEquipment(updatedEquipment);
      }
    };

    // Check every 500ms for completed buildings
    const interval = setInterval(checkBuildingCompletion, 500);
    return () => clearInterval(interval);
  }, [equipmentValue, setEquipment]);

  useEffect(() => {
    if (delta >= equipmentRateValue) {
      last(Date.now());
      increment();
      setDelta(0);
    }
  }, [delta, increment, equipmentRateValue, equipmentValue, newEquipment]);

  return null;
}
