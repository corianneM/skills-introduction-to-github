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
  confoundersControlled?: string[];
  confoundersNotControlled?: string[];

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

  // ── Causal claims require causalLabel ─────────────────────────────────────
  if (fact.claimType === ClaimType.CAUSAL && !fact.causalLabel) {
    failures.push('Causal claim must specify causalLabel (CORRELATION, CAUSAL_PEER_REVIEWED, or CAUSAL_DISPUTED).');
  }

  // ── Quote claims require primary recording ────────────────────────────────
  if (fact.claimType === ClaimType.QUOTE && !fact.primaryRecordingUrl) {
    failures.push('Quote claim must include primaryRecordingUrl (original video, audio, or transcript).');
  }

  // ── Echo chamber check ────────────────────────────────────────────────────
  const hasDiverseCorroboration =
    primarySource !== undefined &&
    hasIdeologicallyDiverseCorroboration(primarySource, fact.corroboratingSourceIds, sources);

  const hasAnyCorroboration = fact.corroboratingSourceIds.length > 0;

  // ── Determine trust level ─────────────────────────────────────────────────
  let trustLevel: TrustLevel;

  if (failures.length > 0) {
    trustLevel = TrustLevel.UNVERIFIABLE;
  } else if (hasDiverseCorroboration && warnings.length === 0) {
    trustLevel = TrustLevel.VERIFIED;
  } else if (hasAnyCorroboration || warnings.length > 0) {
    trustLevel = TrustLevel.SUPPORTED;
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
