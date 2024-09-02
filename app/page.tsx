import { ClickArea } from "@/components/click-area";
import { Shop } from "@/components/shop";
import { EquipmentDisplay } from "@/components/equipment/display";
import { Crew } from "@/components/crew";
import { Statistics } from "@/components/statistics";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <section className="h-full w-full flex flex-row flex-nowrap overflow-hidden">
      <div className="w-72 border-r h-full flex flex-col flex-none overflow-y-hidden">
        <ClickArea />
        <Statistics />
        <Crew />
        <Shop />
      </div>
      <div className="flex-1 h-full flex flex-col">
        <nav className="border-b px-4 h-12 flex items-center justify-between font-bold bg-background sticky top-0 z-50">
          <p>Astronomical Units</p>
          <ModeToggle />
        </nav>
        <div className="overflow-y-auto flex-1">
          <nav className="border-b px-4 h-12 flex items-center justify-between font-bold bg-background sticky top-0 z-50">
            <p>Equipment</p>
          </nav>
          <EquipmentDisplay />
        </div>
      </div>
    </section>
  );
}
