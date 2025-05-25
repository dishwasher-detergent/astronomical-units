"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";

import { equipment, equipmentRate } from "@/atoms/equipment";
import { autoIncrement } from "@/atoms/au";
import { useAnimation } from "@/hooks/useAnimation";
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
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateTimeRef = useRef<number>(Date.now());
  const pendingUpdatesRef = useRef<Record<string, any>>({});
  const updateScheduledRef = useRef<boolean>(false);
  const batchedUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show =
    Object.keys(equipmentValue).filter((key) => equipmentValue[key].value > 0)
      .length > 0;

  const hasBuildingsInProgress = useMemo(() => {
    const hasBuildings = Object.values(equipmentValue).some(
      (item) => item.building && Object.keys(item.building).length > 0,
    );

    return hasBuildings;
  }, [equipmentValue]);

  const applyBatchedUpdates = useCallback(() => {
    if (Object.keys(pendingUpdatesRef.current).length === 0) {
      updateScheduledRef.current = false;
      return;
    }

    const updatedEquipment = { ...equipmentValue };
    let hasChanges = false;

    Object.entries(pendingUpdatesRef.current).forEach(([key, itemUpdate]) => {
      if (updatedEquipment[key]) {
        updatedEquipment[key] = {
          ...updatedEquipment[key],
          ...itemUpdate,
        };
        hasChanges = true;
      }
    });

    pendingUpdatesRef.current = {};
    updateScheduledRef.current = false;

    if (hasChanges) {
      setEquipment(updatedEquipment);
    }
  }, [equipmentValue, setEquipment]);

  const scheduleUpdate = useCallback(
    (updates: Record<string, any>) => {
      Object.entries(updates).forEach(([key, value]) => {
        pendingUpdatesRef.current[key] = {
          ...(pendingUpdatesRef.current[key] || {}),
          ...value,
        };
      });

      if (!updateScheduledRef.current) {
        updateScheduledRef.current = true;

        if (batchedUpdateTimeoutRef.current) {
          clearTimeout(batchedUpdateTimeoutRef.current);
        }

        batchedUpdateTimeoutRef.current = setTimeout(() => {
          applyBatchedUpdates();
          batchedUpdateTimeoutRef.current = null;
        }, 16);
      }
    },
    [applyBatchedUpdates],
  );

  useAnimation((deltaTime) => {
    const now = Date.now();
    const elapsed = now - lastUpdateTimeRef.current;

    if (elapsed >= 16) {
      setDelta((current) => current + deltaTime);
      lastUpdateTimeRef.current = now;
    }
  }, !show);

  useEffect(() => {
    if (!hasBuildingsInProgress) {
      buildQueueRef.current = [];
      nextCompletionRef.current = null;

      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }
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

      const updates: Record<string, any> = {};
      let hasUpdates = false;

      while (queue.length > 0 && queue[0].time <= now) {
        const { key, time, count } = queue.shift()!;

        const item = equipmentValue[key];
        if (item && item.building) {
          if (!updates[key]) {
            updates[key] = {
              value: item.value + count,
              building: { ...item.building },
            };
            delete updates[key].building[time.toString()];
          } else {
            updates[key].value += count;
            delete updates[key].building[time.toString()];
          }
          hasUpdates = true;
        }
      }

      nextCompletionRef.current = queue.length > 0 ? queue[0].time : null;

      if (hasUpdates) {
        scheduleUpdate(updates);
      }

      return hasUpdates;
    };

    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }

    processCompletions();

    const scheduleNextCheck = () => {
      const nextCompletion = nextCompletionRef.current;

      if (nextCompletion === null) return;

      const now = Date.now();
      const timeUntilNext = Math.max(0, nextCompletion - now);

      if (timeUntilNext === 0) {
        if (processCompletions() && buildQueueRef.current.length > 0) {
          timerIdRef.current = setTimeout(scheduleNextCheck, 0);
        }
      } else {
        const delay = Math.min(timeUntilNext, 1000);
        timerIdRef.current = setTimeout(scheduleNextCheck, delay);
      }
    };

    scheduleNextCheck();

    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
        timerIdRef.current = null;
      }

      if (batchedUpdateTimeoutRef.current) {
        clearTimeout(batchedUpdateTimeoutRef.current);
        batchedUpdateTimeoutRef.current = null;
      }
    };
  }, [hasBuildingsInProgress, equipmentValue, scheduleUpdate]);

  useEffect(() => {
    if (delta >= equipmentRateValue) {
      last(Date.now());
      increment();
      setDelta(0);
    }
  }, [delta, increment, equipmentRateValue, last]);

  return null;
}
