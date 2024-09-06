"use client";

import { LucideShare } from "lucide-react";
import { useEffect, useState } from "react";

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream,
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null;
  }

  return (
    isIOS && (
      <div className="border-b bg-slate-900 p-1 text-white">
        <p className="flex flex-row items-center">
          To install this app, tap <LucideShare className="mx-1 size-3" /> then
          <span className="ml-1 font-semibold">Add to Home Screen</span>.
        </p>
      </div>
    )
  );
}
