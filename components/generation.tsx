"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState, useMemo } from "react";

import { equipment, equipmentRate } from "@/atoms/equipment";
import { autoIncrement } from "@/atoms/au";
import { useAnimation } from "@/hooks/useAnimation";
import { generateEquipmentObject } from "@/lib/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";
import { lastUpdated } from "@/atoms/global";
import { EquipmentItem, EquipmentObject } from "@/types";

export function Generation() {
  const [equipmentValue, setEquipment] = useAtom(equipment);
  const last = useSetAtom(lastUpdated);
  const newEquipment = useMemo(
    () => generateEquipmentObject(EQUIPMENT_LIST),
    [],
  );
  const equipmentRateValue = useAtomValue(equipmentRate);
  const increment = useSetAtom(autoIncrement);
  const [delta, setDelta] = useState(0);

  const show = useMemo(
    () =>
      Object.keys(equipmentValue).filter((key) => equipmentValue[key].value > 0)
        .length > 0,
    [equipmentValue],
  );

  useAnimation((deltaTime) => {
    setDelta((current) => current + deltaTime);
  }, !show);

  useEffect(() => {
    const checkBuildingCompletion = () => {
      const now = Date.now();

      setEquipment((currentEquipment: EquipmentObject) => {
        let hasAnyItemChanged = false;
        let nextEquipmentState: EquipmentObject | null = null;

        Object.entries(currentEquipment).forEach(([key, item]) => {
          if (item.building && Object.keys(item.building).length > 0) {
            const currentItemBuilding = item.building;
            let newBuildingForThisItem: EquipmentItem["building"] | null = null;
            let itemBuildingChanged = false;

            Object.entries(currentItemBuilding).forEach(
              ([completionTime]) => {
                if (parseInt(completionTime) <= now) {
                  if (!newBuildingForThisItem) {
                    newBuildingForThisItem = { ...currentItemBuilding };
                  }
                  delete newBuildingForThisItem![completionTime];
                  itemBuildingChanged = true;
                }
              },
            );

            if (itemBuildingChanged) {
              if (!nextEquipmentState) {
                nextEquipmentState = { ...currentEquipment };
              }

              const equipmentKey = key as keyof EquipmentObject;
              nextEquipmentState![equipmentKey] = {
                ...item,
                value: item.value,
                building: newBuildingForThisItem || {},
              };
              hasAnyItemChanged = true;
            }
          }
        });

        if (hasAnyItemChanged && nextEquipmentState) {
          return nextEquipmentState;
        }
        return currentEquipment;
      });
    };

    const interval = setInterval(checkBuildingCompletion, 500);
    return () => clearInterval(interval);
  }, [setEquipment]);

  useEffect(() => {
    if (delta >= equipmentRateValue) {
      last(Date.now());
      increment();
      setDelta(0);
    }
  }, [delta, increment, equipmentRateValue, equipmentValue, newEquipment]);

  return null;
}
