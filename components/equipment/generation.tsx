import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

import { equipment, equipmentRate } from "@/atoms/equipment";
import { useAnimation } from "@/hooks/useAnimation";
import { auIncrement } from "@/atoms/au";

export function Generation() {
  const equipmentValue = useAtomValue(equipment);
  const equipmentRateValue = useAtomValue(equipmentRate);
  const incrementAu = useSetAtom(auIncrement);
  const [delta, setDelta] = useState(0);

  const show = equipmentValue > 0;

  useAnimation((deltaTime) => {
    setDelta((current) => current + deltaTime);
  }, !show);

  useEffect(() => {
    if (delta >= equipmentRateValue) {
      for (let i = 0; i < equipmentValue; i++) {
        incrementAu();
      }

      setDelta(0);
    }
  }, [delta, incrementAu, equipmentRateValue, equipmentValue]);

  return null;
}
