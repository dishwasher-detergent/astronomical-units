import { ClickTotalCount } from "@/components/statistics/total-count";
import { AusPerSecond } from "@/components/statistics/aus-per-second";
import { ClicksPerSecond } from "@/components/statistics/clicks-per-second";

export function Statistics() {
  return (
    <div className="z-10 flex-none space-y-2 border-b bg-background p-4">
      <ClickTotalCount />
      <ClicksPerSecond />
      <AusPerSecond />
    </div>
  );
}
