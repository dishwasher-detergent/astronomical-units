import { ClickArea } from "@/components/click-area";
import { ClickTotalCount } from "@/components/click-area/total-count";
import { ClicksPerSecond } from "@/components/statistics/clicks-per-second";
import { AusPerSecond } from "@/components/statistics/aus-per-second";
import { Equipment } from "@/components/equipment";

export default function Home() {
  return (
    <section className="grid grid-cols-3 h-full w-full">
      <div className="w-72 border-r h-full">
        <div className="border-b">
          <ClickArea />
        </div>
        <div className="border-b p-4 space-y-2">
          <p className="font-bold text-xl">Statistics</p>
          <ClickTotalCount />
          <ClicksPerSecond />
          <AusPerSecond />
        </div>
        <Equipment />
      </div>
    </section>
  );
}
