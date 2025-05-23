"use client";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";

import { autoIncrement, au } from "@/atoms/au";
import { lastUpdated } from "@/atoms/global";
import { equipment } from "@/atoms/equipment";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_LIST";
import { PRESTIGE_UPGRADES } from "@/constants/PRESTIGE_UPGRADES";
import { calculateUpgradeMultiplier } from "@/lib/equipment";
import { formatMoney } from "@/lib/formatters";
import { prestigeMultiplier, prestigeUpgrades } from "@/atoms/prestige";
import { Button } from "@/components/ui/button";
import { DynamicDrawer } from "@/components/ui/dynamic-drawer";

export function OfflineIncome() {
  const last = useAtomValue(lastUpdated);
  const equip = useAtomValue(equipment);
  const presMultiplier = useAtomValue(prestigeMultiplier) || 1;
  const allUpgrades = useAtomValue(prestigeUpgrades) || {};
  const update = useSetAtom(autoIncrement);
  const setCurrentAu = useSetAtom(au);

  const initialized = useRef(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [offlineEarnings, setOfflineEarnings] = useState(0);
  const [offlineTime, setOfflineTime] = useState("");
  const [bonusMessage, setBonusMessage] = useState("");

  const MIN_OFFLINE_MS = 60000;
  const MAX_OFFLINE_MS = 14400000;

  const claimOfflineEarnings = () => {
    setCurrentAu((current) => current + offlineEarnings);
    setDialogOpen(false);
  };

  const formatTimeString = (timeMs: number): string => {
    const totalSeconds = Math.floor(timeMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  const calculateOfflineEarnings = () => {
    const now = Date.now();

    if (last <= 0 || last > now || now - last < MIN_OFFLINE_MS) {
      return;
    }

    const offlineDurationMs = Math.min(now - last, MAX_OFFLINE_MS);
    const offlineDurationSeconds = offlineDurationMs / 1000;

    const offlineProductionLevel = allUpgrades.offlineProduction || 0;
    const offlineMultiplier =
      offlineProductionLevel > 0
        ? Math.pow(
            PRESTIGE_UPGRADES.offlineProduction.multiplier ?? 1,
            offlineProductionLevel,
          )
        : 1;

    const offlineTimeStr = formatTimeString(offlineDurationMs);

    update(offlineDurationSeconds);

    let earned = 0;

    Object.entries(equip).forEach(([key, eq]: any) => {
      if (eq.value > 0) {
        const item = EQUIPMENT_LIST[key];

        if (!item || item.equipment === false) return;

        const equipMultiplier = calculateUpgradeMultiplier(
          eq,
          item,
          presMultiplier,
        );

        earned +=
          item.auPerSecond *
          equipMultiplier *
          eq.value *
          offlineDurationSeconds *
          offlineMultiplier;
      }
    });

    if (earned > 0) {
      const bonusMsg =
        offlineProductionLevel > 0
          ? ` (includes ${((offlineMultiplier - 1) * 100).toFixed(0)}% offline production bonus)`
          : "";

      setOfflineEarnings(earned);
      setOfflineTime(offlineTimeStr);
      setBonusMessage(bonusMsg);
      setDialogOpen(true);
    }
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      calculateOfflineEarnings();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        calculateOfflineEarnings();
      }
    };

    const handleFocus = () => {
      calculateOfflineEarnings();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [last, equip, update, presMultiplier, allUpgrades]);

  return (
    <DynamicDrawer
      title="Welcome Back!"
      description={`You've earned ${formatMoney(offlineEarnings)} AUs while you were away for ${offlineTime}!${bonusMessage}`}
      setOpen={setDialogOpen}
      open={dialogOpen}
      dismissible={false}
    >
      <Button className="w-full" onClick={claimOfflineEarnings}>
        Claim Earnings
      </Button>
    </DynamicDrawer>
  );
}
