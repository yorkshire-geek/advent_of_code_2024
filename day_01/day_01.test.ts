import { test, expect } from "bun:test";
import { calculateDistance, calculateSimilarity } from "./day_01";

test('calculateDistance returns expected value', () => {
  const result = calculateDistance([3, 4, 2, 1, 3, 3], [4, 3, 5, 3, 9, 3]);
  expect(result).toBe(11);
});

test('calculateSimilarity returns expected value', () => {
  const result = calculateSimilarity([3, 4, 2, 1, 3, 3], [4, 3, 5, 3, 9, 3] );
  expect(result).toBe(31);
});

