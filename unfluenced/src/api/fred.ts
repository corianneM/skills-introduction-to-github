/**
 * Federal Reserve Economic Data (FRED) API
 * Free API key required: https://fred.stlouisfed.org/docs/api/api_key.html
 * Key is stored in app config / env — never hardcoded.
 */

import Constants from 'expo-constants';

const FRED_BASE = 'https://api.stlouisfed.org/fred/series/observations';

function getApiKey(): string {
  const key = Constants.expoConfig?.extra?.fredApiKey as string | undefined;
  if (!key) throw new Error('FRED API key not configured. Add FRED_API_KEY to app.config.ts extra.');
  return key;
}

export interface FREDObservation {
  date: string;  // YYYY-MM-DD
  value: string; // '.' means missing
}

export async function fetchFREDSeries(
  seriesId: string,
  observationStart?: string,
  observationEnd?: string,
  frequency?: 'a' | 'q' | 'm'  // annual, quarterly, monthly
): Promise<FREDObservation[]> {
  const params = new URLSearchParams({
    series_id: seriesId,
    api_key: getApiKey(),
    file_type: 'json',
    ...(observationStart ? { observation_start: observationStart } : {}),
    ...(observationEnd ? { observation_end: observationEnd } : {}),
    ...(frequency ? { frequency } : {}),
  });

  const response = await fetch(`${FRED_BASE}?${params}`);
  if (!response.ok) throw new Error(`FRED API error: ${response.status}`);

  const json = await response.json();
  return (json.observations as FREDObservation[]).filter((o) => o.value !== '.');
}

// ─── Key series IDs ───────────────────────────────────────────────────────

/** US Gini coefficient (income inequality) — annual */
export const SERIES_GINI = 'SIPOVGINIUSA';

/** Real GDP growth rate — quarterly */
export const SERIES_REAL_GDP = 'GDPC1';

/** Federal debt as % of GDP */
export const SERIES_DEBT_TO_GDP = 'GFDEGDQ188S';

/** SNAP (food stamp) participants — monthly */
export const SERIES_SNAP_PARTICIPANTS = 'SNAPAll';

/** Labor force participation rate */
export const SERIES_LFPR = 'CIVPART';

/** Real median household income */
export const SERIES_MEDIAN_HOUSEHOLD_INCOME = 'MEHOINUSA672N';

/** Corporate profits after tax */
export const SERIES_CORPORATE_PROFITS = 'CP';

/** Manufacturing employment */
export const SERIES_MANUFACTURING_EMPLOYMENT = 'MANEMP';

export async function fetchGiniCoefficient(): Promise<FREDObservation[]> {
  const endYear = new Date().getFullYear() - 1;
  return fetchFREDSeries(SERIES_GINI, `${endYear - 9}-01-01`, `${endYear}-12-31`, 'a');
}

export async function fetchLaborForceParticipation(): Promise<FREDObservation[]> {
  const endYear = new Date().getFullYear();
  return fetchFREDSeries(SERIES_LFPR, `${endYear - 4}-01-01`, undefined, 'm');
}

export async function fetchManufacturingEmployment(): Promise<FREDObservation[]> {
  return fetchFREDSeries(SERIES_MANUFACTURING_EMPLOYMENT, '1990-01-01', undefined, 'a');
}
