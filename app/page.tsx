import { ClickArea } from "@/components/click-area";
import { Equipment } from "@/components/equipment";
import { EquipmentDisplay } from "@/components/equipment/display";
import { Crew } from "@/components/crew";
import { Statistics } from "@/components/statistics";

export default function Home() {
  return (
    <section className="h-full w-full flex flex-row flex-nowrap overflow-hidden">
      <div className="w-72 border-r h-full flex-none overflow-y-auto">
        <ClickArea />
        <Crew />
        <Statistics />
        <Equipment />
      </div>
      <div className="flex-1 h-full">
        <p className="border-b p-4 font-bold bg-background">Equipment</p>
        <EquipmentDisplay />
      </div>
    </section>
  );
}
