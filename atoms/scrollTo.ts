import { atom } from "jotai";

/**
 * Atom to track which equipment item to scroll to
 */
export const scrollToEquipmentAtom = atom<string | null>(null);

// Debug label
if (process.env.NODE_ENV !== "production") {
  scrollToEquipmentAtom.debugLabel = "Scroll To Equipment";
}
