import { atom } from "jotai";

export const clicksPerSecond = atom(0);

if (process.env.NODE_ENV !== "production") {
  clicksPerSecond.debugLabel = "CPS";
}
