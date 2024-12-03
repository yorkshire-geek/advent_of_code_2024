// import * as fs from 'fs';

// const input = fs.readFileSync('day_03/data.test.txt', 'utf8');

const file = Bun.file("data.input.txt");
const data = await file.text();

const mulRegex = /mul\((\d+),(\d+)\)/g;
const matches = [...data.matchAll(mulRegex)];

const multiplications = matches.map(match => ({
  x: parseInt(match[1]),
  y: parseInt(match[2])
}));

console.log(multiplications);
const total = multiplications.reduce((sum, { x, y }) => sum + (x * y), 0);
console.log("Total:", total);
