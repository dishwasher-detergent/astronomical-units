import { ClicksPerSecond } from "@/components/statistics/clicks-per-second";
import { EngagementPerSecond } from "@/components/statistics/engagement-per-second";
import { LikesPerSecond } from "@/components/statistics/likes-per-second";
import { ReachPerSecond } from "@/components/statistics/reach-per-second";

export function Statistics() {
  return (
    <div>
      <div>
        <ClicksPerSecond />
        <EngagementPerSecond />
        <LikesPerSecond />
        <ReachPerSecond />
      </div>
    </div>
  );
}
