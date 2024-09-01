import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { equipment, equipmentRate } from "@/atoms/equipment";
import { useAnimation } from "@/hooks/useAnimation";
import { autoIncrement } from "@/atoms/au";

export function Generation() {
  const equipmentValue = useAtomValue(equipment);
  const equipmentRateValue = useAtomValue(equipmentRate);
  const increment = useSetAtom(autoIncrement);
  const [delta, setDelta] = useState(0);

  const value = Object.values(equipmentValue).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const show =
    Object.keys(equipmentValue).filter((key) => equipmentValue[key] > 0)
      .length > 0;

  useAnimation((deltaTime) => {
    setDelta((current) => current + deltaTime);
  }, !show);

  useEffect(() => {
    if (delta >= equipmentRateValue) {
      increment();
      setDelta(0);
    }
  }, [delta, increment, equipmentRateValue, equipmentValue]);

  return null;
}
