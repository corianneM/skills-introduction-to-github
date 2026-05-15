# Unfluenced — Project Memory

## What this is
Evidence-based mobile app (React Native / Expo). Shows verified facts on contested socioeconomic
topics from both sides. No spin. No opinion. No partisan framing.

## Core principle
"Love, pray to, hate, trash-talk whoever — just don't harm anyone or lie to make your point."
Fiscal conservative anchor: people who can work should work; benefits are emergency safety nets.

## Architecture (high level)
```
src/data/exclusionCriteria.ts   — validation rules (what gets rejected)
src/data/sources.ts             — source registry, Tier 1/2/3
src/api/bls.ts                  — BLS employment/wage API
src/api/fred.ts                 — FRED economic data API
src/api/census.ts               — Census demographics API
src/data/topics/employment.ts   — DONE: labor, benefits, work requirements
src/data/topics/immigration.ts  — DONE: jobs, taxes, crime, mobility
src/data/topics/taxes.ts        — DONE: effective rates, debt, tax gap
src/data/topics/healthcare.ts   — DONE: costs, access, outcomes
src/data/topics/wealthInequality.ts — DONE: Gini, mobility, productivity gap
```

## Still to build
- `src/components/` — FactCard, DualView, DataChart
- `app/` — Home, Topic detail, Explore (by state), Myth vs Fact screens
- `src/hooks/useLocaleData.ts` — state-level data based on user location
- `app.config.ts` — wire up free API keys (BLS, FRED, Census all free)
- Assets (icon, splash)

## Data sources (all free)
Tier 1 (government): BLS, Census, FRED, BEA, CDC WONDER, IRS SOI, MIT Living Wage, USDA ERS, CMS
Tier 2 (non-partisan): Pew, KFF, MPI, Urban Institute, NBER
Tier 3 (data only, verify): EPI, Tax Foundation

## Realistic next dependencies
1. Expo SDK 52 + React Native 0.76 — stable, no blockers
2. TanStack Query v5 — no breaking changes for this use case
3. FRED API key — free registration, 5-min setup
4. Census API key — free registration, instant

## What NOT to do
- No backend initially — all data from public APIs + bundled curated facts
- No AI-generated summaries — facts only, humans write context notes
- No political framing in UI copy — headers are questions, not assertions
