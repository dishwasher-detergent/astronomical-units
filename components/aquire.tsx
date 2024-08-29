'use client'

import { useAtom } from "jotai";

import { likes } from "@/atoms/likes";
import { LOCALE } from "@/constants/GLOBAL";
import { useAcquireCost } from "@/hooks/useAcquireCost";
import type { AcquirableElementKey } from "@/types";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function AcquireButton({
  elementKey,
  increment,
  isSmall = false,
}: {
  elementKey: AcquirableElementKey;
  increment: (update?: unknown) => void;
  isSmall?: boolean;
}) {
  const [likesValue, setLikes] = useAtom(likes);

  const cost = useAcquireCost(elementKey);

  const canAcquire = cost <= likesValue;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span className="d-inline-block">
            <Button
              disabled={!canAcquire}
              onClick={() => {
                if (canAcquire) {
                  increment();
                  setLikes((current) => current - cost);
                }
              }}
              size={isSmall ? "sm" : undefined}
              style={{ width: isSmall ? 140 : 200 }}
              variant="outline"
            >
              Acquire
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          Cost:
          <strong className="font-monospace">
            {cost.toLocaleString(LOCALE)}
          </strong>
          Likes
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
