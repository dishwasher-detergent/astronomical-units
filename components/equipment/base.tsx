import { type WritableAtom, useAtom } from "jotai";

import { AcquireButton } from "@/components/aquire";
import type { UpgradableElementKey } from "@/types";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EQUIPMENT_LIST } from "@/constants/EQUIPMENT_DETAILS";

export function Base({
  atom,
  elementKey,
}: {
  atom: WritableAtom<number, [unknown?], void>;
  elementKey: UpgradableElementKey;
}) {
  const [rankValue, setRank] = useAtom(atom);

  const { description, name } = EQUIPMENT_LIST[elementKey];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-row items-center">
            <div className="h-full flex-1">
              <p>{name}</p>
              <div>{rankValue}</div>
            </div>
            <AcquireButton
              elementKey={elementKey}
              increment={setRank}
              isSmall
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" align="start">
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
