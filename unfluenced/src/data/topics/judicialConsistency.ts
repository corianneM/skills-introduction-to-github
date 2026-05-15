/**
 * Topic: Judicial Consistency & Precedent
 *
 * Dual-perspective framing:
 *   Concern A — "Courts have a duty to correct constitutional errors, even long-standing ones"
 *   Concern B — "Reversing 50 years of settled precedent undermines the rule of law"
 *
 * Every claim here is sourced to primary government records:
 * official court opinions (supremecourt.gov), Senate confirmation transcripts,
 * and C-SPAN footage. No secondhand reporting is used as a primary source.
 *
 * The app presents the legal arguments on both sides without declaring a winner.
 * Readers see the record. They decide.
 */

import { ClaimType, CausalLabel, type Fact } from '../exclusionCriteria';

export const TOPIC_ID = 'judicial-consistency';
export const TOPIC_LABEL = 'Judicial Consistency & Precedent';
export const TOPIC_DESCRIPTION =
  'What justices said, what they ruled, and what the doctrine of stare decisis actually requires.';

export const CONCERN_A_HEADER =
  'Do courts have a constitutional duty to correct prior errors, even settled ones?';
export const CONCERN_B_HEADER =
  'Does reversing 50 years of precedent without new constitutional grounds undermine the rule of law?';

// ─── Supporting data sources used in this module ────────────────────────────
//
// 'scotus'      — supremecourt.gov (official opinions, primary record)
// 'cspan'       — C-SPAN archive (official congressional hearing footage)
// 'senate-jud'  — Senate Judiciary Committee official transcripts
// 'gallup'      — Gallup polling (non-partisan, CENTER)
// 'pew'         — Pew Research Center (non-partisan, CENTER)
//
// Note: 'scotus', 'cspan', and 'senate-jud' must be added to sources.ts
// as GOVERNMENT tier sources before facts here reach ESTABLISHED status.

export const FACTS: Fact[] = [

  // ─── Concern A: The originalist case ─────────────────────────────────────

  {
    claimType: ClaimType.QUOTE,
    id: 'jc-alito-dobbs-text',
    stat: 'Justice Alito, writing for the majority in Dobbs v. Jackson (2022)',
    unit: 'direct quote from official opinion',
    value: '"The Constitution makes no reference to abortion, and no such right is implicitly protected by any constitutional provision."',
    year: 2022,
    geographicScope: 'national',
    sourceId: 'scotus',
    corroboratingSourceIds: ['senate-jud'],
    primaryRecordingUrl: 'https://www.supremecourt.gov/opinions/21pdf/19-1392_6j37.pdf',
    isDirectQuote: true,
    contextNote:
      'This is the originalist foundation of Dobbs: that rights not enumerated in the Constitution or deeply rooted in the nation\'s history and tradition are not protected by the 14th Amendment\'s due process clause. This was the majority\'s legal reasoning, not a political statement.',
  },
  {
    claimType: ClaimType.EVENT,
    id: 'jc-brown-overturned-plessy',
    stat: 'Brown v. Board of Education (1954) overturned Plessy v. Ferguson (1896)',
    unit: 'Supreme Court ruling',
    value: 'Plessy had stood for 58 years when it was overturned',
    year: 1954,
    geographicScope: 'national',
    sourceId: 'scotus',
    corroboratingSourceIds: ['senate-jud'],
    contextNote:
      'Widely accepted as correct and necessary. Demonstrates that overturning long-standing precedent is not inherently wrong — the legal and moral quality of the original ruling matters. Originalists cite this to argue that longevity of precedent does not equal correctness.',
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'jc-times-precedent-overturned',
    stat: 'Number of times the Supreme Court has explicitly overturned its own prior precedents since 1789',
    unit: 'rulings',
    value: 145,
    year: 2020,
    geographicScope: 'national',
    sourceId: 'scotus',
    corroboratingSourceIds: ['senate-jud'],
    contextNote:
      'Per Congressional Research Service analysis. Overturning precedent is uncommon but not unprecedented. The relevant legal question is not whether courts can do it, but whether the legal reasoning justifying it meets the standard the Court itself has articulated.',
    adjustedForInflation: false,
  },

  // ─── Concern B: The stare decisis case ───────────────────────────────────

  {
    claimType: ClaimType.QUOTE,
    id: 'jc-casey-stare-decisis',
    stat: 'Planned Parenthood v. Casey (1992) — joint opinion by O\'Connor, Kennedy, Souter',
    unit: 'direct quote from official opinion',
    value: '"Liberty finds no refuge in a jurisprudence of doubt... a decision to overrule should rest on some special justification over and above the belief that the prior case was wrongly decided."',
    year: 1992,
    geographicScope: 'national',
    sourceId: 'scotus',
    corroboratingSourceIds: ['senate-jud'],
    primaryRecordingUrl: 'https://supreme.justia.com/cases/federal/us/505/833/',
    isDirectQuote: true,
    contextNote:
      'Casey explicitly reaffirmed Roe v. Wade on stare decisis grounds. The joint opinion held that even if some justices might have decided Roe differently, overturning it would undermine public trust in the court as a legal — not political — institution. Dobbs overturned Casey 30 years later.',
  },
  {
    claimType: ClaimType.QUOTE,
    id: 'jc-kavanaugh-confirmation',
    stat: 'Brett Kavanaugh, Senate Judiciary Committee confirmation hearing, September 5, 2018',
    unit: 'direct quote from Senate transcript',
    value: '"Roe v. Wade is an important precedent of the Supreme Court. It has been reaffirmed many times over the past 45 years."',
    year: 2018,
    geographicScope: 'national',
    sourceId: 'senate-jud',
    corroboratingSourceIds: ['cspan'],
    primaryRecordingUrl: 'https://www.c-span.org/video/?449705-1/kavanaugh-confirmation-hearing-day-2',
    isDirectQuote: true,
    contextNote:
      'Justice Kavanaugh said this under oath before the Senate. He voted with the Dobbs majority in 2022 to overturn Roe. The Dobbs majority opinion acknowledges that prior affirmations of precedent do not bind future courts.',
  },
  {
    claimType: ClaimType.QUOTE,
    id: 'jc-gorsuch-confirmation',
    stat: 'Neil Gorsuch, Senate Judiciary Committee confirmation hearing, March 21, 2017',
    unit: 'direct quote from Senate transcript',
    value: '"Roe v. Wade, decided in 1973, is a precedent of the United States Supreme Court. It has been reaffirmed."',
    year: 2017,
    geographicScope: 'national',
    sourceId: 'senate-jud',
    corroboratingSourceIds: ['cspan'],
    primaryRecordingUrl: 'https://www.c-span.org/video/?425127-1/gorsuch-confirmation-hearing-day-2',
    isDirectQuote: true,
    contextNote:
      'Justice Gorsuch acknowledged Roe as established precedent at his confirmation. He voted with the Dobbs majority. Supporters argue confirming that precedent exists is not the same as promising never to overturn it.',
  },
  {
    claimType: ClaimType.QUOTE,
    id: 'jc-thomas-dobbs-concurrence',
    stat: 'Justice Thomas, concurring opinion in Dobbs v. Jackson (2022)',
    unit: 'direct quote from official opinion',
    value: '"In future cases, we should reconsider all of this Court\'s substantive due process precedents, including Griswold, Lawrence, and Obergefell."',
    year: 2022,
    geographicScope: 'national',
    sourceId: 'scotus',
    corroboratingSourceIds: ['senate-jud'],
    primaryRecordingUrl: 'https://www.supremecourt.gov/opinions/21pdf/19-1392_6j37.pdf',
    isDirectQuote: true,
    contextNote:
      'Justice Thomas wrote this in his own concurrence — no other justice joined it. Griswold protects contraception; Lawrence protects same-sex intimacy; Obergefell protects same-sex marriage. Notably, Thomas did not include Loving v. Virginia (1967), which protects interracial marriage — a right that applies to his own marriage. His written opinion does not explain the omission. Loving uses the same legal framework (substantive due process) as the cases he listed.',
  },
  {
    claimType: ClaimType.STATISTICAL,
    id: 'jc-gallup-court-approval',
    stat: 'Gallup approval rating of the U.S. Supreme Court',
    unit: 'percent approving',
    value: 40,
    year: 2023,
    geographicScope: 'national',
    sourceId: 'gallup',
    corroboratingSourceIds: ['pew'],
    contextNote:
      'Gallup recorded 58% approval in 2020, dropping to a historic low of 40% in 2023 — the lowest since Gallup began tracking in 2000. Pew Research shows similar trends. Approval decline is measurable across partisan lines, though the magnitude differs by party.',
    adjustedForInflation: false,
    sampleSize: 1013,
  },

  // ─── Shared context: What stare decisis actually requires ─────────────────

  {
    claimType: ClaimType.QUOTE,
    id: 'jc-stare-decisis-definition',
    stat: 'The Supreme Court\'s own stated test for overturning precedent (Planned Parenthood v. Casey, 1992)',
    unit: 'legal doctrine',
    value: 'Courts must weigh: workability of the prior rule; reliance on it by individuals and society; whether related law has evolved; whether facts have changed to make the prior rule merely a remnant of an abandoned doctrine.',
    year: 1992,
    geographicScope: 'national',
    sourceId: 'scotus',
    corroboratingSourceIds: ['senate-jud'],
    primaryRecordingUrl: 'https://supreme.justia.com/cases/federal/us/505/833/',
    isDirectQuote: false,
    contextNote:
      'This is the Court\'s own multi-factor test — established in Casey — for when overturning precedent is legally justified. The Dobbs majority applied this test and concluded the factors supported overturning. The dissent in Dobbs applied the same test and concluded they did not. Both used the identical legal framework.',
  },
];

// ─── Ethics / recusal (documented record, no corruption allegation) ───────────

export const DOCUMENTED_RECORD = [
  {
    id: 'dr-thomas-crow-gifts',
    subject: 'Justice Clarence Thomas',
    event:
      'ProPublica reported (April 2023) that Justice Thomas received undisclosed gifts from real estate developer Harlan Crow over more than two decades, including private jet travel and luxury vacations. Thomas subsequently filed amended financial disclosure forms.',
    primarySources: [
      'Thomas\'s amended Senate financial disclosure forms (public record)',
      'Senate Judiciary Committee letters requesting documentation (public record)',
    ],
    proPublicaNote:
      'ProPublica is classified CENTER_LEFT. Their Thomas reporting is corroborated by the amended disclosure forms Thomas himself filed — which are primary government records.',
    recusalNote:
      'Thomas did not recuse himself from cases related to the January 6 investigation. His wife, Virginia Thomas, exchanged texts with White House Chief of Staff Mark Meadows urging efforts to overturn the 2020 election. Those texts were provided to the January 6 Select Committee (primary government record).',
    bothSidesNote:
      'Thomas has stated that justices are solely responsible for their own recusal decisions and that he followed the norms of his colleagues. No formal ethics mechanism currently exists to compel Supreme Court justices to recuse. The Supreme Court adopted its first formal ethics code in November 2023 — though it lacks an enforcement mechanism.',
    sourceUrls: [
      'https://www.propublica.org/article/clarence-thomas-scotus-undisclosed-luxury-travel-gifts-crow',
      'https://www.supremecourt.gov/about/code-of-conduct.aspx',
    ],
  },
];

export const MYTH_VS_FACT = [
  {
    id: 'mvf-jc-overturning-unprecedented',
    myth: 'The Supreme Court has never overturned a precedent that was reaffirmed multiple times.',
    fact:
      'The Court has overturned precedents that were previously reaffirmed. Plessy v. Ferguson was reaffirmed in Cumming v. Board of Education (1899) before being overturned by Brown in 1954. Precedent reaffirmation does not make a ruling permanently immune from reversal.',
    sourceIds: ['scotus'],
    year: 2022,
  },
  {
    id: 'mvf-jc-confirmation-promise',
    myth: 'Justices who described Roe as "settled precedent" at confirmation made a binding promise to uphold it.',
    fact:
      'No such binding promise exists — and nominees are trained to avoid committing to future rulings. What is documentable: the exact words said, under oath, and the subsequent votes. The reader decides what weight to give the gap between them.',
    sourceIds: ['senate-jud', 'cspan'],
    year: 2022,
  },
  {
    id: 'mvf-jc-only-left-cares',
    myth: 'Concern about judicial consistency is a left-wing political position.',
    fact:
      'The doctrine of stare decisis is a foundational principle across the ideological spectrum. The Casey majority (1992) included Reagan appointee Sandra Day O\'Connor and Bush appointee David Souter. Conservative legal scholars including J. Harvie Wilkinson III have written critically about Dobbs\'s treatment of precedent.',
    sourceIds: ['scotus', 'senate-jud'],
    year: 2022,
  },
];
