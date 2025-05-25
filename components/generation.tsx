"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState, useMemo } from "react";

import { equipment, equipmentRate } from "@/atoms/equipment";
import { autoIncrement } from "@/atoms/au";
import { useAnimation } from "@/hooks/useAnimation";
import { generateEquipmentObject } from "@/lib/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";
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

  const hasBuildingsInProgress = useMemo(() => {
    return Object.values(equipmentValue).some(
      (item) => item.building && Object.keys(item.building).length > 0,
    );
  }, [equipmentValue]);

  useAnimation((deltaTime) => {
    setDelta((current) => current + deltaTime);
  }, !show);

  useEffect(() => {
    if (!hasBuildingsInProgress) return;

    const checkBuildingCompletion = () => {
      const now = Date.now();
      let hasUpdates = false;
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
              value: item.value + completedCount,
              building: newBuilding,
            };
          }
        }
      });

      if (hasUpdates) {
        setEquipment(updatedEquipment);
      }
    };

    const intervalTime = Math.min(
      500,
      Math.max(
        100,
        500 -
          Object.values(equipmentValue).reduce((count, item) => {
            return (
              count + (item.building ? Object.keys(item.building).length : 0)
            );
          }, 0) *
            5,
      ),
    );

    const interval = setInterval(checkBuildingCompletion, intervalTime);
    return () => clearInterval(interval);
  }, [hasBuildingsInProgress, equipmentValue, setEquipment]);

  useEffect(() => {
    if (delta >= equipmentRateValue) {
      last(Date.now());
      increment();
      setDelta(0);
    }
  }, [delta, increment, equipmentRateValue, equipmentValue, newEquipment]);

  return null;
}
