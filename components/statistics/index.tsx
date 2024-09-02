import { ClickTotalCount } from "@/components/statistics/total-count";
import { AusPerSecond } from "@/components/statistics/aus-per-second";
import { ClicksPerSecond } from "@/components/statistics/clicks-per-second";

export function Statistics() {
  return (
    <div className="flex-none space-y-2 border-t bg-background p-4">
      <ClickTotalCount />
      <ClicksPerSecond />
      <AusPerSecond />
    </div>
  );
}
