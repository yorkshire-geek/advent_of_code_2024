import { describe, expect, test } from "bun:test";
import { readData, validatePage, reorderPage, validatePagesAndAddScores, validateReorderAndAddScores } from "./day_05";

describe("Day 5 - Part One", async () => {
    const { rules, pages } = await readData(import.meta.dir + "/data.test.txt");

    test("should parse rules correctly - [75, 47, 61, 53, 29] - passes", async () => {
        expect(validatePage([75, 47, 61, 53, 29], rules)).toBe(61);
    });

    test("should parse rules correctly - [97,61,53,29,13] - passes", async () => {
        expect(validatePage([97, 61, 53, 29, 13], rules)).toBe(53);
    });

    test("should parse rules correctly - [75,29,13]] - passes", async () => {
        expect(validatePage([75, 29, 13], rules)).toBe(29);
    });

    test("should parse rules correctly - [75,97,47,61,53] fails", async () => {
        expect(validatePage([75, 97, 47, 61, 53], rules)).toBe(0);
    });

    test("should parse rules correctly - [61,13,29] fails", async () => {
        expect(validatePage([61, 13, 29], rules)).toBe(0);
    });

    test("should parse rules correctly - [97,13,75,29,47] fails", async () => {
        expect(validatePage([97, 13, 75, 29, 47], rules)).toBe(0);
    });

    test("Part one example answer is 143", async () => {
        expect(validatePagesAndAddScores(pages, rules)).toBe(143);
    });

});

describe("Day 5 - Part Two", async () => {
    const { rules, pages } = await readData(import.meta.dir + "/data.test.txt");

    test("Reorder page - [75,97,47,61,53] to [97,75,47,61,53]", async () => {
        expect(reorderPage([75, 97, 47, 61, 53], rules)).toEqual([97, 75, 47, 61, 53]);
    });

    test("should parse rules correctly - [61,13,29] to [61,29,13]", async () => {
        expect(reorderPage([61, 13, 29], rules)).toEqual([61, 29, 13]);
    });

    test("should parse rules correctly - [97,13,75,29,47] fails", async () => {
        expect(reorderPage([97, 13, 75, 29, 47], rules)).toEqual([97, 75, 47, 29, 13]);
    });

    test("Part two example answer is 123", async () => {
        expect(validateReorderAndAddScores(pages, rules)).toBe(123);
    });

});

