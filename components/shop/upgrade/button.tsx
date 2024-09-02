"use client";

import { useAtom } from "jotai";
import React from "react";

import { Button } from "@/components/ui/button";
import { au } from "@/atoms/au";
import { toast } from "sonner";

export function UpgradeButton({
  cost,
  name,
  disabled = false,
  increment,
  children,
}: {
  cost: number;
  name: string;
  disabled: boolean;
  increment: (update?: unknown | number) => void;
  children: React.ReactNode;
}) {
  const [auValue, setAu] = useAtom(au);

  return (
    <Button
      className="h-8 p-0 md:w-8"
      variant="outline"
      disabled={disabled}
      onClick={() => {
        if (!disabled) {
          increment();
          setAu((current) => current - cost);
          toast.success(`Purchased ${name} for ${cost} AU`);
        }
      }}
    >
      {children}
    </Button>
  );
}
