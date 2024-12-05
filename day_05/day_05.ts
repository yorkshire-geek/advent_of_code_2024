interface Rule {
  before: number;
  after: number;
}

export async function readData(input: string) {
  const text = await Bun.file(input).text();
  const [rulesStr, pagesStr] = text.split('\n\n');
  const rules: Rule[] = rulesStr.split('\n').map(rule => {
    const [before, after] = rule.split('|').map(Number);
    return { before, after };
  });
  const pages = pagesStr.split('\n').map(page => page.split(',').map(Number));
  return { rules, pages };
}

export function validatePage(page: number[], rules: Rule[]): number {
    for (const rule of rules) {
        if (page.includes(rule.before) && page.includes(rule.after)) {
            if (page.indexOf(rule.before) > page.indexOf(rule.after)) {
                return 0;
            }
        }
    }
    return getMidValue(page)
}

export function validatePagesAndAddScores(pages: number[][], rules: Rule[]): number {
  return pages.reduce((sum, page) => sum + validatePage(page, rules), 0);
}

export function validateReorderAndAddScores(pages: number[][], rules: Rule[]): number {
  return pages.reduce((sum, page) => {
    if (validatePage(page, rules) === 0) {
      return sum + getMidValue(reorderPage(page, rules));
    }
    return sum;
  }, 0);
}

export function reorderPage(page: number[], rules: Rule[]): number[] {
  const result = [...page];
  
  // Bubble sort with rules
  let swapped: boolean;
  do {
    swapped = false;
    for (let i = 0; i < result.length - 1; i++) {
      const a = result[i];
      const b = result[i + 1];
      
      // If numbers need to be swapped based on rules
      if (rules.some(rule => rule.before === b && rule.after === a)) {
        [result[i], result[i + 1]] = [result[i + 1], result[i]];
        swapped = true;
      }
    }
  } while (swapped);

  return result;
}

function getMidValue(page: number[]): number {
  return page[Math.floor(page.length / 2)];
}

async function main() {
  const { rules, pages } = await readData(import.meta.dir + "/input.txt");
  console.log("Question 1:", validatePagesAndAddScores(pages, rules));
  console.log("Question 2:", validateReorderAndAddScores(pages, rules));  // 3062
}

if (import.meta.main) {
  main();
}
