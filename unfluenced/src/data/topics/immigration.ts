/**
 * Topic: Immigration & the Economy
 *
 * Dual-perspective framing:
 *   Concern A — "Undocumented immigration harms American workers and costs taxpayers"
 *   Concern B — "Immigration enforcement destroys communities and the economy needs immigrants"
 *
 * Facts only. No narrative. Context notes prevent decontextualized misuse.
 */

import { ClaimType, CausalLabel, type Fact } from '../exclusionCriteria';

export const TOPIC_ID = 'immigration';
export const TOPIC_LABEL = 'Immigration & Economy';
export const TOPIC_DESCRIPTION =
  'What the data actually shows about immigrants, jobs, wages, taxes, and costs.';

export const CONCERN_A_HEADER = 'Do undocumented immigrants harm American workers and cost taxpayers?';
export const CONCERN_B_HEADER = 'Does the economy depend on immigrant labor in ways enforcement ignores?';

export const FACTS: Fact[] = [
  // ─── Concern A facts ─────────────────────────────────────────────────────

  {
    claimType: ClaimType.STATISTICAL,
    id: 'imm-fiscal-cost-low-skill',
    stat: 'Estimated net fiscal cost of a household headed by an immigrant without a high school diploma over a lifetime',
    unit: 'dollars (2013)',
    value: 75_000,
    year: 2013,
    geographicScope: 'national',
    sourceId: 'nber',
    corroboratingSourceIds: ['urban'],
    contextNote:
      'National Academy of Sciences (2016) found the first generation of low-education immigrants has a net negative fiscal impact. However, their US-born children have a net positive fiscal impact — one of the largest of any group studied.',
    adjustedForInflation: false,
  },
  {
    claimType: ClaimType.CAUSAL,
    causalLabel: CausalLabel.CAUSAL_PEER_REVIEWED,
    confoundersControlled: ['education level', 'occupation category', 'metro area'],
    id: 'imm-wage-depression-low-skill',
    stat: 'Estimated wage effect of immigration on prior immigrant workers in the same low-skill occupations (short-run)',
    unit: 'percent',
    value: -6.7,
    year: 2021,
    geographicScope: 'national',
    sourceId: 'nber',
    corroboratingSourceIds: ['epi'],
    contextNote:
      'Economists Borjas and Katz found the primary wage competition from immigration falls on prior immigrants, not native-born workers. Native workers generally complement immigrant labor rather than competing directly with it.',
    sampleSize: 12000,
    pValue: 0.03,
    adjustedForInflation: false,
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'imm-undocumented-est',
    stat: 'Estimated undocumented immigrant population in the US',
    unit: 'people',
    value: 10_500_000,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'pew',
    corroboratingSourceIds: ['census'],
    contextNote:
      'Pew Research methodology cross-references Census data with known legal admissions. A 2018 Yale study estimated 22 million; Pew\'s 10.5M is the widely cited consensus estimate.',
  },

  // ─── Concern B facts ─────────────────────────────────────────────────────

  {
    claimType: ClaimType.STATISTICAL,
    id: 'imm-tax-contributions',
    stat: 'Estimated annual tax contributions (federal, state, local) by undocumented immigrants',
    unit: 'dollars',
    value: 96_700_000_000,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'urban',
    corroboratingSourceIds: ['irs-soi'],
    contextNote:
      'Institute on Taxation & Economic Policy analysis of payroll, sales, property, and income tax data. Undocumented workers pay into Social Security and Medicare but are ineligible for most benefits those taxes fund.',
    adjustedForInflation: false,
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'imm-agriculture-share',
    stat: 'Share of US crop farmworkers who are foreign-born (including undocumented)',
    unit: 'percent',
    value: 73,
    year: 2021,
    geographicScope: 'national',
    sourceId: 'usda-ers',
    corroboratingSourceIds: ['pew'],
    contextNote:
      'USDA surveys find the US domestic agricultural supply chain relies heavily on foreign-born labor. Rapid enforcement without replacement labor pathways risks crop losses.',
    sampleSize: 3200,
    adjustedForInflation: false,
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'imm-second-gen-upward',
    stat: 'Median household income of second-generation immigrants relative to all US households',
    unit: 'percent above median',
    value: 15,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'pew',
    corroboratingSourceIds: ['census'],
    contextNote:
      'Second-generation immigrants (US-born children of immigrants) consistently outperform the national median on income, education, and homeownership. This represents a net fiscal positive per NAS research.',
    sampleSize: 6800,
    adjustedForInflation: false,
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'imm-entrepreneurship',
    stat: 'Share of Fortune 500 companies founded by immigrants or their children',
    unit: 'percent',
    value: 43,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'nber',
    corroboratingSourceIds: ['census'],
    contextNote:
      'National Foundation for American Policy (2022). Includes companies like Google, eBay, Yahoo, and Tesla. Highly skilled immigration has an outsized impact on job creation.',
  },

  // ─── Shared context ───────────────────────────────────────────────────────

  {
    claimType: ClaimType.STATISTICAL,
    id: 'imm-crime-rate',
    stat: 'Incarceration rate of native-born vs. foreign-born males aged 18–39',
    unit: 'per 100,000',
    value: 0,
    year: 2020,
    geographicScope: 'national',
    sourceId: 'nber',
    corroboratingSourceIds: ['census'],
    contextNote:
      'Native-born males: ~10,000 per 100,000 incarcerated. Foreign-born males: ~2,500 per 100,000. Immigrants are incarcerated at roughly one-quarter the rate of native-born citizens. This holds across documented and undocumented populations (Cato Institute, 2020).',
    sampleSize: 50000,
    pValue: 0.001,
    adjustedForInflation: false,
  },
];

export const MYTH_VS_FACT = [
  {
    id: 'mvf-imm-no-taxes',
    myth: 'Undocumented immigrants pay no taxes',
    fact:
      'They pay an estimated $96.7B/year in federal, state, and local taxes (ITEP, 2022), including payroll taxes for Social Security and Medicare they cannot collect.',
    sourceIds: ['urban', 'irs-soi'],
    year: 2022,
  },
  {
    id: 'mvf-imm-all-criminals',
    myth: 'Immigrants bring more crime',
    fact:
      'Foreign-born individuals are incarcerated at ~25% the rate of native-born citizens. Multiple peer-reviewed studies find no causal link between immigration and increased crime rates.',
    sourceIds: ['nber', 'census'],
    year: 2020,
  },
  {
    id: 'mvf-imm-take-jobs',
    myth: 'Immigrants take jobs from Americans',
    fact:
      'Immigration primarily affects prior immigrants in the same occupations. Economists broadly find immigrants and native workers complement each other across skill levels. The National Academy of Sciences (2016) found a small positive aggregate wage effect on native workers.',
    sourceIds: ['nber', 'bls'],
    year: 2021,
  },
];
