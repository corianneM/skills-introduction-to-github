/**
 * Topic: Healthcare Costs & Access
 *
 * Dual-perspective framing:
 *   Concern A — "Government intervention drives up costs and reduces quality"
 *   Concern B — "The market fails to provide affordable access to basic care"
 */

import { ClaimType, type Fact } from '../exclusionCriteria';

export const TOPIC_ID = 'healthcare';
export const TOPIC_LABEL = 'Healthcare Costs & Access';
export const TOPIC_DESCRIPTION =
  'What Americans pay, what they get, and how that compares — by the numbers.';

export const CONCERN_A_HEADER = 'Does government involvement drive up healthcare costs and reduce efficiency?';
export const CONCERN_B_HEADER = 'Does the US market-based system fail to deliver affordable care?';

export const FACTS: Fact[] = [
  // ─── Concern A ─────────────────────────────────────────────────────────

  {
    claimType: ClaimType.STATISTICAL,
    id: 'hc-admin-cost-private',
    stat: 'Administrative costs as share of total spending in US private insurance',
    unit: 'percent',
    value: 34.2,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'kff',
    corroboratingSourceIds: ['cms'],
    contextNote:
      'High administrative costs in US private insurance are partly attributed to the complexity of multi-payer billing. Medicare administrative overhead is ~2%. Peer nations average ~12% across all payers.',
    adjustedForInflation: false,
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'hc-medicaid-fraud',
    stat: 'Estimated improper Medicaid payment rate',
    unit: 'percent',
    value: 15.6,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'cms',
    corroboratingSourceIds: ['urban'],
    contextNote:
      'CMS defines "improper payment" as any payment not made per statutory, regulatory, or administrative requirements — this includes documentation errors and billing mistakes, not only fraud. Estimated fraud specifically is a smaller subset (~3–5%).',
    adjustedForInflation: false,
  },

  // ─── Concern B ─────────────────────────────────────────────────────────

  {
    claimType: ClaimType.STATISTICAL,
    id: 'hc-per-capita-spend',
    stat: 'US per capita healthcare spending vs. peer nation average',
    unit: 'dollars',
    value: 12_555,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'cms',
    corroboratingSourceIds: ['kff'],
    contextNote:
      'US spends $12,555 per person annually. Germany spends ~$7,300; Canada ~$5,900; UK ~$5,100. The US does not lead these nations in life expectancy, infant mortality, or chronic disease rates.',
    adjustedForInflation: false,
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'hc-medical-bankruptcy',
    stat: 'Share of US personal bankruptcies with medical debt as a contributing factor',
    unit: 'percent',
    value: 66.5,
    year: 2019,
    geographicScope: 'national',
    sourceId: 'nber',
    corroboratingSourceIds: ['kff'],
    contextNote:
      'American Journal of Public Health (2019). Medical bankruptcy is essentially non-existent in Canada, UK, Germany, and Australia. This is the most significant difference between US and peer-nation healthcare systems.',
    sampleSize: 910,
    pValue: 0.01,
    adjustedForInflation: false,
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'hc-uninsured-rate',
    stat: 'Share of Americans under 65 who are uninsured',
    unit: 'percent',
    value: 10.2,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'census',
    corroboratingSourceIds: ['kff'],
    contextNote:
      'Post-ACA rate down from 18% in 2013. States that expanded Medicaid have significantly lower uninsured rates than non-expansion states. Rural areas have the highest uninsured concentrations.',
    adjustedForInflation: false,
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'hc-insulin-cost',
    stat: 'Average US out-of-pocket cost for a month of insulin vs. Canada',
    unit: 'dollars',
    value: 98.70,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'kff',
    corroboratingSourceIds: ['nber'],
    contextNote:
      'US: ~$98.70/month average out-of-pocket. Canada: ~$8/month. Identical products, manufactured by the same companies. Price difference attributed to lack of government drug price negotiation in the US and patent extension practices.',
    adjustedForInflation: false,
  },
];

export const MYTH_VS_FACT = [
  {
    id: 'mvf-hc-best-in-world',
    myth: 'The US has the best healthcare in the world',
    fact:
      'The US ranks 1st in healthcare spending but 28th in life expectancy among OECD nations (2022). It ranks last among 11 peer nations on overall healthcare system performance (Commonwealth Fund, 2021).',
    sourceIds: ['kff', 'cms'],
    year: 2022,
  },
  {
    id: 'mvf-hc-free-market',
    myth: 'Healthcare in the US is a free market',
    fact:
      'The US government pays 45% of all healthcare spending (Medicare, Medicaid, VA, CHIP). Hospitals are heavily regulated nonprofits. Drug patents are government-granted monopolies. The US system is a hybrid, not a free market.',
    sourceIds: ['cms', 'kff'],
    year: 2022,
  },
];
