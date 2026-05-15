import type { RegisteredSource } from './exclusionCriteria';

/**
 * Tier 1 = Government statistical agencies (highest authority)
 * Tier 2 = Established non-partisan research institutions
 * Tier 3 = Ideologically positioned but produces primary data tables
 *          (use raw data only, never narrative conclusions)
 */
export const SOURCES: RegisteredSource[] = [
  // ─── Tier 1: Government ─────────────────────────────────────────────────
  {
    id: 'bls',
    name: 'Bureau of Labor Statistics',
    tier: 1,
    url: 'https://api.bls.gov/publicAPI/v2/',
    apiAvailable: true,
    notes: 'Employment, wages, CPI, inflation, industry data',
  },
  {
    id: 'census',
    name: 'U.S. Census Bureau',
    tier: 1,
    url: 'https://api.census.gov/data',
    apiAvailable: true,
    notes: 'Demographics, income, poverty, housing cost burden',
  },
  {
    id: 'fred',
    name: 'Federal Reserve Economic Data (FRED)',
    tier: 1,
    url: 'https://api.stlouisfed.org/fred/',
    apiAvailable: true,
    notes: 'GDP, interest rates, money supply, Gini coefficient, SNAP',
  },
  {
    id: 'bea',
    name: 'Bureau of Economic Analysis',
    tier: 1,
    url: 'https://apps.bea.gov/api/',
    apiAvailable: true,
    notes: 'GDP by state, personal income, industry output',
  },
  {
    id: 'cdc',
    name: 'CDC WONDER',
    tier: 1,
    url: 'https://wonder.cdc.gov/',
    apiAvailable: false,
    notes: 'Mortality, disease rates, health outcomes by county',
  },
  {
    id: 'irs-soi',
    name: 'IRS Statistics of Income',
    tier: 1,
    url: 'https://www.irs.gov/statistics/soi-tax-stats',
    apiAvailable: false,
    notes: 'Tax data by income bracket, filing status, state. Bulk CSV.',
  },
  {
    id: 'mit-living-wage',
    name: 'MIT Living Wage Calculator',
    tier: 1,
    url: 'https://livingwage.mit.edu/',
    apiAvailable: false,
    notes: 'Living wage by county and family composition',
  },
  {
    id: 'usda-ers',
    name: 'USDA Economic Research Service',
    tier: 1,
    url: 'https://www.ers.usda.gov/data-products/',
    apiAvailable: false,
    notes: 'Food insecurity, rural economics, farm income',
  },
  {
    id: 'cms',
    name: 'Centers for Medicare & Medicaid Services',
    tier: 1,
    url: 'https://data.cms.gov/',
    apiAvailable: true,
    notes: 'Healthcare spending, insurance coverage, Medicare/Medicaid costs',
  },

  // ─── Tier 2: Non-partisan research institutions ──────────────────────────
  {
    id: 'pew',
    name: 'Pew Research Center',
    tier: 2,
    url: 'https://www.pewresearch.org/',
    apiAvailable: false,
    notes: 'Public data files. Immigration, social attitudes, demographics.',
  },
  {
    id: 'kff',
    name: 'Kaiser Family Foundation',
    tier: 2,
    url: 'https://www.kff.org/',
    apiAvailable: false,
    notes: 'Healthcare costs, insurance coverage, Medicaid enrollment',
  },
  {
    id: 'mpi',
    name: 'Migration Policy Institute',
    tier: 2,
    url: 'https://www.migrationpolicy.org/',
    apiAvailable: false,
    notes: 'Immigration statistics, enforcement data, economic impact research',
  },
  {
    id: 'urban',
    name: 'Urban Institute',
    tier: 2,
    url: 'https://www.urban.org/',
    apiAvailable: false,
    notes: 'Poverty, housing, tax policy microsimulation',
  },
  {
    id: 'nber',
    name: 'National Bureau of Economic Research',
    tier: 2,
    url: 'https://www.nber.org/',
    apiAvailable: false,
    notes: 'Peer-reviewed working papers; free after 18 months',
  },

  // ─── Tier 3: Primary data tables only (use data, not conclusions) ────────
  {
    id: 'epi',
    name: 'Economic Policy Institute',
    tier: 3,
    url: 'https://www.epi.org/',
    apiAvailable: false,
    notes:
      'Left-leaning policy advocacy. Use raw wage and employment data tables only. Cross-verify with BLS.',
  },
  {
    id: 'tax-foundation',
    name: 'Tax Foundation',
    tier: 3,
    url: 'https://taxfoundation.org/',
    apiAvailable: false,
    notes:
      'Right-leaning tax policy advocacy. Use raw tax burden tables only. Cross-verify with IRS SOI.',
  },
];

export function getSourceById(id: string): RegisteredSource | undefined {
  return SOURCES.find((s) => s.id === id);
}

export function getTierLabel(tier: 1 | 2 | 3): string {
  switch (tier) {
    case 1: return 'Government Agency';
    case 2: return 'Non-Partisan Research';
    case 3: return 'Primary Data (verify independently)';
  }
}
