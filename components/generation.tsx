"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState, useMemo, useRef } from "react";

import { equipment, equipmentRate } from "@/atoms/equipment";
import { autoIncrement } from "@/atoms/au";
import { useAnimation } from "@/hooks/useAnimation";
import { generateEquipmentObject } from "@/lib/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";
import { lastUpdated } from "@/atoms/global";

type BuildQueueItem = {
  key: string;
  time: number;
  count: number;
};

export function Generation() {
  const [equipmentValue, setEquipment] = useAtom(equipment);
  const last = useSetAtom(lastUpdated);
  const equipmentRateValue = useAtomValue(equipmentRate);
  const increment = useSetAtom(autoIncrement);
  const [delta, setDelta] = useState(0);

  const buildQueueRef = useRef<BuildQueueItem[]>([]);
  const nextCompletionRef = useRef<number | null>(null);

  const show =
    Object.keys(equipmentValue).filter((key) => equipmentValue[key].value > 0)
      .length > 0;

  const hasBuildingsInProgress = useMemo(() => {
    const hasBuildings = Object.values(equipmentValue).some(
      (item) => item.building && Object.keys(item.building).length > 0,
    );

    return hasBuildings;
  }, [equipmentValue]);

  useAnimation((deltaTime) => {
    setDelta((current) => current + deltaTime);
  }, !show);

  useEffect(() => {
    if (!hasBuildingsInProgress) {
      buildQueueRef.current = [];
      nextCompletionRef.current = null;
      return;
    }

    const newQueue: BuildQueueItem[] = [];

    Object.entries(equipmentValue).forEach(([key, item]) => {
      if (item.building && Object.keys(item.building).length > 0) {
        Object.entries(item.building).forEach(([completionTime, count]) => {
          const time = parseInt(completionTime);
          newQueue.push({ key, time, count });
        });
      }
    });

    newQueue.sort((a, b) => a.time - b.time);
    buildQueueRef.current = newQueue;
    nextCompletionRef.current = newQueue.length > 0 ? newQueue[0].time : null;
  }, [equipmentValue, hasBuildingsInProgress]);

  useEffect(() => {
    if (!hasBuildingsInProgress || buildQueueRef.current.length === 0) return;

    const processCompletions = () => {
      const now = Date.now();
      const queue = buildQueueRef.current;

      if (queue.length === 0 || queue[0].time > now) return false;

      const updatedEquipment = { ...equipmentValue };
      let hasUpdates = false;

      while (queue.length > 0 && queue[0].time <= now) {
        const { key, time, count } = queue.shift()!;

        const item = updatedEquipment[key];
        if (item && item.building) {
          updatedEquipment[key] = {
            ...item,
            value: item.value + count,
            building: {
              ...item.building,
            },
          };

          delete updatedEquipment[key].building![time.toString()];
          hasUpdates = true;
        }
      }

      nextCompletionRef.current = queue.length > 0 ? queue[0].time : null;

      if (hasUpdates) {
        setEquipment(updatedEquipment);
      }

      return hasUpdates;
    };

    processCompletions();

    const checkBuildingsTimer = () => {
      const nextCompletion = nextCompletionRef.current;

      if (nextCompletion === null) return;

      const now = Date.now();
      const timeUntilNext = Math.max(0, nextCompletion - now);

      if (timeUntilNext === 0) {
        if (processCompletions() && buildQueueRef.current.length > 0) {
          setTimeout(checkBuildingsTimer, 0);
        }
      } else {
        const delay = Math.min(timeUntilNext, 1000); // Cap at 1 second to handle any timing drift
        setTimeout(checkBuildingsTimer, delay);
      }
    };

    checkBuildingsTimer();
  }, [hasBuildingsInProgress, equipmentValue, setEquipment]);

  useEffect(() => {
    if (delta >= equipmentRateValue) {
      last(Date.now());
      increment();
      setDelta(0);
    }
  }, [delta, increment, equipmentRateValue, last]);

  return null;
}
