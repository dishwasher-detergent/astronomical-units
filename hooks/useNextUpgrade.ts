import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { nextPrestigeUpgrade, nextUpgrade } from "@/atoms/upgrades";
import { usePreviousValue } from "@/hooks/usePreviousValue";

export function useNextUpgrade(isActive = false) {
  const setNextUpgrade = useSetAtom(nextUpgrade);

  const wasActive = usePreviousValue<boolean>(isActive);

  useEffect(() => {
    if (wasActive !== null && wasActive !== isActive) {
      setNextUpgrade();
    }
  }, [isActive, setNextUpgrade, wasActive]);
}

export function useNextPrestigeUpgrade(isActive = false) {
  const setNextUpgrade = useSetAtom(nextPrestigeUpgrade);

  const wasActive = usePreviousValue<boolean>(isActive);

  useEffect(() => {
    if (wasActive !== null && wasActive !== isActive) {
      setNextUpgrade();
    }
  }, [isActive, setNextUpgrade, wasActive]);
}
