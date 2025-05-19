/**
 * A utility class that caches computation results to improve performance
 * by avoiding redundant calculations with the same inputs
 */
export class MemoizedCalculator {
  private cache = new Map<string, number>();
  private maxSize: number;

  /**
   * Creates a new MemoizedCalculator with a specified cache size limit
   * @param maxSize - Maximum number of cached results to store (default: 500)
   */
  constructor(maxSize = 500) {
    this.maxSize = maxSize;
  }

  /**
   * Calculates a value using the provided function, storing the result in cache
   * @param fn - Function that performs the calculation
   * @param key - Unique key to identify this calculation for caching
   * @returns The calculated result, either from cache or freshly computed
   */
  calculate(fn: () => number, key: string): number {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const result = fn();
    this.cache.set(key, result);

    if (this.cache.size > this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        this.cache.delete(oldestKey);
      }
    }

    return result;
  }

  /**
   * Clears all cached results
   */
  clear(): void {
    this.cache.clear();
  }
}

// Pre-initialize a calculator instance for upgrade multiplier calculations
export const upgradeMultiplierCalc = new MemoizedCalculator();
