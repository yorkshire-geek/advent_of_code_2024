import { describe, expect, test } from "bun:test";
import { MUL_REGEX, findMatches , getMultiplications, parseDosAndDonts } from "./day_03";

describe("Day 3 Part One", () => {
  const input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';
  const matches = findMatches(input, MUL_REGEX);

  test("should correctly multiply numbers from input", () => {
    
    expect(matches.map(match => match[0])).toEqual([
      "mul(2,4)",
      "mul(5,5)", 
      "mul(11,8)",
      "mul(8,5)"
    ]);

  });

  test("should correctly get multiplications from matches", () => {
    
    const multiplications = getMultiplications(matches);
    
    expect(multiplications).toEqual([
      { x: 2, y: 4 },
      { x: 5, y: 5 },
      { x: 11, y: 8 },
      { x: 8, y: 5 }
    ]);

  });

});

describe("Day 3 Part Two", () => {

  test("should correctly parse dos and donts", () => {
  const input = 'xmul(2,4)&mul[3,7]!^don\'t()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))';
  const parsedInput = parseDosAndDonts(input);
  expect(parsedInput).toEqual('xmul(2,4)&mul[3,7]!^?mul(8,5))');
  });
  
});
