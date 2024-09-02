import { ClickTotalCount } from "@/components/statistics/total-count";
import { AusPerSecond } from "@/components/statistics/aus-per-second";
import { ClicksPerSecond } from "@/components/statistics/clicks-per-second";

export function Statistics() {
  return (
    <div className="flex-none border-t p-4 bg-background space-y-2">
      <ClickTotalCount />
      <ClicksPerSecond />
      <AusPerSecond />
    </div>
  );
}
