import { IdeologicalDirection, type RegisteredSource } from './exclusionCriteria';

/**
 * Tier 1 = Government statistical agencies (highest authority)
 * Tier 2 = Established non-partisan research institutions
 * Tier 3 = Ideologically positioned but produces primary data tables
 *          (use raw data only, never narrative conclusions)
 *
 * ideologicalDirection is used for the echo chamber check:
 * corroborating sources must span at least two different directions.
 * GOVERNMENT and ACADEMIC sources are direction-neutral.
 */
export const SOURCES: RegisteredSource[] = [
  // ─── Tier 1: Government ─────────────────────────────────────────────────
  {
    id: 'bls',
    name: 'Bureau of Labor Statistics',
    tier: 1,
    url: 'https://api.bls.gov/publicAPI/v2/',
    apiAvailable: true,
    ideologicalDirection: IdeologicalDirection.GOVERNMENT,
    notes: 'Employment, wages, CPI, inflation, industry data',
  },
  {
    id: 'census',
    name: 'U.S. Census Bureau',
    tier: 1,
    url: 'https://api.census.gov/data',
    apiAvailable: true,
    ideologicalDirection: IdeologicalDirection.GOVERNMENT,
    notes: 'Demographics, income, poverty, housing cost burden',
  },
  {
    id: 'fred',
    name: 'Federal Reserve Economic Data (FRED)',
    tier: 1,
    url: 'https://api.stlouisfed.org/fred/',
    apiAvailable: true,
    ideologicalDirection: IdeologicalDirection.GOVERNMENT,
    notes: 'GDP, interest rates, money supply, Gini coefficient, SNAP',
  },
  {
    id: 'bea',
    name: 'Bureau of Economic Analysis',
    tier: 1,
    url: 'https://apps.bea.gov/api/',
    apiAvailable: true,
    ideologicalDirection: IdeologicalDirection.GOVERNMENT,
    notes: 'GDP by state, personal income, industry output',
  },
  {
    id: 'cdc',
    name: 'CDC WONDER',
    tier: 1,
    url: 'https://wonder.cdc.gov/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.GOVERNMENT,
    notes: 'Mortality, disease rates, health outcomes by county',
  },
  {
    id: 'irs-soi',
    name: 'IRS Statistics of Income',
    tier: 1,
    url: 'https://www.irs.gov/statistics/soi-tax-stats',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.GOVERNMENT,
    notes: 'Tax data by income bracket, filing status, state. Bulk CSV.',
  },
  {
    id: 'mit-living-wage',
    name: 'MIT Living Wage Calculator',
    tier: 1,
    url: 'https://livingwage.mit.edu/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.ACADEMIC,
    notes: 'Living wage by county and family composition',
  },
  {
    id: 'usda-ers',
    name: 'USDA Economic Research Service',
    tier: 1,
    url: 'https://www.ers.usda.gov/data-products/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.GOVERNMENT,
    notes: 'Food insecurity, rural economics, farm income',
  },
  {
    id: 'cms',
    name: 'Centers for Medicare & Medicaid Services',
    tier: 1,
    url: 'https://data.cms.gov/',
    apiAvailable: true,
    ideologicalDirection: IdeologicalDirection.GOVERNMENT,
    notes: 'Healthcare spending, insurance coverage, Medicare/Medicaid costs',
  },

  // ─── Tier 1: Primary government legal records ────────────────────────────
  {
    id: 'scotus',
    name: 'U.S. Supreme Court (Official Opinions)',
    tier: 1,
    url: 'https://www.supremecourt.gov/opinions/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.GOVERNMENT,
    notes: 'Official Court opinions and orders. Primary source for all SCOTUS rulings and direct quotes from opinions.',
  },
  {
    id: 'cspan',
    name: 'C-SPAN Video Archive',
    tier: 1,
    url: 'https://www.c-span.org/congress/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.GOVERNMENT,
    notes: 'Unedited footage of congressional hearings, confirmation proceedings, floor debates. Primary source for Type C (quote) claims.',
  },
  {
    id: 'senate-jud',
    name: 'Senate Judiciary Committee (Official Transcripts)',
    tier: 1,
    url: 'https://www.judiciary.senate.gov/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.GOVERNMENT,
    notes: 'Official transcripts of confirmation hearings and committee proceedings. Primary record for all confirmation testimony.',
  },

  // ─── Tier 2: Non-partisan research institutions ──────────────────────────
  {
    id: 'pew',
    name: 'Pew Research Center',
    tier: 2,
    url: 'https://www.pewresearch.org/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.CENTER,
    notes: 'Public data files. Immigration, social attitudes, demographics.',
  },
  {
    id: 'kff',
    name: 'Kaiser Family Foundation',
    tier: 2,
    url: 'https://www.kff.org/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.CENTER,
    notes: 'Healthcare costs, insurance coverage, Medicaid enrollment',
  },
  {
    id: 'mpi',
    name: 'Migration Policy Institute',
    tier: 2,
    url: 'https://www.migrationpolicy.org/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.CENTER,
    notes: 'Immigration statistics, enforcement data, economic impact research',
  },
  {
    id: 'urban',
    name: 'Urban Institute',
    tier: 2,
    url: 'https://www.urban.org/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.CENTER_LEFT,
    notes: 'Poverty, housing, tax policy microsimulation',
  },
  {
    id: 'nber',
    name: 'National Bureau of Economic Research',
    tier: 2,
    url: 'https://www.nber.org/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.ACADEMIC,
    notes: 'Peer-reviewed working papers; free after 18 months',
  },

  {
    id: 'gallup',
    name: 'Gallup',
    tier: 2,
    url: 'https://news.gallup.com/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.CENTER,
    notes: 'Non-partisan polling organization. Approval ratings, public opinion trends. Minimum n=1,000.',
  },

  // ─── Tier 3: Primary data tables only (use data, not conclusions) ────────
  {
    id: 'epi',
    name: 'Economic Policy Institute',
    tier: 3,
    url: 'https://www.epi.org/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.LEFT,
    notes:
      'Left-leaning policy advocacy. Use raw wage and employment data tables only. Cross-verify with BLS.',
  },
  {
    id: 'tax-foundation',
    name: 'Tax Foundation',
    tier: 3,
    url: 'https://taxfoundation.org/',
    apiAvailable: false,
    ideologicalDirection: IdeologicalDirection.RIGHT,
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

export function getDirectionLabel(dir: IdeologicalDirection): string {
  switch (dir) {
    case IdeologicalDirection.GOVERNMENT: return 'U.S. Government';
    case IdeologicalDirection.ACADEMIC:   return 'Academic / Peer-Reviewed';
    case IdeologicalDirection.CENTER:     return 'Non-Partisan';
    case IdeologicalDirection.CENTER_LEFT: return 'Center-Left';
    case IdeologicalDirection.CENTER_RIGHT: return 'Center-Right';
    case IdeologicalDirection.LEFT:       return 'Left-Leaning';
    case IdeologicalDirection.RIGHT:      return 'Right-Leaning';
  }
}
