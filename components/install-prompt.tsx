"use client";

import { LucideShare } from "lucide-react";

import { useInstallDetection } from "@/hooks/useInstallDetection";

export function InstallPrompt() {
  const { isIOS, isStandalone } = useInstallDetection();

  if (isStandalone) {
    return null;
  }

  return (
    isIOS && (
      <div className="border-b bg-slate-900 p-1 text-white">
        <p className="flex flex-row items-center text-xs">
          To install this app, tap <LucideShare className="mx-1 size-3" /> then
          <span className="ml-1 font-semibold">Add to Home Screen</span>.
        </p>
      </div>
    )
  );
}
