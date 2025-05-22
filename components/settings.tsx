import { LucideSettings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DynamicDrawer } from "@/components/ui/dynamic-drawer";
import { DevMode } from "@/components/dev-mode";
import { ModeToggle } from "@/components/mode-toggle";
import { Backup } from "@/components/backup";

export function Settings() {
  return (
    <DynamicDrawer
      title="Settings"
      description="Configure your preferences and settings."
      button={
        <Button size="icon" variant="ghost" className="size-10 [&_svg]:size-5">
          <LucideSettings />
        </Button>
      }
    >
      <div className="space-y-4">
        <div>
          <p className="mb-1 text-sm font-semibold">Preferences</p>
          <ModeToggle />
        </div>
        <div>
          <p className="mb-1 text-sm font-semibold">Backup</p>
          <Backup />
        </div>
        <div>
          <p className="mb-1 text-sm font-semibold">Developer</p>
          <DevMode />
        </div>
      </div>
    </DynamicDrawer>
  );
}
