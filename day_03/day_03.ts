export const MUL_REGEX = /mul\((\d+),(\d+)\)/g;

export function findMatches(input: string, regex: RegExp): RegExpMatchArray[] {
  return [...input.matchAll(regex)];
}

export function getMultiplications(matches: RegExpMatchArray[]): { x: number, y: number }[] {
  return matches.map(match => ({
    x: parseInt(match[1]),
    y: parseInt(match[2])
  }));
}

export function parseDosAndDonts(input: string) : string {
  let result = "";
  const parts = input.split("do()");
  parts.forEach((part, i) => {
    result += part.split("don't()")[0];
    
  });
  return result;
}

// if (import.meta.main) {
//   main();
// }

  const file = Bun.file("./day_03/data.input.txt");
  const data = await file.text();

  const matches = findMatches(data, MUL_REGEX);
  const multiplications = getMultiplications(matches);
  const total = multiplications.reduce((sum, { x, y }) => sum + (x * y), 0);
  console.log("part one:", total);  // 179834255

  const parsedData = parseDosAndDonts(data);
  const matches2 = findMatches(parsedData, MUL_REGEX);
  const multiplications2 = getMultiplications(matches2);
  const total2 = multiplications2.reduce((sum, { x, y }) => sum + (x * y), 0);
  console.log("part two:", total2);  // 179834255

