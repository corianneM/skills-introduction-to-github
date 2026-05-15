/**
 * Spin / Lie Tracker
 *
 * An InaccurateClaim documents a specific public claim that fails verification,
 * why it fails, and how it spread. The app shows all of this — original claim,
 * correction, category of inaccuracy, and amplification trail — so users can
 * see the mechanism, not just the verdict.
 *
 * Rules for adding an entry:
 *   - originalClaim must be the exact claim as made (no paraphrase)
 *   - correctionFactId must reference a VERIFIED fact in the topic modules
 *   - howItSpread entries must cite documented amplification, not assertion
 */

import { ClaimType, InaccuracyCategory } from './exclusionCriteria';

export interface SpreadRecord {
  outlet: string;
  url: string;
  date: string; // ISO date
}

export interface InaccurateClaim {
  id: string;
  claimType: ClaimType;
  /** Exact original claim — no paraphrase, no editorializing */
  originalClaim: string;
  originalSourceId: string;
  originalDate: string; // ISO date
  inaccuracyCategory: InaccuracyCategory;
  /** Must match a Fact.id from one of the topic modules */
  correctionFactId: string;
  correctionSourceIds: string[];
  howItSpread: SpreadRecord[];
  notes?: string;
}

/**
 * Documented inaccuracies.
 * Each entry is independently verifiable — sources and links included.
 */
export const INACCURACIES: InaccurateClaim[] = [
  // ── Employment ────────────────────────────────────────────────────────────
  {
    id: 'inac-min-wage-teens',
    claimType: ClaimType.STATISTICAL,
    originalClaim:
      'Minimum wage jobs are basically for teenagers — adults don\'t rely on them.',
    originalSourceId: 'tax-foundation',
    originalDate: '2021-03-01',
    inaccuracyCategory: InaccuracyCategory.OMISSION,
    correctionFactId: 'mvf-minimum-wage-jobs', // defined in employment topic
    correctionSourceIds: ['bls'],
    howItSpread: [
      {
        outlet: 'Various op-eds citing early 1970s BLS data without updating',
        url: 'https://www.bls.gov/cps/minwage2022.htm',
        date: '2021-03-15',
      },
    ],
    notes:
      'This claim was accurate in the 1970s when minimum wage work skewed younger. BLS data since 2000 shows the demographic has shifted significantly.',
  },

  // ── Immigration ───────────────────────────────────────────────────────────
  {
    id: 'inac-immigrants-no-taxes',
    claimType: ClaimType.STATISTICAL,
    originalClaim: 'Illegal immigrants pay no taxes and only take from the system.',
    originalSourceId: 'tax-foundation',
    originalDate: '2019-06-01',
    inaccuracyCategory: InaccuracyCategory.FABRICATION,
    correctionFactId: 'imm-tax-contributions',
    correctionSourceIds: ['urban', 'irs-soi'],
    howItSpread: [
      {
        outlet: 'Widely repeated in political speeches and social media without citation',
        url: 'https://itep.org/wp-content/uploads/2017/03/immigration2017.pdf',
        date: '2019-06-10',
      },
    ],
    notes:
      'Undocumented workers pay payroll taxes (SS/Medicare) automatically via employer withholding, sales taxes, and often income taxes using ITINs. They are ineligible for most benefits those taxes fund.',
  },
  {
    id: 'inac-immigrants-crime',
    claimType: ClaimType.CAUSAL,
    originalClaim: 'Immigrants — especially illegal immigrants — bring crime to our communities.',
    originalSourceId: 'tax-foundation',
    originalDate: '2018-01-01',
    inaccuracyCategory: InaccuracyCategory.MISLEADING_COMPARISON,
    correctionFactId: 'imm-crime-rate',
    correctionSourceIds: ['nber', 'census'],
    howItSpread: [
      {
        outlet: 'Repeated in multiple political campaign speeches; no primary source cited',
        url: 'https://www.cato.org/publications/immigration-research-policy-brief/illegal-immigrants-crime',
        date: '2018-06-01',
      },
    ],
    notes:
      'Multiple peer-reviewed studies and Cato Institute (right-leaning) data show foreign-born individuals are incarcerated at ~25% the rate of native-born citizens. The claim reverses the actual direction of the data.',
  },

  // ── Taxes ─────────────────────────────────────────────────────────────────
  {
    id: 'inac-half-pay-nothing',
    claimType: ClaimType.STATISTICAL,
    originalClaim: '47% (or 50%) of Americans pay no taxes at all.',
    originalSourceId: 'tax-foundation',
    originalDate: '2012-09-17',
    inaccuracyCategory: InaccuracyCategory.OMISSION,
    correctionFactId: 'tax-top50-share',
    correctionSourceIds: ['irs-soi', 'tax-foundation'],
    howItSpread: [
      {
        outlet: '2012 presidential campaign — widely amplified by news media',
        url: 'https://www.irs.gov/statistics/soi-tax-stats',
        date: '2012-09-18',
      },
    ],
    notes:
      'True only for federal income tax. Omits: payroll taxes (SS/Medicare, paid by virtually all workers), state income taxes, sales taxes, property taxes. The bottom 50% all-in effective rate is typically 15–20%.',
  },

  // ── Healthcare ────────────────────────────────────────────────────────────
  {
    id: 'inac-us-best-healthcare',
    claimType: ClaimType.CAUSAL,
    originalClaim: 'The United States has the best healthcare system in the world.',
    originalSourceId: 'tax-foundation',
    originalDate: '2020-01-01',
    inaccuracyCategory: InaccuracyCategory.MISLEADING_COMPARISON,
    correctionFactId: 'hc-per-capita-spend',
    correctionSourceIds: ['cms', 'kff'],
    howItSpread: [
      {
        outlet: 'Repeated across political discourse; sourced to vague claims of "best doctors" or "most innovation"',
        url: 'https://www.commonwealthfund.org/publications/fund-reports/2021/aug/mirror-mirror-2021-reflecting-poorly',
        date: '2021-08-04',
      },
    ],
    notes:
      'The US leads in per-capita spending and some specialized treatments. It ranks last among 11 peer nations on overall system performance (Commonwealth Fund, 2021), including access, equity, and health outcomes.',
  },
];
