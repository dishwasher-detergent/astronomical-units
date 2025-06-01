"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { LucideComputer, LucideMoon, LucideSun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="inline-flex items-center gap-0.5 rounded-lg border p-0.5">
      <Button
        size="icon"
        variant={theme === "system" ? "default" : "ghost"}
        onClick={() => setTheme("system")}
        title={`Switch to system theme`}
        className="size-8 [&>svg]:size-4"
      >
        <LucideComputer />
      </Button>
      <Button
        size="icon"
        variant={theme === "light" ? "default" : "ghost"}
        onClick={() => setTheme("light")}
        title={`Switch to light mode`}
        className="size-8 [&>svg]:size-4"
      >
        <LucideSun />
      </Button>
      <Button
        size="icon"
        variant={theme === "dark" ? "default" : "ghost"}
        onClick={() => setTheme("dark")}
        title={`Switch to dark mode`}
        className="size-8 [&>svg]:size-4"
      >
        <LucideMoon />
      </Button>
    </div>
  );
}
