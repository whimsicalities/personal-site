import { expect, test } from 'vitest';
import isPetStat from '../../../../src/routes/stats/helpers/isPetStat';

test('With correct stat', () => {
  expect(isPetStat("Food")).toBe(true);
});

test('With incorrect stat', () => {
  expect(isPetStat("Nyan Cat")).toBe(false);
});

