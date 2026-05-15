/**
 * Unfluenced — Exclusion Criteria
 *
 * A fact or source is rejected if it fails ANY of these rules.
 * These are not political — they are epistemic standards.
 */

export type SourceTier = 1 | 2 | 3;

export interface RegisteredSource {
  id: string;
  name: string;
  tier: SourceTier;
  url: string;
  apiAvailable: boolean;
  notes?: string;
}

export interface Fact {
  id: string;
  stat: string;
  unit: string;
  value: number | string;
  year: number;
  geographicScope: 'national' | 'state' | 'county' | 'metro';
  sourceId: string;
  corroboratingSourceIds: string[];
  contextNote?: string;
  adjustedForInflation?: boolean;
  sampleSize?: number;
  pValue?: number;
  unemploymentMeasure?: 'U3' | 'U6';
  rateType?: 'effective' | 'marginal';
}

// ─── Minimum thresholds ─────────────────────────────────────────────────────

export const MIN_SAMPLE_SIZE = 1000;
export const MAX_DATA_AGE_YEARS = 5;
export const REQUIRED_CORROBORATING_SOURCES = 1; // at least 1 additional source
export const SIGNIFICANCE_THRESHOLD = 0.05;

// ─── Disqualifying patterns (matched against source name/url) ───────────────

export const DISQUALIFIED_SOURCE_PATTERNS: string[] = [
  // These are checked as substrings against source URL or name.
  // Neither left nor right partisan advocacy sites.
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
  'vox.com',           // opinion-heavy; raw data only if linked to primary
  'thefederalist',
  'jacobin',
  'prager',
];

// ─── Validation ──────────────────────────────────────────────────────────────

export interface ValidationResult {
  pass: boolean;
  failures: string[];
}

export function validateFact(fact: Fact, sources: RegisteredSource[]): ValidationResult {
  const failures: string[] = [];
  const currentYear = new Date().getFullYear();

  // Recency
  if (currentYear - fact.year > MAX_DATA_AGE_YEARS) {
    failures.push(
      `Data is ${currentYear - fact.year} years old (max ${MAX_DATA_AGE_YEARS}). Label as historical.`
    );
  }

  // Corroboration
  if (fact.corroboratingSourceIds.length < REQUIRED_CORROBORATING_SOURCES) {
    failures.push(`Must have at least ${REQUIRED_CORROBORATING_SOURCES} corroborating source(s).`);
  }

  // Sample size (if survey-based)
  if (fact.sampleSize !== undefined && fact.sampleSize < MIN_SAMPLE_SIZE) {
    failures.push(`Sample size ${fact.sampleSize} is below minimum ${MIN_SAMPLE_SIZE}.`);
  }

  // Statistical significance (if study-based)
  if (fact.pValue !== undefined && fact.pValue >= SIGNIFICANCE_THRESHOLD) {
    failures.push(`p-value ${fact.pValue} does not meet significance threshold ${SIGNIFICANCE_THRESHOLD}.`);
  }

  // Inflation adjustment for dollar-denominated stats
  if (
    (fact.unit.toLowerCase().includes('dollar') || fact.unit.toLowerCase().includes('wage') || fact.unit.toLowerCase().includes('income') || fact.unit.toLowerCase().includes('salary')) &&
    fact.adjustedForInflation === false
  ) {
    failures.push('Dollar-denominated stat must be CPI-adjusted or explicitly labeled as nominal.');
  }

  // Primary source must exist and not be disqualified
  const primarySource = sources.find((s) => s.id === fact.sourceId);
  if (!primarySource) {
    failures.push(`Source ID "${fact.sourceId}" not registered in source registry.`);
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

  return { pass: failures.length === 0, failures };
}
