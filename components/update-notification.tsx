"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function UpdateNotification() {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );
  const [updateToastId, setUpdateToastId] = useState<string | number | null>(
    null,
  );

  // Function to refresh the page
  const refreshPage = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
    }
    window.location.reload();
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              setWaitingWorker(newWorker);

              const id = toast("Update available!", {
                description: "A new version of the app is available.",
                action: {
                  label: "Update now",
                  onClick: () => refreshPage(),
                },
                duration: 0,
              });
              setUpdateToastId(id);
            }
          });
        });

        const checkForUpdates = () => {
          console.log("Checking for service worker updates...");
          registration.update().catch((err) => {
            console.error("Error checking for service worker updates:", err);
          });
        };

        const initialCheckTimer = setTimeout(checkForUpdates, 60000);

        const updateCheckInterval = setInterval(
          checkForUpdates,
          30 * 60 * 1000,
        );

        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            checkForUpdates();
          }
        });

        return () => {
          clearTimeout(initialCheckTimer);
          clearInterval(updateCheckInterval);
        };
      });

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!window.isReloading) {
          window.isReloading = true;
          window.location.reload();
        }
      });
    }
  }, []);

  return (
    <>
      <AlertDialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Available</AlertDialogTitle>
            <AlertDialogDescription>
              A new version of the application is available. Please update now
              to get the latest features and improvements.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={refreshPage}>
              Update Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

declare global {
  interface Window {
    isReloading?: boolean;
  }
}
