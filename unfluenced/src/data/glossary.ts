/**
 * Unfluenced — Plain English Glossary
 *
 * Jargon is a weapon. Long words make people stop asking questions.
 * Every term here is defined so users cannot be misdirected by terminology.
 *
 * Rules for glossary entries:
 * - Definition must be understandable to someone with no technical background
 * - Must include why the term matters (how it gets misused)
 * - Must include a real example where possible
 * - No condescension — inform, don't lecture
 */

export interface GlossaryEntry {
  term: string;
  plainDefinition: string;
  whyItMatters: string;
  howItGetsAbused: string;
  example?: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'Correlation',
    plainDefinition:
      'Two things that tend to happen together or move in the same direction at the same time.',
    whyItMatters:
      'Correlation tells you two things are related. It tells you nothing about why.',
    howItGetsAbused:
      'Media headlines routinely imply causation from correlation. "People who eat X have lower rates of Y" does not mean X prevents Y. Something else — a third factor — may cause both.',
    example:
      'Ice cream sales and drowning rates both rise in summer. They are correlated. Summer causes both. Ice cream does not cause drowning.',
  },
  {
    term: 'Causation',
    plainDefinition:
      'One thing directly causes another. If you change A, B changes because of it — not because of anything else.',
    whyItMatters:
      'Proving causation is very hard. It requires ruling out every other possible explanation. Most studies cannot do this.',
    howItGetsAbused:
      'People say "studies show X causes Y" when the study only showed correlation. True causation requires a randomized controlled trial or a natural experiment — not just data that moves together.',
    example:
      'Smoking causes lung cancer. This was proven by decades of controlled research. The tobacco industry funded studies showing "correlation is not causation" to delay that conclusion for 40 years.',
  },
  {
    term: 'Correlation ≠ Causation',
    plainDefinition:
      'Just because two things happen together does not mean one causes the other.',
    whyItMatters:
      'This is the single most abused concept in media, social media, and political argument. Almost every misleading statistic exploits this gap.',
    howItGetsAbused:
      'A study finds counties with more of X have higher rates of Y. Headlines say "X linked to Y." Politicians say "X causes Y." The study said no such thing.',
    example:
      'Countries that eat more chocolate win more Nobel Prizes per capita. Correlated. Chocolate does not produce Nobel laureates. Wealth drives both.',
  },
  {
    term: 'Peer-reviewed',
    plainDefinition:
      'Before a study is published, other scientists in the same field read it and check whether the methods make sense.',
    whyItMatters:
      'It is a quality filter — not a guarantee of truth. Peer review catches obvious errors. It does not catch fraud, p-hacking, or publication bias.',
    howItGetsAbused:
      '"Peer-reviewed study shows..." is used to shut down questions. Peer review means other scientists approved the method. It does not mean the result is correct, replicated, or free from conflicts of interest.',
  },
  {
    term: 'Statistically significant',
    plainDefinition:
      'The result is probably not due to random chance. It clears a mathematical threshold (p < 0.05) that says there is less than a 5% probability the result happened by luck.',
    whyItMatters:
      'Statistical significance tells you the result is real. It does not tell you the result is large, important, or meaningful in practice.',
    howItGetsAbused:
      'A drug that reduces risk from 2% to 1.9% can be "statistically significant" with a large enough sample. A 0.1% reduction is real but practically meaningless. Always ask: how big is the effect, not just whether it exists.',
  },
  {
    term: 'p-value',
    plainDefinition:
      'A number between 0 and 1. The lower it is, the less likely the result is random chance. Scientists generally require p < 0.05 to call a result significant.',
    whyItMatters:
      'It is the standard threshold for scientific claims. Results above p = 0.05 do not clear the bar.',
    howItGetsAbused:
      'P-hacking: researchers run many different analyses on the same data and report only the one that hits p < 0.05. This is why pre-registration of studies matters — it prevents cherry-picking the analysis after seeing the data.',
    example:
      'p = 0.03 means there is a 3% chance this result happened by random chance. That clears the bar. p = 0.08 does not.',
  },
  {
    term: 'Effect size',
    plainDefinition:
      'How big the difference actually is. Not just whether a difference exists — but how much of a difference.',
    whyItMatters:
      'A result can be statistically significant and practically meaningless. Effect size tells you whether the finding matters in the real world.',
    howItGetsAbused:
      'Headlines drop effect size entirely. "Drug X reduces risk" — by how much? 50% sounds dramatic. If baseline risk is 2%, a 50% reduction means going from 2% to 1%. That may or may not justify the side effects.',
  },
  {
    term: 'Double-blind',
    plainDefinition:
      'Neither the participants nor the researchers know who received the real treatment and who received the placebo. Both sides are "blind."',
    whyItMatters:
      'Prevents wishful thinking from corrupting results. If researchers know who got the treatment, they may unconsciously interpret data differently. If participants know, it triggers the placebo effect.',
    howItGetsAbused:
      'Studies that cannot be double-blinded (surgery, lifestyle interventions) are not automatically invalid — but their results are inherently weaker and must be interpreted more cautiously.',
  },
  {
    term: 'Placebo',
    plainDefinition:
      'A fake treatment — a sugar pill, a saline injection, a sham procedure — given to the control group so participants do not know whether they are getting the real thing.',
    whyItMatters:
      'The placebo effect is real and measurable. People feel better when they believe they are being treated. Without a placebo control, you cannot separate the treatment effect from the belief effect.',
    howItGetsAbused:
      'Supplement and wellness industries frequently cite studies without placebo controls. "People who took X felt better" proves nothing if the people knew they were taking something.',
  },
  {
    term: 'Sample size (n)',
    plainDefinition:
      'The number of people, cases, or observations in a study. Written as n = [number].',
    whyItMatters:
      'Small samples produce unreliable results. A study of 30 people is not proof of anything. Random variation alone can produce dramatic-looking results in small groups.',
    howItGetsAbused:
      'Small studies get published when results are dramatic. Dramatic results get media coverage. By the time larger studies fail to replicate them, the original finding is already "common knowledge."',
    example:
      'The original study linking vaccines to autism had n = 12. Twelve children. The author was later found to have fabricated data and lost his medical license. Dozens of studies with n in the hundreds of thousands found no link.',
  },
  {
    term: 'Meta-analysis',
    plainDefinition:
      'A study that combines the results of many independent studies on the same question to get a more reliable overall answer.',
    whyItMatters:
      'The highest level of evidence in most fields. By pooling many studies, it cancels out random variation and gives a more stable estimate.',
    howItGetsAbused:
      'A poor-quality meta-analysis that combines flawed studies still produces a flawed answer. "Garbage in, garbage out" applies. Always check whether the included studies were high quality.',
  },
  {
    term: 'Publication bias',
    plainDefinition:
      'Positive results (drug works, treatment helps) get published. Negative results (drug does not work) often do not. The published literature is therefore skewed toward findings that "worked."',
    whyItMatters:
      'If 20 studies test a drug and 1 shows it works and 19 show it does not — but only the 1 gets published — the evidence looks far stronger than it is.',
    howItGetsAbused:
      'Industries exploit this systematically. Run enough trials, publish the positive ones, bury the negative ones. The practice is documented and legal.',
  },
  {
    term: 'Confidence interval',
    plainDefinition:
      'A range of values that the true answer probably falls within. A 95% confidence interval means there is a 95% chance the true value is somewhere in that range.',
    whyItMatters:
      'A wide confidence interval means high uncertainty. A narrow one means more precision. Headlines always report the single number in the middle — rarely the range around it.',
    example:
      '"Drug X reduces risk by 40% (95% CI: 2%–61%)" means the true effect could be anywhere from 2% to 61%. That is enormous uncertainty. The headline "Drug reduces risk by 40%" hides it.',
  },
  {
    term: 'Funded by',
    plainDefinition:
      'Who paid for the research. Funding source must be disclosed in any legitimate study.',
    whyItMatters:
      'Studies funded by entities with a financial interest in the outcome are 4x more likely to reach conclusions favorable to the funder. This is documented in peer-reviewed research about research.',
    howItGetsAbused:
      'Industry funds studies. Positive results get published and amplified. Negative results are suppressed or never run. The tobacco industry invented this playbook in the 1950s. It has been used by pharma, fossil fuels, food companies, and agrochemical industries since.',
    example:
      'In 1967 the Sugar Research Foundation paid Harvard researchers to publish a review blaming fat — not sugar — for heart disease. This shaped dietary guidelines for decades.',
  },
  {
    term: 'Randomized Controlled Trial (RCT)',
    plainDefinition:
      'Participants are randomly assigned to either the treatment group or the control group. Neither group is chosen — chance decides. This rules out the possibility that people who chose treatment were already different from those who did not.',
    whyItMatters:
      'The gold standard for proving causation. Random assignment is the only reliable way to make two groups equivalent so any difference in outcome can be attributed to the treatment.',
    howItGetsAbused:
      'RCTs cannot always be run ethically or practically. When they cannot, observational studies are used — but observational results are much weaker and require much more caution before claiming causation.',
  },
  {
    term: 'Pre-registration',
    plainDefinition:
      'Researchers publicly declare their hypothesis, methods, and analysis plan before collecting data. The declaration is timestamped and cannot be changed after the fact.',
    whyItMatters:
      'Prevents p-hacking and HARKing (Hypothesizing After Results are Known). If the analysis plan is locked in before data collection, you cannot cherry-pick the analysis that produced a significant result.',
    howItGetsAbused:
      'Most studies are still not pre-registered. "Exploratory" findings — where the hypothesis emerged from the data — are routinely presented as if they were pre-planned confirmations.',
  },
];

export function getGlossaryTerm(term: string): GlossaryEntry | undefined {
  return GLOSSARY.find(
    (e) => e.term.toLowerCase() === term.toLowerCase()
  );
}
