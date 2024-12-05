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

describe("Day 4 - Find XMAS in grid, left/right, up/down", async () => {
  const input = '....X....S\n' +
    '....M....A\n' +
    '....A....M\n' +
    '.XMAS.SAMX\n';
  const grid = gridFactory(input);

  test("should find XMAS left to right", async () => {
    expect(grid.findRight(0, 0)).toBe(false);
    expect(grid.findRight(1, 0)).toBe(true);  // XMAS
    expect(grid.findRight(2, 0)).toBe(false);
    expect(grid.findRight(6, 0)).toBe(false);  // SAMX
    expect(grid.findRight(9, 0)).toBe(false);
    expect(grid.findRight(10, 0)).toBe(false); // out of bounds
  });

  test("should find XMAS right to left", async () => {
    expect(grid.findLeft(0, 0)).toBe(false);
    expect(grid.findLeft(1, 0)).toBe(false);  // XMAS
    expect(grid.findLeft(2, 0)).toBe(false);
    expect(grid.findLeft(6, 0)).toBe(false);
    expect(grid.findLeft(9, 0)).toBe(true);   // SAMX
    expect(grid.findLeft(10, 0)).toBe(false); // out of bounds
  });

  test("should find XMAS up", async () => {
    expect(grid.findUp(0, 0)).toBe(false);
    expect(grid.findUp(9, 0)).toBe(true);
    expect(grid.findUp(4, 0)).toBe(false);
    expect(grid.findUp(0, 10)).toBe(false); // out of bounds
  });

  test("should find XMAS down", async () => {
    expect(grid.findDown(0, 0)).toBe(false);
    expect(grid.findDown(4, 3)).toBe(true);
    expect(grid.findDown(9, 1)).toBe(false);
    expect(grid.findDown(0, 10)).toBe(false); // out of bounds
  });
});

describe("Day 4 - Find XMAS diagonally NE. SE, SW, NW", async () => {
  const input = 'X..S..S..X\n' +
    '.MA....AM.\n' +
    '.MA....AM.\n' +
    'X..S..S..X\n';
  const grid = gridFactory(input);

  test("should find XMAS diagonally NE", async () => {
    expect(grid.findNorthEast(0, 0)).toBe(true);
    expect(grid.findNorthEast(4, 4)).toBe(false);
    expect(grid.findNorthEast(0, 10)).toBe(false); // out of bounds
  });

  test("should find XMAS diagonally NW", async () => {
    expect(grid.findNorthWest(9, 0)).toBe(true);
    expect(grid.findNorthWest(4, 4)).toBe(false);
    expect(grid.findNorthWest(0, 10)).toBe(false); // out of bounds
  });

  test("should find XMAS diagonally SE", async () => {
    expect(grid.findSouthEast(0, 3)).toBe(true);
    expect(grid.findSouthEast(4, 4)).toBe(false);
    expect(grid.findSouthEast(0, 10)).toBe(false); // out of bounds
  });


  test("should find XMAS diagonally SW", async () => {
    expect(grid.findSouthWest(9, 3)).toBe(true);
    expect(grid.findSouthWest(4, 4)).toBe(false);
    expect(grid.findSouthWest(0, 10)).toBe(false); // out of bounds
  });

});

describe("Day 4 Part One- Check the example file", async () => {
  // const file = Bun.file('./day_04/data.test.txt');
  const input = await Bun.file(import.meta.dir + "/data.input.txt").text();
  // const input = await file.text();
  const grid = gridFactory(input);

  test("The example file should have 18 XMAS's", async () => {
    expect(grid.findAll()).toBe(18);
  });

});


describe("Day 4 Part Two - Check the input file", async () => {

  const input = '.M.S......\n' +
    '..A..MSMS.\n' +
    '.M.S.MAA..\n' +
    '..A.ASMSM.\n' +
    '.M.S.M....\n' +
    '..........\n' +
    'S.S.S.S.S.\n' +
    '.A.A.A.A..\n' +
    'M.M.M.M.M.\n' +
    '..........';
  const grid = gridFactory(input);

  test.only("Find MSAMS at 1,9", async () => {
    expect(grid.findPattern(1, 9, "MSAMS")).toBe(true);
  });

  test.only("Find SMASM at 3,7", async () => {
    expect(grid.findPattern(3, 7, "SMASM")).toBe(true);
  });

  test.only("Find MMASS at 5,8", async () => {
    expect(grid.findPattern(5, 8, "MMASS")).toBe(true);
  });

  test.only("Find MMASS at 0,3", async () => {
    expect(grid.findPattern(0, 3, "SSAMM")).toBe(true);
  });

  test.only("Find all patterns in the input", async () => {
    expect(grid.findX_MasPattern()).toBe(9);
  });
});
