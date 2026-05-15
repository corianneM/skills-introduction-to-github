/**
 * CPI-U inflation adjustment.
 * Uses pre-fetched CPI values to avoid redundant API calls.
 *
 * Formula: adjusted = nominal × (CPI_target / CPI_base)
 */

export function adjustForInflation(
  nominalValue: number,
  baseYearCPI: number,
  targetYearCPI: number
): number {
  if (baseYearCPI <= 0) throw new Error('Base year CPI must be positive');
  return nominalValue * (targetYearCPI / baseYearCPI);
}

/**
 * Format a dollar amount with commas and dollar sign.
 */
export function formatDollars(value: number, decimals = 0): string {
  return `$${value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

/**
 * Format a percentage.
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}
