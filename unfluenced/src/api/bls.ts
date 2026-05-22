/**
 * Bureau of Labor Statistics public API v2
 * No API key needed for ≤ 25 series per request, ≤ 500 results.
 * Docs: https://www.bls.gov/developers/api_signature_v2.htm
 */

const BLS_BASE = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';

export interface BLSSeriesResult {
  seriesID: string;
  data: {
    year: string;
    period: string;  // 'M01'–'M12' or 'A01' annual
    periodName: string;
    value: string;
    footnotes: { code: string; text: string }[];
  }[];
}

export interface BLSResponse {
  status: string;
  message: string[];
  Results: { series: BLSSeriesResult[] };
}

/**
 * Fetch one or more BLS time series.
 * Uses unauthenticated endpoint (daily limit: 25 series, 10 years).
 */
export async function fetchBLSSeries(
  seriesIds: string[],
  startYear: number,
  endYear: number
): Promise<BLSSeriesResult[]> {
  const body = {
    seriesid: seriesIds,
    startyear: String(startYear),
    endyear: String(endYear),
  };

  const response = await fetch(BLS_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`BLS API error: ${response.status}`);
  }

  const json: BLSResponse = await response.json();

  if (json.status !== 'REQUEST_SUCCEEDED') {
    throw new Error(`BLS request failed: ${json.message.join(', ')}`);
  }

  return json.Results.series;
}

// ─── Commonly used series IDs ─────────────────────────────────────────────

/** U-3 national unemployment rate (seasonally adjusted) */
export const SERIES_U3_NATIONAL = 'LNS14000000';

/** U-6 national unemployment rate (underemployment, seasonally adjusted) */
export const SERIES_U6_NATIONAL = 'LNS13327709';

/** CPI-U All items, not seasonally adjusted (for inflation adjustment) */
export const SERIES_CPI_U_ALL = 'CUUR0000SA0';

/** Median usual weekly earnings, full-time wage and salary workers */
export const SERIES_MEDIAN_WEEKLY_EARNINGS = 'LEU0252881600';

/** Employment-population ratio, 16 years and older */
export const SERIES_EPOP_RATIO = 'LNS12300000';

/**
 * Returns U-3 and U-6 for the past 5 years.
 */
export async function fetchUnemploymentRates(): Promise<{
  u3: BLSSeriesResult;
  u6: BLSSeriesResult;
}> {
  const endYear = new Date().getFullYear();
  const [u3, u6] = await fetchBLSSeries(
    [SERIES_U3_NATIONAL, SERIES_U6_NATIONAL],
    endYear - 4,
    endYear
  );
  return { u3, u6 };
}

/**
 * Returns the most recent annual CPI-U value for a given year.
 */
export async function fetchCPIForYear(year: number): Promise<number> {
  const [series] = await fetchBLSSeries([SERIES_CPI_U_ALL], year, year);
  const annual = series.data.find((d) => d.period === 'M13' || d.periodName === 'Annual');
  if (!annual) throw new Error(`No annual CPI data for ${year}`);
  return parseFloat(annual.value);
}
