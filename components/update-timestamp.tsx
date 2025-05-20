"use client";

import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { lastUpdated, saveGameState } from "@/atoms/global";

export function UpdateTimestamp() {
  const setLastUpdated = useSetAtom(lastUpdated);
  const save = useSetAtom(saveGameState);

  useEffect(() => {
    const updateTimestamp = () => {
      setLastUpdated(Date.now());
      save();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        updateTimestamp();
      }
    };

    const handleBlur = () => {
      updateTimestamp();
    };

    const handleBeforeUnload = () => {
      updateTimestamp();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);

    const intervalId = setInterval(updateTimestamp, 60000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(intervalId);
    };
  }, [setLastUpdated, save]);

  return null;
}
