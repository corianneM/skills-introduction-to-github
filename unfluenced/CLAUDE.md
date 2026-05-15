# Unfluenced — Project Memory

---

## NORTH STAR — Read this first, especially before any pivot

**The mission:** Show people the verified facts behind the things they think they hate.
If they see the actual data — not the spin — some prejudice dissolves on its own.

**The ultimate point (founder's words):**
> "The ultra-wealthy can still be way above everyone else. But the rest of us should be
> able to own homes and take a vacation. That's it. That's the point."
> This is not anti-wealth. It's pro-floor. The US economy delivered this for ~30 years
> after WWII. The data shows when it stopped and why.

**The rules (non-negotiable regardless of tech stack):**
1. Every claim cites a primary, verifiable source. No exceptions.
2. Both sides of every tension get equal floor. No topic is one-sided. Up to 3 sides if genuinely distinct.
3. Context is mandatory — a stat without context is a lie waiting to happen.
4. No political framing in the UI. Headers are questions, not accusations.
5. Locale matters — a national stat that doesn't apply locally is misleading.
6. Accountability applies to everyone: individuals, corporations, and government.
7. n matters. Small samples are labeled. Studies under minimum n threshold are excluded entirely.
8. Correlation ≠ causation. Always labeled explicitly. Never implied.
9. Follow the money. Funding source required on all study-backed claims.

**The values anchor:**
- People who can work should work. Benefits exist for emergencies, not as income.
- Freedom of belief and expression — you can hate whoever you want. Just don't harm or lie.
- Fiscal responsibility: spending must be justified by evidence, not ideology.
- The same standards apply to every group, institution, and income level.
- Political philosophy: "liberservuntist" — draws from liberal, conservative, and pure communist
  ideals simultaneously. Recognizes that pure capitalism and pure communism have never existed.
  What has always existed is nepotism: capital flows to proximity to power, not merit.

**If we have to pivot:** Keep the data layer (exclusionCriteria, sources, topic modules).
That's the soul of the project. The delivery mechanism (mobile, web, API, newsletter) is secondary.

---

## What this is
Evidence-based mobile app (React Native / Expo). Shows verified facts on contested socioeconomic
topics from both sides. No spin. No opinion. No partisan framing.

**Core principle:**
"Love, pray to, hate, trash-talk whoever — just don't harm anyone or lie to make your point."
Fiscal conservative anchor: people who can work should work; benefits are emergency safety nets.

---

## Evidence Confidence Tiers (plain language for users)

| Tier | Label | What it means |
|------|-------|---------------|
| 1 | ESTABLISHED | Multiple large independent replications, gold standard methodology, consensus |
| 2 | SUPPORTED | Solid methodology, credible sources, may lack full replication |
| 3 | EMERGING | Limited studies, not yet replicated, but anti-view has no factual basis |
| 4 | CONTESTED | Genuine disagreement, real evidence on both sides — shown with both |

**Sample size rules (hard minimums — below these, claim is excluded entirely):**
- National survey / opinion poll: n ≥ 1,000
- Clinical trial (efficacy): n ≥ 1,000 (Phase 3 standard)
- Clinical trial (safety only / Phase 1): excluded from efficacy claims
- Economic / administrative data: population-level government data preferred over surveys
- n < 100 under any circumstance: excluded. Not labeled. Not linked. Does not exist in Unfluenced.

---

## Glossary (plain English — to be built as in-app feature)
Jargon is a weapon. Long words make people stop asking questions. That's not an accident.
The glossary exists so users can't be misdirected by terminology.

Key terms to define in plain language:
- Correlation vs. causation (most abused concept in public discourse)
- Peer-reviewed (what it means and what it doesn't)
- Statistically significant (doesn't mean large or important)
- Double-blind (why it matters — prevents wishful thinking)
- Confidence interval (wide range = low confidence)
- Meta-analysis (study of studies — strongest evidence)
- Publication bias (negative results disappear — the literature is skewed)
- Effect size (how big the difference actually is)
- Funded by (follow the money before trusting the conclusion)
- p-value (probability the result is random chance — p < 0.05 required)
- n = (sample size — how many people/cases were actually studied)

---

## Architecture (high level)
```
src/data/exclusionCriteria.ts       — validation rules engine (truth framework)
src/data/sources.ts                 — source registry, Tier 1/2/3 + ideological direction
src/data/inaccuracies.ts            — spin tracker (documented inaccuracies)
src/data/glossary.ts                — plain English term definitions (TO BUILD)
src/api/bls.ts                      — BLS employment/wage API
src/api/fred.ts                     — FRED economic data API
src/api/census.ts                   — Census demographics API
src/data/topics/employment.ts       — DONE
src/data/topics/immigration.ts      — DONE
src/data/topics/taxes.ts            — DONE
src/data/topics/healthcare.ts       — DONE
src/data/topics/wealthInequality.ts — DONE
src/data/topics/judicialConsistency.ts — DONE
```

## Still to build
- Glossary data file + in-app screen
- `app/` — Home, Topic detail, Explore (by state), Myth vs Fact, Glossary screens
- `app.config.ts` — wire up free API keys (BLS keyless; FRED + Census free registration)
- Assets (icon, splash)
- Minimum n enforcement in validateFact()
- Evidence confidence tier labels (ESTABLISHED / SUPPORTED / EMERGING / CONTESTED)

---

## Agent / AI Coordinator — IDEAS ONLY, no action yet

**Concept:** Deploy Haiku model(s) as cost-efficient coordinator/orchestrator.
Haiku is given explicit rules (the validation framework) and operates at high level.
Generalizes well; cheap to run at scale.

**Proposed roles:**
1. Orchestrator — routes incoming claims to specialized sub-agents by claim type
   (Statistical, Causal, Quote, Event — matching our ClaimType enum)
2. Validator — applies evidence rules, determines trust level, flags failures
3. Escalation path — if Haiku encounters a conflict it cannot resolve within the rules,
   it opens a PR / GitHub issue for human review. That human decision then informs
   rule refinement. This creates a feedback loop: conflicts → human decisions → better rules.

**Future (way out, ideas only):**
- Fine-tune rules incrementally as conflict cases accumulate
- If app scales significantly: train a separate LLM for user-facing assistance
  (not pushed on users — opt-in only, clearly labeled as AI)
- Free incremental training available on Azure (small batches)
- Keep user-facing LLM and validation engine completely separate

**Constraints for any AI component:**
- Never generates facts. Only validates, routes, and flags.
- Cannot override the hard rules (n minimums, funding disclosure, echo chamber check)
- Any AI output that touches user-facing content must be labeled as AI-assisted
- The rules always win. The AI enforces them; it does not interpret around them.

---

## Data sources (all free)
Tier 1 (government): BLS, Census, FRED, BEA, CDC WONDER, IRS SOI, MIT Living Wage,
                     USDA ERS, CMS, supremecourt.gov, C-SPAN, Senate Judiciary
Tier 2 (non-partisan): Pew, KFF, MPI, Urban Institute, NBER, Gallup
Tier 3 (data only, verify): EPI (LEFT), Tax Foundation (RIGHT)

## Realistic next dependencies
1. Expo SDK 52 + React Native 0.76 — stable
2. TanStack Query v5 — stable
3. FRED API key — free, 5-min registration
4. Census API key — free, instant
5. Anthropic API key — for Haiku orchestrator (when ready)

## What NOT to do
- No backend initially — public APIs + bundled curated facts
- No AI-generated facts or summaries — humans write context notes
- No political framing in UI copy — headers are questions, not assertions
- No claim under minimum n threshold — excluded entirely, not labeled
- Never let AI override hard validation rules
