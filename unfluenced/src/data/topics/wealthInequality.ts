/**
 * Topic: Wealth Inequality
 *
 * Dual-perspective framing:
 *   Concern A — "Wealth inequality is the natural result of merit and innovation"
 *   Concern B — "Wealth concentration undermines competition and social mobility"
 */

import type { Fact } from '../exclusionCriteria';

export const TOPIC_ID = 'wealth-inequality';
export const TOPIC_LABEL = 'Wealth & Income Inequality';
export const TOPIC_DESCRIPTION =
  'The distribution of wealth and income in the US — who has what, and what\'s changed.';

export const CONCERN_A_HEADER = 'Is wealth inequality simply the result of effort, risk-taking, and innovation?';
export const CONCERN_B_HEADER = 'Has wealth concentration reached a point that distorts opportunity and competition?';

export const FACTS: Fact[] = [
  {
    id: 'wi-top1-wealth-share',
    stat: 'Share of total US wealth held by the top 1%',
    unit: 'percent',
    value: 30.6,
    year: 2023,
    geographicScope: 'national',
    sourceId: 'fred',
    corroboratingSourceIds: ['census'],
    contextNote:
      'Federal Reserve DFA data. The top 1% holds more wealth than the entire bottom 90% combined. This ratio has widened since the 1980s when the top 1% held ~22%.',
    adjustedForInflation: false,
  },
  {
    id: 'wi-bottom50-wealth',
    stat: 'Share of total US wealth held by the bottom 50%',
    unit: 'percent',
    value: 2.5,
    year: 2023,
    geographicScope: 'national',
    sourceId: 'fred',
    corroboratingSourceIds: ['census'],
    contextNote:
      'The bottom 50% of Americans (~167 million people) collectively hold 2.5% of national wealth. In 1989 they held 4%. The decline correlates with wage stagnation, reduced pension access, and rising housing costs.',
    adjustedForInflation: false,
  },
  {
    id: 'wi-gini-trend',
    stat: 'US Gini coefficient (income inequality measure, 0=equal, 1=one person has all)',
    unit: 'index',
    value: 0.494,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'census',
    corroboratingSourceIds: ['fred'],
    contextNote:
      'US Gini of 0.494 is the highest among OECD peer nations. Germany: 0.319, Canada: 0.333, UK: 0.366. The US Gini has risen from 0.395 in 1970.',
    adjustedForInflation: false,
  },
  {
    id: 'wi-intergenerational-mobility',
    stat: 'Probability that a child born in the bottom income quintile reaches the top quintile as an adult',
    unit: 'percent',
    value: 7.5,
    year: 2018,
    geographicScope: 'national',
    sourceId: 'nber',
    corroboratingSourceIds: ['census'],
    contextNote:
      'Raj Chetty et al. (Opportunity Insights, Harvard). Upward mobility varies dramatically by geography — some US cities rival Denmark; many rural and urban areas have mobility rates near 4%. Denmark\'s equivalent rate: ~12%.',
    sampleSize: 20000000,
    pValue: 0.001,
    adjustedForInflation: false,
  },
  {
    id: 'wi-productivity-pay-gap',
    stat: 'Cumulative US productivity growth vs. median worker pay growth, 1979–2022',
    unit: 'percent',
    value: 0,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'bls',
    corroboratingSourceIds: ['fred'],
    contextNote:
      'Productivity: +64.6%. Median worker pay (inflation-adjusted): +17.3%. The gap between these two lines represents the divergence point where economic growth stopped translating equally to worker wages. (EPI, 2023; BLS data)',
    adjustedForInflation: true,
  },
  {
    id: 'wi-billionaire-growth-covid',
    stat: 'Change in collective net worth of US billionaires during COVID-19 pandemic (March 2020–Oct 2021)',
    unit: 'dollars',
    value: 1_800_000_000_000,
    year: 2021,
    geographicScope: 'national',
    sourceId: 'urban',
    corroboratingSourceIds: ['fred'],
    contextNote:
      'While 22 million Americans lost jobs in March-April 2020, US billionaire wealth grew by $1.8 trillion (54%) over 19 months. Asset ownership is the key variable: those who own stocks and real estate gained; those who own mainly labor income lost.',
    adjustedForInflation: false,
  },
  {
    id: 'wi-small-biz-share-decline',
    stat: 'Change in small business share of total US employment, 1990–2022',
    unit: 'percent',
    value: -8,
    year: 2022,
    geographicScope: 'national',
    sourceId: 'census',
    corroboratingSourceIds: ['bls'],
    contextNote:
      'Small businesses (under 500 employees) employed 53% of private workforce in 1990; 45% in 2022. Concentration in large firms correlates with reduced local competition and slower wage growth in affected sectors.',
    adjustedForInflation: false,
  },
];

export const MYTH_VS_FACT = [
  {
    id: 'mvf-wi-meritocracy',
    myth: 'In America, if you work hard enough, you can make it to the top',
    fact:
      'Chetty et al. (2018) found 7.5% of children from the bottom income quintile reach the top quintile. Parental wealth is the strongest single predictor of lifetime income — stronger than individual effort by measurable metrics.',
    sourceIds: ['nber', 'census'],
    year: 2018,
  },
  {
    id: 'mvf-wi-just-income',
    myth: 'Inequality is about income, not wealth',
    fact:
      'Wealth (assets minus liabilities) is more unequal than income. The top 1% holds 30.6% of national wealth but earns about 20% of income. Wealth compounds across generations; income does not.',
    sourceIds: ['fred', 'census'],
    year: 2023,
  },
];
