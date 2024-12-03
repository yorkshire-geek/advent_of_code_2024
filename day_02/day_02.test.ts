import { test, expect } from "bun:test";
import { calculateSafe, calculateSafeWithSinglelife } from "./day_02";

// PART ONE

test('calculateSafe returns true for valid descending array', () => {
  const result = calculateSafe([ 7, 6, 4, 2, 1 ]);
  expect(result).toBe(true);
});

test('calculateSafe returns false value for descending array with gap (6 to 2)', () => {
  const result = calculateSafe([ 9, 7, 6, 2, 1 ]);
  expect(result).toBe(false);
});

test('calculateSafe returns true for valid ascending array', () => {
  const result = calculateSafe([ 1, 3, 6, 7, 9 ]);
  expect(result).toBe(true);
});

// // PART TWO

test('calculateSafeWithSinglelife [7 6 4 2 1]: Safe', () => {
  const result = calculateSafeWithSinglelife([7, 6, 4, 2, 1]);
  expect(result).toBe(true);
});

test('calculateSafeWithSinglelife [1 2 7 8 9]: Unsafe', () => {
  const result = calculateSafeWithSinglelife([1, 2, 7, 8, 9]);
  expect(result).toBe(false);
});

test('calculateSafeWithSinglelife [9 7 6 2 1]: Unsafe', () => {
  const result = calculateSafeWithSinglelife([9, 7, 6, 2, 1]);
  expect(result).toBe(false);
});

test('calculateSafeWithSinglelife [1 2 6 7 9]: Unsafe', () => {
  const result = calculateSafeWithSinglelife([1, 2, 6, 7, 9]);
  expect(result).toBe(false);
});

test('calculateSafeWithSinglelife [1 3 2 4 5]: Safe by removing the second level, 3.', () => {
  const result = calculateSafeWithSinglelife([1, 3, 2, 4, 5]);
  expect(result).toBe(true);
});

test('calculateSafeWithSinglelife [8 6 4 4 1]: Safe by removing the third level 4', () => {
  const result = calculateSafeWithSinglelife([8, 6, 4, 4, 1]);
  expect(result).toBe(true);
});

test('calculateSafeWithSinglelife [1 3 6 7 9]: Safe by removing the third level 4', () => {
  const result = calculateSafeWithSinglelife([1, 3, 6, 7, 9]);
  expect(result).toBe(true);
});

test('calculateSafeWithSinglelife [1 2 3 4 5 9]: Safe by removing the last level 9', () => {
  const result = calculateSafeWithSinglelife([1, 2, 3, 4, 5, 9]);
  expect(result).toBe(true);
});

test('calculateSafeWithSinglelife [1 2 3 4 5 9]: Safe by removing the last level 9', () => {
  const result = calculateSafeWithSinglelife([10, 2, 3, 4, 5, 6]);
  expect(result).toBe(true);
});


test('calculateSafeWithSinglelife [81,82,84,87,88,92,89]: Safe by removing the 92', () => {
  const result = calculateSafeWithSinglelife([81,82,84,87,88,92,89]);
  expect(result).toBe(true);
});

test('calculateSafeWithSinglelife [1,2,3,4,5,10,6]: Safe by removing the 10', () => {
  const result = calculateSafeWithSinglelife([1,2,3,4,5,10,6]);
  expect(result).toBe(true);
});

test('calculateSafeWithSinglelife [1,2,3,4,5,10,6]: Safe by removing the 10', () => {
  const result = calculateSafeWithSinglelife([22,19,16,14,12,10,9,12]);
  expect(result).toBe(true);
});


