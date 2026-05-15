/**
 * Unfluenced — Truth Verification Framework
 *
 * Every claim is classified by type before any other rule applies.
 * The type determines which rules govern it.
 *
 * Trust levels (what users see):
 *   VERIFIED     — primary source + ideologically independent corroboration + full context
 *   SUPPORTED    — strong primary source; corroboration from one ideological direction only
 *   DISPUTED     — credible sources on both sides disagree; both shown
 *   INACCURATE   — wrong, exaggerated, or misleading; shown with correction + how it spread
 *   UNVERIFIABLE — cannot be independently confirmed; excluded from primary content
 */

// ─── Claim taxonomy ──────────────────────────────────────────────────────────

export enum ClaimType {
  /** A number, rate, or percentage from measured data */
  STATISTICAL = 'STATISTICAL',
  /** X caused Y — requires peer-reviewed evidence; labeled precisely */
  CAUSAL = 'CAUSAL',
  /** What a specific person or entity said — requires primary recording or transcript */
  QUOTE = 'QUOTE',
  /** Something that happened — requires contemporary documentation */
  EVENT = 'EVENT',
}

// ─── Trust levels ─────────────────────────────────────────────────────────────

export enum TrustLevel {
  VERIFIED = 'VERIFIED',
  SUPPORTED = 'SUPPORTED',
  DISPUTED = 'DISPUTED',
  INACCURATE = 'INACCURATE',
  UNVERIFIABLE = 'UNVERIFIABLE',
}

// ─── Causal labels (Type B only) ─────────────────────────────────────────────

export enum CausalLabel {
  /** Two things move together; cause not established */
  CORRELATION = 'CORRELATION_OBSERVED',
  /** Established in a peer-reviewed study with stated methodology */
  CAUSAL_PEER_REVIEWED = 'CAUSAL_LINK_PEER_REVIEWED',
  /** Peer-reviewed studies reach conflicting conclusions */
  CAUSAL_DISPUTED = 'CAUSAL_LINK_DISPUTED',
}

// ─── Evidence hierarchy (Type B causal claims) ───────────────────────────────
//
// Gold standard is Level 2: double-blind, placebo-controlled RCT.
// Level 1 (meta-analysis of RCTs) is higher only because it aggregates
// multiple independent Level 2 studies.
// Anything below Level 3 cannot achieve VERIFIED status on its own.

export enum EvidenceLevel {
  /** Systematic review or meta-analysis of multiple independent RCTs */
  L1_META_ANALYSIS = 1,
  /** Double-blind, placebo-controlled randomized controlled trial (RCT) — gold standard */
  L2_RCT = 2,
  /** Cohort study (prospective or retrospective) */
  L3_COHORT = 3,
  /** Case-control study */
  L4_CASE_CONTROL = 4,
  /** Cross-sectional or observational study */
  L5_OBSERVATIONAL = 5,
  /** Expert opinion, case report, or anecdote */
  L6_OPINION = 6,
}

export const EVIDENCE_LEVEL_LABEL: Record<EvidenceLevel, string> = {
  [EvidenceLevel.L1_META_ANALYSIS]: 'Meta-analysis of RCTs',
  [EvidenceLevel.L2_RCT]: 'Randomized Controlled Trial (double-blind)',
  [EvidenceLevel.L3_COHORT]: 'Cohort Study',
  [EvidenceLevel.L4_CASE_CONTROL]: 'Case-Control Study',
  [EvidenceLevel.L5_OBSERVATIONAL]: 'Observational / Cross-sectional Study',
  [EvidenceLevel.L6_OPINION]: 'Expert Opinion / Case Report',
};

/** Minimum evidence level that can achieve VERIFIED status */
export const MIN_VERIFIED_EVIDENCE_LEVEL = EvidenceLevel.L2_RCT;

/** Minimum evidence level admissible at all (SUPPORTED floor) */
export const MIN_ADMISSIBLE_EVIDENCE_LEVEL = EvidenceLevel.L4_CASE_CONTROL;

// ─── Replication status ───────────────────────────────────────────────────────

export enum ReplicationStatus {
  /** Independently replicated by a different team with no shared funding */
  INDEPENDENTLY_REPLICATED = 'INDEPENDENTLY_REPLICATED',
  /** Not yet replicated; original study only */
  SINGLE_STUDY = 'SINGLE_STUDY',
  /** Replication attempts produced conflicting results */
  REPLICATION_FAILED = 'REPLICATION_FAILED',
  /** Pre-registered study; replication status pending */
  PRE_REGISTERED_PENDING = 'PRE_REGISTERED_PENDING',
}

// ─── Inaccuracy categories (INACCURATE claims only) ──────────────────────────

export enum InaccuracyCategory {
  /** Directionally correct but quantitatively overstated */
  EXAGGERATION = 'EXAGGERATION',
  /** True for the cherry-picked period, false overall */
  SELECTIVE_TIMEFRAME = 'SELECTIVE_TIMEFRAME',
  /** Comparing incomparable things */
  MISLEADING_COMPARISON = 'MISLEADING_COMPARISON',
  /** Technically true but missing context that reverses meaning */
  OMISSION = 'OMISSION',
  /** Not supported by any credible evidence */
  FABRICATION = 'FABRICATION',
  /** Real quote or stat, attributed to wrong person/source */
  MISATTRIBUTION = 'MISATTRIBUTION',
  /** Satirical/humorous content presented as sincere */
  TONE_MANIPULATION = 'TONE_MANIPULATION',
}

// ─── Ideological direction (for echo chamber detection) ──────────────────────

export enum IdeologicalDirection {
  LEFT = 'LEFT',
  CENTER_LEFT = 'CENTER_LEFT',
  CENTER = 'CENTER',
  CENTER_RIGHT = 'CENTER_RIGHT',
  RIGHT = 'RIGHT',
  /** Federal/state government statistical agencies — no political direction */
  GOVERNMENT = 'GOVERNMENT',
  /** Peer-reviewed academic institutions — no political direction */
  ACADEMIC = 'ACADEMIC',
}

// ─── Source tier ──────────────────────────────────────────────────────────────

export type SourceTier = 1 | 2 | 3;

export interface RegisteredSource {
  id: string;
  name: string;
  tier: SourceTier;
  url: string;
  apiAvailable: boolean;
  ideologicalDirection: IdeologicalDirection;
  notes?: string;
}

// ─── Fact interface ───────────────────────────────────────────────────────────

export interface Fact {
  id: string;
  claimType: ClaimType;
  stat: string;
  unit: string;
  value: number | string;
  year: number;
  geographicScope: 'national' | 'state' | 'county' | 'metro';
  sourceId: string;
  corroboratingSourceIds: string[];

  // Statistical (Type A)
  adjustedForInflation?: boolean;
  sampleSize?: number;
  pValue?: number;
  unemploymentMeasure?: 'U3' | 'U6';
  rateType?: 'effective' | 'marginal';

  // Causal (Type B)
  causalLabel?: CausalLabel;
  evidenceLevel?: EvidenceLevel;
  replicationStatus?: ReplicationStatus;
  /** Effect size value — required alongside p-value for causal claims */
  effectSize?: number;
  /** Unit of effect size — e.g. "Cohen's d", "odds ratio", "percentage points" */
  effectSizeUnit?: string;
  confoundersControlled?: string[];
  confoundersNotControlled?: string[];

  // Funding / conflict of interest (applies to all study-backed claims)
  /** Who funded the study */
  fundingSource?: string;
  /**
   * True if the funder has a direct financial interest in a positive result.
   * Triggers automatic downgrade: SUPPORTED ceiling, never VERIFIED alone.
   */
  funderHasFinancialInterest?: boolean;

  // Quote (Type C)
  primaryRecordingUrl?: string;
  toneFlag?: string; // e.g. "Speaker claimed humorous intent"
  isDirectQuote?: boolean;
  deepfakeRisk?: boolean;

  // Shared
  contextNote?: string;
}

// ─── Inaccurate claim (spin tracker) ─────────────────────────────────────────

export interface InaccurateClaim {
  id: string;
  claimType: ClaimType;
  /** Exact original claim — no paraphrase */
  originalClaim: string;
  originalSourceId: string;
  originalDate: string; // ISO date
  inaccuracyCategory: InaccuracyCategory;
  /** ID of the verified Fact that corrects this claim */
  correctionFactId: string;
  correctionSourceIds: string[];
  /** Outlets/platforms that amplified the inaccuracy (documented, not asserted) */
  howItSpread: { outlet: string; url: string; date: string }[];
  notes?: string;
}

// ─── Thresholds ───────────────────────────────────────────────────────────────

export const MIN_SAMPLE_SIZE = 1000;
export const MAX_DATA_AGE_YEARS = 5;
export const SIGNIFICANCE_THRESHOLD = 0.05;

// ─── Disqualified source patterns ────────────────────────────────────────────

export const DISQUALIFIED_SOURCE_PATTERNS: string[] = [
  'mediamatters',
  'breitbart',
  'dailykos',
  'infowars',
  'huffpost.com/opinion',
  'foxnews.com/opinion',
  'msnbc.com/opinion',
  'townhall.com',
  'motherjones',
  'dailywire',
  'vox.com',
  'thefederalist',
  'jacobin',
  'prager',
];

// ─── Validation ───────────────────────────────────────────────────────────────

export interface ValidationResult {
  pass: boolean;
  trustLevel: TrustLevel;
  failures: string[];
  warnings: string[];
}

/**
 * Echo chamber check: corroborating sources must include at least one source
 * whose ideologicalDirection differs from the primary source's direction.
 * GOVERNMENT and ACADEMIC sources are direction-neutral and count as distinct
 * from any partisan direction.
 */
function hasIdeologicallyDiverseCorroboration(
  primarySource: RegisteredSource,
  corroboratingSourceIds: string[],
  allSources: RegisteredSource[]
): boolean {
  if (corroboratingSourceIds.length === 0) return false;

  const primaryDir = primarySource.ideologicalDirection;

  for (const id of corroboratingSourceIds) {
    const src = allSources.find((s) => s.id === id);
    if (!src) continue;

    const corrDir = src.ideologicalDirection;

    // Two GOVERNMENT/ACADEMIC sources always count as independent
    if (
      primaryDir === IdeologicalDirection.GOVERNMENT ||
      primaryDir === IdeologicalDirection.ACADEMIC
    ) {
      return true;
    }

    // A partisan source is diversely corroborated by any different direction
    if (corrDir !== primaryDir) return true;
  }

  return false;
}

export function validateFact(fact: Fact, sources: RegisteredSource[]): ValidationResult {
  const failures: string[] = [];
  const warnings: string[] = [];
  const currentYear = new Date().getFullYear();

  // ── Primary source exists and is not disqualified ─────────────────────────
  const primarySource = sources.find((s) => s.id === fact.sourceId);
  if (!primarySource) {
    failures.push(`Source ID "${fact.sourceId}" not registered.`);
  } else {
    for (const pattern of DISQUALIFIED_SOURCE_PATTERNS) {
      if (
        primarySource.url.toLowerCase().includes(pattern) ||
        primarySource.name.toLowerCase().includes(pattern)
      ) {
        failures.push(`Source "${primarySource.name}" matches disqualified pattern "${pattern}".`);
      }
    }
  }

  // ── Recency ───────────────────────────────────────────────────────────────
  if (currentYear - fact.year > MAX_DATA_AGE_YEARS) {
    warnings.push(
      `Data is ${currentYear - fact.year} years old (max ${MAX_DATA_AGE_YEARS}). Label as historical.`
    );
  }

  // ── Sample size ───────────────────────────────────────────────────────────
  if (fact.sampleSize !== undefined && fact.sampleSize < MIN_SAMPLE_SIZE) {
    failures.push(`Sample size ${fact.sampleSize} is below minimum ${MIN_SAMPLE_SIZE}.`);
  }

  // ── Statistical significance ──────────────────────────────────────────────
  if (fact.pValue !== undefined && fact.pValue >= SIGNIFICANCE_THRESHOLD) {
    failures.push(`p-value ${fact.pValue} does not meet threshold ${SIGNIFICANCE_THRESHOLD}.`);
  }

  // ── Inflation adjustment for dollar-denominated stats ────────────────────
  const unitLower = fact.unit.toLowerCase();
  const isDollarDenominated =
    unitLower.includes('dollar') ||
    unitLower.includes('wage') ||
    unitLower.includes('income') ||
    unitLower.includes('salary') ||
    unitLower.includes('earning');

  if (isDollarDenominated && fact.adjustedForInflation === false) {
    warnings.push('Dollar-denominated stat must be CPI-adjusted or labeled NOMINAL.');
  }

  // ── Unemployment measure label ────────────────────────────────────────────
  if (
    fact.claimType === ClaimType.STATISTICAL &&
    (fact.stat.toLowerCase().includes('unemploy') || fact.stat.toLowerCase().includes('jobless')) &&
    !fact.unemploymentMeasure
  ) {
    failures.push('Unemployment stat must specify measure: U3 or U6.');
  }

  // ── Tax rate label ────────────────────────────────────────────────────────
  if (
    fact.claimType === ClaimType.STATISTICAL &&
    fact.stat.toLowerCase().includes('tax rate') &&
    !fact.rateType
  ) {
    failures.push('Tax rate stat must specify type: effective or marginal.');
  }

  // ── Causal claims: label, evidence level, effect size, replication ───────
  if (fact.claimType === ClaimType.CAUSAL) {
    if (!fact.causalLabel) {
      failures.push('Causal claim must specify causalLabel.');
    }
    if (fact.evidenceLevel === undefined) {
      failures.push('Causal claim must specify evidenceLevel (1–6).');
    } else if (fact.evidenceLevel > MIN_ADMISSIBLE_EVIDENCE_LEVEL) {
      failures.push(
        `Evidence level ${fact.evidenceLevel} (${EVIDENCE_LEVEL_LABEL[fact.evidenceLevel]}) is below ` +
        `minimum admissible level ${MIN_ADMISSIBLE_EVIDENCE_LEVEL}. Expert opinion and case reports are not admissible.`
      );
    }
    if (fact.pValue !== undefined && fact.effectSize === undefined) {
      failures.push(
        'Effect size is required alongside p-value. A statistically significant result with a trivially small ' +
        'effect size is misleading. Specify effectSize and effectSizeUnit.'
      );
    }
    if (fact.replicationStatus === undefined) {
      warnings.push('Replication status not specified. Defaulting to SINGLE_STUDY.');
    }
  }

  // ── Quote claims require primary recording ────────────────────────────────
  if (fact.claimType === ClaimType.QUOTE && !fact.primaryRecordingUrl) {
    failures.push('Quote claim must include primaryRecordingUrl (original video, audio, or transcript).');
  }

  // ── Funding bias: industry-sponsored studies capped at SUPPORTED ──────────
  let industryFundingFlag = false;
  if (fact.funderHasFinancialInterest === true) {
    industryFundingFlag = true;
    warnings.push(
      `Funder "${fact.fundingSource ?? 'undisclosed'}" has a direct financial interest in this result. ` +
      'Study is capped at SUPPORTED regardless of methodology. ' +
      'Independent replication by a non-interested party is required for VERIFIED status.'
    );
  }
  if (fact.fundingSource === undefined && fact.claimType === ClaimType.CAUSAL) {
    warnings.push('Funding source not disclosed. Causal claims require funding disclosure.');
  }

  // ── Echo chamber check ────────────────────────────────────────────────────
  const hasDiverseCorroboration =
    primarySource !== undefined &&
    hasIdeologicallyDiverseCorroboration(primarySource, fact.corroboratingSourceIds, sources);

  const hasAnyCorroboration = fact.corroboratingSourceIds.length > 0;

  // ── Causal claims: single study caps at SUPPORTED; replication needed ─────
  const isSingleUnreplicatedStudy =
    fact.claimType === ClaimType.CAUSAL &&
    (fact.replicationStatus === ReplicationStatus.SINGLE_STUDY ||
      fact.replicationStatus === undefined);

  const replicationFailed =
    fact.claimType === ClaimType.CAUSAL &&
    fact.replicationStatus === ReplicationStatus.REPLICATION_FAILED;

  // ── Determine trust level ─────────────────────────────────────────────────
  let trustLevel: TrustLevel;

  if (failures.length > 0) {
    trustLevel = TrustLevel.UNVERIFIABLE;
  } else if (replicationFailed) {
    // Replication failure means the causal claim is actively disputed
    trustLevel = TrustLevel.DISPUTED;
  } else if (
    hasDiverseCorroboration &&
    warnings.length === 0 &&
    !industryFundingFlag &&
    !isSingleUnreplicatedStudy
  ) {
    trustLevel = TrustLevel.VERIFIED;
  } else {
    trustLevel = TrustLevel.SUPPORTED;
  }

  return {
    pass: failures.length === 0,
    trustLevel,
    failures,
    warnings,
  };
}
