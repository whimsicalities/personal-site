import { expect, test } from 'vitest'
import IsPetStat from '../../../../src/routes/stats/helpers/IsPetStat'

test('With correct stat', () => {
  expect(IsPetStat("Food")).toBe(true);
})

test('With incorrect stat', () => {
  expect(IsPetStat("Nyan Cat")).toBe(false);
})

