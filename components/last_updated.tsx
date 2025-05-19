"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { autoIncrement } from "@/atoms/au";
import { lastUpdated } from "@/atoms/global";
import { equipment } from "@/atoms/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { calculateUpgradeMultiplier } from "@/lib/equipment";
import { formatMoney } from "@/lib/formatters";
import { useAnimation } from "@/hooks/useAnimation";
import { prestigeMultiplier, prestigeUpgrades } from "@/atoms/prestige";

export function LastUpdated() {
  const last = useAtomValue(lastUpdated);
  const equip = useAtomValue(equipment);
  const update = useSetAtom(autoIncrement);
  const presMultiplier = useAtomValue(prestigeMultiplier) || 1;
  const allUpgrades = useAtomValue(prestigeUpgrades) || {};
  const initialized = useRef(false);
  const [delta, setDelta] = useState(0);

  useAnimation((deltaTime) => {
    setDelta((current) => current + deltaTime);
  }, false);

  useEffect(() => {
    const checkOfflineEarnings = () => {
      const now = Date.now();

      if (last <= now - 60000) {
        const offlineProductionCount = allUpgrades.offlineProduction || 0;
        const offlineMultiplier =
          offlineProductionCount > 0
            ? Math.pow(
                PRESTIGE_UPGRADES.offlineProduction.multiplier ?? 1,
                offlineProductionCount,
              )
            : 1;

        const diff = Math.min((now - last) / 1000, 14400);
        update(diff as number);
        let earned = 0;

        Object.entries(equip).forEach(([key, eq]: any) => {
          if (eq.value > 0) {
            const item = EQUIPMENT_LIST[key];

            if (!item || item.equipment === false) return;

            const multiplier = calculateUpgradeMultiplier(
              eq,
              item,
              presMultiplier,
            );

            earned +=
              item.auPerSecond *
              multiplier *
              eq.value *
              diff *
              offlineMultiplier;
          }
        });

        if (earned > 0) {
          setTimeout(() => {
            const bonusMessage =
              offlineProductionCount > 0
                ? ` (includes ${((offlineMultiplier - 1) * 100).toFixed(0)}% offline production bonus)`
                : "";

            toast.info(
              "You've been away for a while, here's what you've earned while you were gone!",
              {
                description: `You've earned ${formatMoney(earned)} AUs while you were away!${bonusMessage}`,
                duration: 5000,
              },
            );
          }, 500);
        }
      }
    };

    if (!initialized.current) {
      initialized.current = true;
      checkOfflineEarnings();
    }
  }, [last, equip, update, presMultiplier, allUpgrades]);

  useEffect(() => {
    if (delta >= 1000) {
      setDelta(0);
    }
  }, [delta]);

  return null;
}
