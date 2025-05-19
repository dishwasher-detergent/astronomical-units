import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string using clsx and tailwind-merge
 * @param inputs - Array of class values to be combined
 * @returns Merged and deduplicated className string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Filters an object to find entries with keys containing a specific parent key
 * @param obj - The object to search through
 * @param parentKey - The parent key to look for in object keys
 * @returns Array of filtered entries that include the parent key
 */
export function getUpgrades(obj: Record<string, any>, parentKey: string) {
  return Object.entries(obj).filter(([key, value]) => key.includes(parentKey));
}

/**
 * Deeply merges two nested objects, recursively handling nested object properties
 * @param obj1 - First object to merge (takes precedence for top-level properties)
 * @param obj2 - Second object to merge
 * @returns New object with deeply merged properties from both objects
 */
export function mergeNestedObjects<
  T extends Record<string, any>,
  U extends Record<string, any>,
>(obj1: T, obj2: U): T & U {
  const result: Record<string, any> = { ...obj2, ...obj1 };

  Object.keys(result).forEach((key) => {
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      result[key] = mergeNestedObjects(obj1[key], obj2[key]);
    }
  });

  return result as T & U;
}
