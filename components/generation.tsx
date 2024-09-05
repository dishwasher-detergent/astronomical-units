"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { equipment, equipmentRate } from "@/atoms/equipment";
import { autoIncrement } from "@/atoms/au";
import { useAnimation } from "@/hooks/useAnimation";
import { generateEquipmentObject } from "@/lib/utils";
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

  useEffect(() => {
    if (delta >= equipmentRateValue) {
      last(Date.now());
      increment();
      setDelta(0);
    }
  }, [delta, increment, equipmentRateValue, equipmentValue, newEquipment]);

  return null;
}
