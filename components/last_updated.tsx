"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { autoIncrement } from "@/atoms/au";
import { lastUpdated } from "@/atoms/global";
import { equipment } from "@/atoms/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { calculateUpgradeMultiplier } from "@/lib/utils";

export function LastUpdated() {
  const last = useAtomValue(lastUpdated);
  const equip = useAtomValue(equipment);
  const update = useSetAtom(autoIncrement);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const now = Date.now();

      if (last <= now - 60000) {
        const diff = (now - last) / 1000;
        update(diff);
        let earned = 0;

        Object.entries(equip).forEach(([key, eq]: any) => {
          if (eq.value > 0) {
            const item = EQUIPMENT_LIST[key];
            const multiplier = calculateUpgradeMultiplier(eq, item);

            earned += item.auPerSecond * multiplier * eq.value * diff;
          }
        });

        if (earned > 0) {
          setTimeout(() => {
            toast.info(
              "You've been away for a while, here's what you've earned while you were gone!",
              {
                description: `You've earned ${earned} AUs while you were away!`,
                duration: 5000,
              },
            );
          }, 500);
        }
      }
    }
  }, []);

  return null;
}
