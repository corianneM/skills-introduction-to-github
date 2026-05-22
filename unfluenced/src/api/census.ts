/**
 * U.S. Census Bureau API
 * Free key: https://api.census.gov/data/key_signup.html
 */

import Constants from 'expo-constants';

const CENSUS_BASE = 'https://api.census.gov/data';

function getApiKey(): string {
  const key = Constants.expoConfig?.extra?.censusApiKey as string | undefined;
  if (!key) throw new Error('Census API key not configured. Add CENSUS_API_KEY to app.config.ts extra.');
  return key;
}

export type CensusRow = string[];

/**
 * Generic Census API fetch.
 * dataset: e.g. '2022/acs/acs1'
 * getVars: e.g. ['NAME','B19013_001E']
 * forClause: e.g. 'state:*' or 'county:*&in=state:06'
 */
export async function fetchCensus(
  dataset: string,
  getVars: string[],
  forClause: string,
  inClause?: string
): Promise<CensusRow[]> {
  const params = new URLSearchParams({
    get: getVars.join(','),
    for: forClause,
    key: getApiKey(),
    ...(inClause ? { in: inClause } : {}),
  });

  const response = await fetch(`${CENSUS_BASE}/${dataset}?${params}`);
  if (!response.ok) throw new Error(`Census API error: ${response.status}`);

  return response.json();
}

// ─── Helpers ──────────────────────────────────────────────────────────────

/**
 * Median household income by state (ACS 1-year).
 * Returns array of [state name, median income, state FIPS].
 */
export async function fetchMedianIncomeByState(year = 2022): Promise<CensusRow[]> {
  return fetchCensus(
    `${year}/acs/acs1`,
    ['NAME', 'B19013_001E'],
    'state:*'
  );
}

/**
 * Poverty rate by state.
 * B17001_002E = below poverty, B17001_001E = total for whom poverty determined
 */
export async function fetchPovertyByState(year = 2022): Promise<CensusRow[]> {
  return fetchCensus(
    `${year}/acs/acs1`,
    ['NAME', 'B17001_002E', 'B17001_001E'],
    'state:*'
  );
}

/**
 * Foreign-born population and labor force status by state.
 * B05002_013E = foreign-born total
 */
export async function fetchForeignBornByState(year = 2022): Promise<CensusRow[]> {
  return fetchCensus(
    `${year}/acs/acs1`,
    ['NAME', 'B05002_013E', 'B05002_001E'],
    'state:*'
  );
}

/**
 * Gross rent as % of household income (housing cost burden).
 * B25070_010E = paying 50%+ of income on rent
 * B25070_001E = total renter-occupied units
 */
export async function fetchHousingCostBurdenByState(year = 2022): Promise<CensusRow[]> {
  return fetchCensus(
    `${year}/acs/acs1`,
    ['NAME', 'B25070_010E', 'B25070_001E'],
    'state:*'
  );
}
