import { ClickTotalCount } from "@/components/click-area/total-count";
import { AusPerSecond } from "@/components/statistics/aus-per-second";
import { ClicksPerSecond } from "@/components/statistics/clicks-per-second";

export function Statistics() {
  return (
    <div className="sticky top-0 border-t p-4 bg-background">
      <ClickTotalCount />
      <ClicksPerSecond />
      <AusPerSecond />
    </div>
  );
}
