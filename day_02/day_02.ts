const file = Bun.file("./day_02/data.txt");
const data = await file.text();

const arrays = data
  .trim()
  .split('\n')
  .map(line => line.trim().split(/\s+/).map(Number));

const safeCount = arrays.reduce((count, element) => {
  return calculateSafe(element) ? count + 1 : count;
}, 0);
// console.log(`Number of safe arrays: ${safeCount}`);

const safeWithLifeCount = arrays.reduce((count, element) => {
  const result = calculateSafeWithSinglelife(element);
  // console.log(`Input: ${element}, Result: ${result}`);
  return result ? count + 1 : count;
}, 0);
// console.log(`Number of safe arrays with single life: ${safeWithLifeCount}`);


export function calculateSafe(input: number[]) : boolean {
  return checkAscending(input, 0) || checkDescending(input,0);
}

export function calculateSafeWithSinglelife(input: number[]) : boolean {
  return checkAscending(input, 1) || checkDescending(input, 1);
}

function checkAscending(input: number[], lives: number): boolean {
  for (let i = 0; i < input.length - 1; i++) {
    const difference = input[i] - input[i + 1];
    if (difference >= 0 || difference < -3) {
      if (lives > 0) {
        lives--;

        if ( i == input.length - 2 ) { // if it has got to the 2nd to last clear, it is valid.
          return true;
        }

        const new_array = input.filter((_, index) => index !== i);
        const new_array_2 = input.filter((_, index) => index !== i+1);
        
        return checkAscending(new_array, 0) || checkAscending(new_array_2, 0);
      } else {
        return false;
      }
    }
  }
  return true;
}

function checkDescending(input: number[], lives: number): boolean {

  for (let i = 0; i < input.length - 1; i++) {
    const difference = input[i] - input[i + 1];
    if (difference <= 0 || difference > 3) {
      if (lives > 0) {
        lives--;

        if ( i == input.length - 2 ) { // if it has got to the 2nd to last clear, it is valid.
          return true;
        }

        const new_array = input.filter((_, index) => index !== i);
        const new_array_2 = input.filter((_, index) => index !== i+1);

        return checkDescending(new_array, 0) || checkDescending(new_array_2, 0);

      } else {
        return false;
      }
    }
  }
  return true;
}



