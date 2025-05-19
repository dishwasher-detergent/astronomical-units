/**
 * Formats a number into a human-readable string with appropriate suffixes (K, M, B, T, etc.)
 * @param value - The number to format
 * @param showDecimalsUnderMillion - Whether to show decimals for values under 1 million (default: true)
 * @returns Formatted string with appropriate suffix
 */
export function formatMoney(value?: number | null): string {
  if (value === 0 || value === undefined || value === null) return "0";

  const suffixes = [
    "",
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "Oc",
    "No",
    "Dc",
  ];
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);
  if (tier === 0) {
    return value.toFixed(2);
  }

  if (tier >= suffixes.length) {
    return value.toExponential(2);
  }

  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;
  const suffix = suffixes[tier];

  return scaled.toFixed(2) + suffix;
}
