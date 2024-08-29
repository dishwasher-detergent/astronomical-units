import { Attrition } from "@/components/attrition";
import { ClickArea } from "@/components/click-area";
import { Engagement } from "@/components/engagement";
import { Followers } from "@/components/followers";
import { Influencers } from "@/components/influencers";
import { Reach } from "@/components/reach";
import { Statistics } from "@/components/statistics";

export default function Home() {
  return (
    <main className="grid grid-cols-3">
      <div>
        <Statistics />
      </div>
      <div>
        <ClickArea />
        <Engagement />
        <Attrition />
        <Followers />
        <Reach />
        <Influencers />
      </div>
    </main>
  );
}
