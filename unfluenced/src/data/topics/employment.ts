/**
 * Topic: Employment, Labor Force & Government Benefits
 *
 * Dual-perspective framing:
 *   Concern A — "Too many people depend on government instead of working"
 *   Concern B — "The economy doesn't create enough jobs that pay a living wage"
 *
 * All facts are curated from Tier 1 or Tier 2 sources only.
 * Dollar figures are CPI-adjusted to 2023 dollars unless noted.
 */

import type { Fact } from '../exclusionCriteria';

export const TOPIC_ID = 'employment';
export const TOPIC_LABEL = 'Employment & Benefits';
export const TOPIC_DESCRIPTION =
  'Labor force participation, wages, benefit use, and who works — by the numbers.';

export const CONCERN_A_HEADER = 'Are too many people choosing benefits over work?';
export const CONCERN_B_HEADER = 'Does the economy offer enough jobs that actually pay the bills?';

export const FACTS: Fact[] = [
  // ─── Concern A facts ─────────────────────────────────────────────────────

  {
    id: 'emp-lfpr-prime-age',
    stat: 'Prime-age labor force participation rate (ages 25–54)',
    unit: 'percent',
    value: 83.6,
    year: 2023,
    geographicScope: 'national',
    sourceId: 'bls',
    corroboratingSourceIds: ['fred'],
    contextNote:
      'Prime-age LFPR excludes students and retirees. The 16.4% not participating includes caregivers, disabled individuals, and those discouraged from seeking work — not only voluntary non-participants.',
    adjustedForInflation: false,
  },
  {
    id: 'emp-snap-work-requirements',
    stat: 'Share of able-bodied adults without dependents (ABAWDs) who lost SNAP when work requirements enforced',
    unit: 'percent',
    value: 53,
    year: 2019,
    geographicScope: 'national',
    sourceId: 'usda-ers',
    corroboratingSourceIds: ['urban'],
    contextNote:
      'A USDA study found 53% of ABAWDs subject to work requirements lost benefits. Of those, roughly half found employment; the other half lost benefits without gaining income.',
    sampleSize: 4200,
    adjustedForInflation: false,
  },
  {
    id: 'emp-median-snap-duration',
    stat: 'Median duration of a SNAP spell (continuous enrollment)',
    unit: 'months',
    value: 8,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'usda-ers',
    corroboratingSourceIds: ['census'],
    contextNote:
      'Most SNAP recipients use the program short-term during hardship. Roughly 20% are long-term recipients (3+ years) — a smaller share than common perception suggests.',
  },
  {
    id: 'emp-disability-rolls',
    stat: 'SSDI (Social Security Disability Insurance) enrollment as share of working-age adults',
    unit: 'percent',
    value: 5.0,
    year: 2023,
    geographicScope: 'national',
    sourceId: 'fred',
    corroboratingSourceIds: ['irs-soi'],
    contextNote:
      'SSDI requires a documented medical condition preventing substantial gainful activity. Application denial rate is ~67%. Fraud rate is estimated at under 1% by SSA OIG.',
  },

  // ─── Concern B facts ─────────────────────────────────────────────────────

  {
    id: 'emp-living-wage-gap',
    stat: 'Gap between federal minimum wage ($7.25) and MIT living wage for a single adult (national median)',
    unit: 'dollars per hour',
    value: 9.43,
    year: 2023,
    geographicScope: 'national',
    sourceId: 'mit-living-wage',
    corroboratingSourceIds: ['bls'],
    contextNote:
      'MIT living wage for a single adult with no children is $16.68/hr nationally. Federal minimum wage is $7.25/hr — unchanged since 2009. 30 states have higher state minimums.',
    adjustedForInflation: true,
  },
  {
    id: 'emp-real-wage-stagnation',
    stat: 'Change in real (inflation-adjusted) median weekly earnings for full-time workers, 1979–2023',
    unit: 'percent',
    value: 15.3,
    year: 2023,
    geographicScope: 'national',
    sourceId: 'bls',
    corroboratingSourceIds: ['fred'],
    contextNote:
      'Productivity grew 65% over the same period. The gap between productivity growth and wage growth reflects a shift in how economic gains are distributed.',
    adjustedForInflation: true,
  },
  {
    id: 'emp-u6-underemployment',
    stat: 'U-6 underemployment rate (includes part-time workers who want full-time, and discouraged workers)',
    unit: 'percent',
    value: 7.4,
    year: 2023,
    geographicScope: 'national',
    sourceId: 'bls',
    corroboratingSourceIds: ['fred'],
    contextNote:
      'U-3 (headline) unemployment was 3.7% in 2023. U-6 is double that. The gap represents workers who are employed but structurally underutilized.',
    unemploymentMeasure: 'U6',
    adjustedForInflation: false,
  },
  {
    id: 'emp-gig-no-benefits',
    stat: 'Share of workers in alternative work arrangements (gig, contract, temp) with no employer-provided health insurance',
    unit: 'percent',
    value: 78,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'bls',
    corroboratingSourceIds: ['kff'],
    contextNote:
      'These workers "have jobs" by U-3 measures but lack the stability and benefits of traditional employment. Many simultaneously qualify for means-tested benefits.',
    sampleSize: 6500,
    adjustedForInflation: false,
  },

  // ─── Shared / contextual ─────────────────────────────────────────────────

  {
    id: 'emp-working-poor',
    stat: 'Number of US workers in poverty despite working full-time year-round',
    unit: 'people',
    value: 6_300_000,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'census',
    corroboratingSourceIds: ['bls'],
    contextNote:
      'The "working poor" — people who spent at least 27 weeks in the labor force but remained below the poverty line. Work alone does not guarantee income above the poverty threshold in many US labor markets.',
    adjustedForInflation: false,
  },
  {
    id: 'emp-manufacturing-job-loss',
    stat: 'Net manufacturing jobs lost in the US, 2000–2010',
    unit: 'jobs',
    value: 5_800_000,
    year: 2010,
    geographicScope: 'national',
    sourceId: 'fred',
    corroboratingSourceIds: ['bls'],
    contextNote:
      'Economic research attributes roughly 1.5–2.0 million losses to NAFTA/trade policy and 2.5–3.0 million to automation and productivity gains. Both factors are real and often falsely separated in political debate.',
    adjustedForInflation: false,
  },
];

export const MYTH_VS_FACT = [
  {
    id: 'mvf-welfare-cliff',
    myth: 'People stay on welfare because they make more money not working',
    fact: 'The "benefits cliff" is real in some income ranges — marginal effective tax rates can exceed 80% as benefits phase out — but the median SNAP spell is 8 months. The cliff is a design flaw in the benefit system, not evidence of widespread preference for dependency.',
    sourceIds: ['usda-ers', 'urban', 'bls'],
    year: 2022,
  },
  {
    id: 'mvf-minimum-wage-jobs',
    myth: 'Minimum wage jobs are just for teenagers',
    fact:
      'Per BLS (2022), 50.6% of minimum-wage workers are 25 or older. 28% are the sole earner in their household.',
    sourceIds: ['bls'],
    year: 2022,
  },
];
