const file = Bun.file("data.txt");
const data = await file.text();

const [array1, array2] = data
  .trim()
  .split('\n')
  .map(line => {
    const [num1, num2] = line.trim().split(/\s+/).map(Number);
    return [num1, num2];
  })
  .reduce<[number[], number[]]>(
    ([arr1, arr2], [num1, num2]) => {
      arr1.push(num1);
      arr2.push(num2);
      return [arr1, arr2];
    },
    [[], []]
  );

  console.log("question A:", calculateDistance(array1, array2));
  console.log("question B:", calculateSimilarity(array1, array2));


export function calculateDistance(input1: number[], input2: number[]): number {
  const array1 = [...input1].sort((a, b) => a - b);
  const array2 = [...input2].sort((a, b) => a - b);

  let distance = 0;
  for (let n = 0; n < array1.length; n++) {
    distance += Math.abs(array1[n] - array2[n]);
  }
  return distance;
}

export function calculateSimilarity(input1: number[], input2: number[]): number {
  const array1 = [...input1];
  const array2 = [...input2];

  let result = 0;
  for (let n = 0; n < array1.length; n++) {
    result += array2.reduce((acc, num) => (num === array1[n] ? acc + 1 : acc), 0) * array1[n];
  }
  return result;
}