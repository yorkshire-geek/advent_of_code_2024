import { describe, expect, test } from "bun:test";
import { Grid } from "./day_04_again";

describe("Day 4 - Grid setup", () => {
  test("should read test input into grid correctly", () => {
    const input = 'abc\n' + 'DEF';
    const grid = new Grid(input);

    expect(grid.grid[0][0]).toBe("a");
    expect(grid.grid[0][1]).toBe("b");
    expect(grid.grid[0][2]).toBe("c");

    expect(grid.grid[1][0]).toBe("D");
    expect(grid.grid[1][1]).toBe("E"); 
    expect(grid.grid[1][2]).toBe("F");
  });
});

describe("Left Right/ Up Down Operations", () => {

  test("Should find Right", () => {
    const input = '......\n' + 
                  '..XMAS\n' + 
                  '......';
    const grid = new Grid(input);

    expect(grid.findRight(0, 0)).toBe(false);
    expect(grid.findRight(1, 2)).toBe(true);
  });

  test("Should find Left", () => {
    const input = '......\n' + 
                  '.SAMX.\n' + 
                  '.....';
    const grid = new Grid(input);

    expect(grid.findLeft(0, 0)).toBe(false);
    expect(grid.findLeft(1, 4)).toBe(true);
  });

  test("Should find down", () => {
    const input = '...X\n' + 
                  '..XM\n' + 
                  '..MS\n' + 
                  '..AA\n' + 
                  '..S.';
    const grid = new Grid(input);

    expect(grid.findDown(0, 0)).toBe(false);
    expect(grid.findDown(1, 2)).toBe(true);
    expect(grid.findDown(0, 3)).toBe(false);
  });

  test("should find up", () => {
    const input = '....\n' + 
                  '..S.\n'+ 
                  '..A.\n' + 
                  '..M.\n' + 
                  '..X.';
    const grid = new Grid(input);

    expect(grid.findUp(0, 0)).toBe(false);
    expect(grid.findUp(4, 2)).toBe(true);
  });
});

describe("Find XMAS diagonally", async() => {
  const input = await Bun.file(import.meta.dir + "/test.txt").text();
  const grid = new Grid(input);

  test("should find diagonalDownRight", () => {
    expect(grid.findDiagonalDownRight(0, 0)).toBe(false);
    expect(grid.findDiagonalDownRight(0, 4)).toBe(true);
  });

  test("should find diagonalDownLeft", () => {
    expect(grid.findDiagonalDownLeft(0, 0)).toBe(false);
    expect(grid.findDiagonalDownLeft(3, 9)).toBe(true);
  });

  test("should find diagonalUpRight", ()  => {
    expect(grid.findDiagonalUpRight(0, 0)).toBe(false);  // OUT OF BOUNDS
    expect(grid.findDiagonalUpRight(5, 0)).toBe(true);
  });

  test("should find diagonalUpLeft", () => {
    expect(grid.findDiagonalUpLeft(0, 0)).toBe(false);
    expect(grid.findDiagonalUpLeft(5, 6)).toBe(true);
  });
});

describe("Find XMAS diagonally", async() => {
  const input = await Bun.file(import.meta.dir + "/test.txt").text();
  const grid = new Grid(input);

  test("should find diagonalUpLeft", () => {
    expect(grid.findAll()).toBe(18);
  });
});

describe('Part 2 - Find X-MAS', () => { 
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
  const grid = new Grid(input);

  test(`should find all A's in input`, () => { 
    expect(grid.findAllAs().length).toBe(9)
   })

   test('should find M and S from A', () => {
      expect(grid.findMAndSFromA({row: 3, col: 2})).toBe(true)
    })
})