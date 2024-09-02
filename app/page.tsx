import { ClickArea } from "@/components/click-area";
import { Shop } from "@/components/shop";
import { EquipmentDisplay } from "@/components/equipment/display";
import { Crew } from "@/components/crew";
import { Statistics } from "@/components/statistics";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Home() {
  return (
    <section className="flex h-full w-full flex-row flex-nowrap overflow-hidden">
      <div className="flex h-full w-72 flex-none flex-col overflow-y-hidden border-r">
        <ClickArea />
        <Statistics />
        <Crew />
        <Shop />
      </div>
      <div className="flex h-full flex-1 flex-col">
        <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b bg-background px-4 font-bold">
          <p>Astronomical Units</p>
          <ModeToggle />
        </nav>
        <div className="flex-1 overflow-y-auto">
          <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b bg-background px-4 font-bold">
            <p>Equipment</p>
          </nav>
          <EquipmentDisplay />
        </div>
      </div>
    </section>
  );
}
