"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { LucideMoon, LucideSun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="secondary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme == "light" && <LucideSun />}
      {theme == "dark" && <LucideMoon />}
      Theme
    </Button>
  );
}
