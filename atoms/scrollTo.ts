import { atom } from "jotai";

export const scrollToEquipmentAtom = atom<string | null>(null);

// Debug label
if (process.env.NODE_ENV !== "production") {
  scrollToEquipmentAtom.debugLabel = "Scroll To Equipment";
}
