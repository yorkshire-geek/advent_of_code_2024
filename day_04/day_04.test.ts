import { describe, expect, test } from "bun:test";
import { gridFactory } from "./day_04";

describe("Day 4 - Read data into a grid", async () => {
  test("should parse test input correctly", async () => {
    const input = 'abcdef\nABCDEF';
    const grid = gridFactory(input).getGrid();
    
    expect(grid[0][0]).toBe('A');
    expect(grid[5][0]).toBe('F');
    expect(grid[0][1]).toBe('a');
    expect(grid[5][1]).toBe('f');
  });
});

describe("Day 4 - Find the message", async () => {
  const input = '....X.....\n' +
                '....M.....\n' +
                '....A.....\n' +
                '.XMAS.SAMX\n';
  const grid = gridFactory(input);

  test("should find XMAS or SAMX on a line", async () => {
    expect(grid.findRight(0, 0)).toBe(false);
    expect(grid.findRight(1, 0)).toBe(true);  // XMAS
    expect(grid.findRight(2, 0)).toBe(false);
    expect(grid.findRight(6, 0)).toBe(true);  // SAMX
    expect(grid.findRight(9, 0)).toBe(false);
    expect(grid.findRight(10, 0)).toBe(false); // out of bounds
  });

  test("should find XMAS or SAMX up and down", async () => {
    expect(grid.findUpOrDown(0, 0)).toBe(false);
    // expect(grid.findLeftOrRight(1, 0)).toBe(true);  // XMAS
    // expect(grid.findLeftOrRight(2, 0)).toBe(false);
    // expect(grid.findLeftOrRight(6, 0)).toBe(true);  // SAMX
    // expect(grid.findLeftOrRight(9, 0)).toBe(false);
    // expect(grid.findLeftOrRight(10, 0)).toBe(false); // out of bounds
  });
});