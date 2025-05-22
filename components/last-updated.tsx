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
import { useAnimation } from "@/hooks/useAnimation";
import { prestigeMultiplier, prestigeUpgrades } from "@/atoms/prestige";
import { Button } from "@/components/ui/button";
import { DynamicDrawer } from "@/components/ui/dynamic-drawer";

export function LastUpdated() {
  const last = useAtomValue(lastUpdated);
  const equip = useAtomValue(equipment);
  const update = useSetAtom(autoIncrement);
  const presMultiplier = useAtomValue(prestigeMultiplier) || 1;
  const allUpgrades = useAtomValue(prestigeUpgrades) || {};
  const initialized = useRef(false);
  const [delta, setDelta] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [offlineEarnings, setOfflineEarnings] = useState(0);
  const [bonusMessage, setBonusMessage] = useState("");
  const [currentAu, setCurrentAu] = useAtom(au);

  useAnimation((deltaTime) => {
    setDelta((current) => current + deltaTime);
  }, false);

  const claimOfflineEarnings = () => {
    setCurrentAu((current) => current + offlineEarnings);
    setDialogOpen(false);
  };
  useEffect(() => {
    const MIN_OFFLINE_TIME = 60000;
    const MAX_OFFLINE_SECONDS = 14400;

    const checkOfflineEarnings = () => {
      const now = Date.now();

      if (last <= now - MIN_OFFLINE_TIME) {
        const offlineProductionCount = allUpgrades.offlineProduction || 0;
        const offlineMultiplier =
          offlineProductionCount > 0
            ? Math.pow(
                PRESTIGE_UPGRADES.offlineProduction.multiplier ?? 1,
                offlineProductionCount,
              )
            : 1;

        const diff = Math.min((now - last) / 1000, MAX_OFFLINE_SECONDS);
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
          const bonusMsg =
            offlineProductionCount > 0
              ? ` (includes ${((offlineMultiplier - 1) * 100).toFixed(0)}% offline production bonus)`
              : "";

          setOfflineEarnings(earned);
          setBonusMessage(bonusMsg);
          setDialogOpen(true);
        }
      }
    };

    if (!initialized.current) {
      initialized.current = true;
      checkOfflineEarnings();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkOfflineEarnings();
      } else if (document.visibilityState === "hidden") {
        update(0);
      }
    };

    const handleFocus = () => {
      checkOfflineEarnings();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    const checkInterval = setInterval(checkOfflineEarnings, 60000); // Check every minute

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      clearInterval(checkInterval);
    };
  }, [last, equip, update, presMultiplier, allUpgrades]);

  useEffect(() => {
    if (delta >= 1000) {
      setDelta(0);
    }
  }, [delta]);

  return (
    <DynamicDrawer
      title="Welcome Back!"
      description={`You've earned ${formatMoney(offlineEarnings)} AUs while you were
          away!${bonusMessage}`}
      setOpen={setDialogOpen}
      open={dialogOpen}
    >
      <Button size="sm" className="w-full" onClick={claimOfflineEarnings}>
        Claim Earnings
      </Button>
    </DynamicDrawer>
  );
}
