/**
 * Topic: Taxes & Fiscal Accountability
 *
 * Dual-perspective framing:
 *   Concern A — "Tax burden is too high and government wastes money"
 *   Concern B — "Wealthy individuals and corporations avoid their share"
 *
 * Effective rates only (not marginal). All dollar figures 2023-adjusted.
 */

import { ClaimType, type Fact } from '../exclusionCriteria';

export const TOPIC_ID = 'taxes';
export const TOPIC_LABEL = 'Taxes & Fiscal Accountability';
export const TOPIC_DESCRIPTION =
  'Who pays what, who avoids what, and where the money goes — with receipts.';

export const CONCERN_A_HEADER = 'Are taxes too high, and is government spending fiscally responsible?';
export const CONCERN_B_HEADER = 'Do wealthy individuals and corporations pay proportionally less than they appear to?';

export const FACTS: Fact[] = [
  // ─── Concern A ─────────────────────────────────────────────────────────

  {
    claimType: ClaimType.STATISTICAL,
    id: 'tax-total-fed-spending-gdp',
    stat: 'Federal spending as share of GDP',
    unit: 'percent of GDP',
    value: 24.2,
    year: 2023,
    geographicScope: 'national',
    sourceId: 'fred',
    corroboratingSourceIds: ['irs-soi'],
    contextNote:
      'Historical average since WWII is ~20%. Elevated post-COVID levels include pandemic relief spending. The non-emergency baseline is closer to 21–22%.',
    adjustedForInflation: false,
    rateType: 'effective',
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'tax-national-debt',
    stat: 'Federal debt held by public as share of GDP',
    unit: 'percent of GDP',
    value: 97,
    year: 2023,
    geographicScope: 'national',
    sourceId: 'fred',
    corroboratingSourceIds: ['bea'],
    contextNote:
      'This excludes intragovernmental debt (Social Security trust fund IOUs). Total gross debt is ~120% of GDP. Historical threshold economists debate is 90–100% for sustained drag on growth.',
    adjustedForInflation: false,
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'tax-top50-share',
    stat: 'Share of all federal income taxes paid by the top 50% of earners',
    unit: 'percent',
    value: 97.7,
    year: 2021,
    geographicScope: 'national',
    sourceId: 'irs-soi',
    corroboratingSourceIds: ['tax-foundation'],
    contextNote:
      'The bottom 50% earns roughly 10% of all income and pays about 2.3% of income taxes. Important: this refers to income taxes only — not payroll taxes (SS/Medicare), which are regressive. Bottom-half workers pay substantially more when total federal tax burden is counted.',
    adjustedForInflation: false,
    rateType: 'effective',
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'tax-regulatory-cost',
    stat: 'Estimated annual cost of federal regulation to US businesses',
    unit: 'dollars',
    value: 1_900_000_000_000,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'nber',
    corroboratingSourceIds: ['bea'],
    contextNote:
      'Regulatory cost estimates vary widely by methodology ($1.1T–$2.1T range). Smaller businesses bear proportionally higher compliance costs per employee than large corporations.',
    adjustedForInflation: true,
  },

  // ─── Concern B ─────────────────────────────────────────────────────────

  {
    claimType: ClaimType.STATISTICAL,
    id: 'tax-billionaire-effective-rate',
    stat: 'Estimated average effective federal tax rate paid by the 400 wealthiest Americans',
    unit: 'percent',
    value: 8.2,
    year: 2018,
    geographicScope: 'national',
    sourceId: 'nber',
    corroboratingSourceIds: ['irs-soi'],
    contextNote:
      'Economists Saez & Zucman (2019) include all taxes (income, payroll, corporate, estate). At that income level, most wealth growth is unrealized capital gains — which are not taxed until sold. Middle-income households pay ~25–30% all-in effective rate.',
    adjustedForInflation: false,
    rateType: 'effective',
    sampleSize: 400,
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'tax-corporate-effective-rate',
    stat: 'Average effective federal corporate tax rate paid by S&P 500 companies after deductions',
    unit: 'percent',
    value: 12.8,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'urban',
    corroboratingSourceIds: ['irs-soi'],
    contextNote:
      'Statutory rate is 21%. Effective rates are lowered by accelerated depreciation, R&D credits, offshore profit shifting, and carried interest. 55 profitable Fortune 500 companies paid $0 in federal income tax in 2020 (ITEP).',
    adjustedForInflation: false,
    rateType: 'effective',
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'tax-offshore-profit',
    stat: 'US corporate profits held in offshore accounts to defer US taxation',
    unit: 'dollars',
    value: 2_600_000_000_000,
    year: 2019,
    geographicScope: 'national',
    sourceId: 'fred',
    corroboratingSourceIds: ['bea'],
    contextNote:
      'The Tax Cuts and Jobs Act (2017) included a repatriation provision at a 15.5% rate. Pre-TCJA offshore holdings peaked at ~$2.6T. Offshore profit shifting is legal under current tax law.',
    adjustedForInflation: false,
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'tax-irs-audit-gap',
    stat: 'Estimated annual federal tax gap (taxes owed but not collected)',
    unit: 'dollars',
    value: 688_000_000_000,
    year: 2021,
    geographicScope: 'national',
    sourceId: 'irs-soi',
    corroboratingSourceIds: ['urban'],
    contextNote:
      'IRS estimates $688B/year goes uncollected. Audit rates for millionaires dropped 80% between 2012 and 2019 due to IRS budget cuts. W-2 wage income has a near-100% compliance rate (automatically reported); self-employment income compliance is ~45%.',
    adjustedForInflation: false,
  },
];

export const MYTH_VS_FACT = [
  {
    id: 'mvf-tax-half-pay-nothing',
    myth: 'Half of Americans pay no taxes',
    fact:
      'The bottom 50% pays little federal income tax, but they pay payroll taxes (Social Security/Medicare), state income taxes, sales taxes, and property taxes. Their all-in effective tax rate is typically 15–20%.',
    sourceIds: ['irs-soi', 'tax-foundation'],
    year: 2021,
  },
  {
    id: 'mvf-tax-rich-pay-more',
    myth: 'The rich pay the highest tax rates in the country',
    fact:
      'The top marginal income tax rate is 37%, but the ultra-wealthy pay effective rates of ~8% due to capital gains rates, deductions, and unrealized gain treatment. A teacher earning $60K pays a higher effective all-in rate than many billionaires.',
    sourceIds: ['irs-soi', 'nber'],
    year: 2022,
  },
];
