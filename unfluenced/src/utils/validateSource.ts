import { validateFact, type Fact } from '../data/exclusionCriteria';
import { SOURCES } from '../data/sources';

export function validateFactOrThrow(fact: Fact): void {
  const result = validateFact(fact, SOURCES);
  if (!result.pass) {
    throw new Error(
      `Fact "${fact.id}" failed exclusion criteria:\n${result.failures.join('\n')}`
    );
  }
}
