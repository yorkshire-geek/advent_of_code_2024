class Grid {
  private readonly WIDTH: number;
  private readonly HEIGHT: number;
  private readonly XMAS = 'XMAS';
  private readonly WORD_LENGTH = 4;

  constructor(private grid: string[][]) {
    this.WIDTH = grid.length;
    this.HEIGHT = grid[0].length;
  }

  getGrid(): string[][] {
    return this.grid;
  }

  findAll(): number {
    let count = 0;
    for (let x = 0; x < this.WIDTH; x++) {
      for (let y = 0; y < this.HEIGHT; y++) {
        if (this.findRight(x, y)) count++;
        if (this.findLeft(x, y)) count++;
        if (this.findUp(x, y)) count++;
        if (this.findDown(x, y)) count++;
        if (this.findNorthEast(x, y)) count++;
        if (this.findNorthWest(x, y)) count++;
        if (this.findSouthEast(x, y)) count++;
        if (this.findSouthWest(x, y)) count++;
      }
    }
    return count;
  }

  private getWord(x: number, y: number, xOffset: number, yOffset: number): string {
    let word = '';
    for (let i = 0; i < this.WORD_LENGTH; i++) {
      const newX = x + (xOffset * i);
      const newY = y + (yOffset * i);
      if (!this.isInBounds(newX, newY)) return '';
      word += this.grid[newX][newY];
    }
    return word;
  }

  private isInBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.WIDTH && y >= 0 && y < this.HEIGHT;
  }

  public findRight(x: number, y: number): boolean {
    if (x >= this.WIDTH - (this.WORD_LENGTH - 1)) return false;
    return this.getWord(x, y, 1, 0) === this.XMAS;
  }

  public findLeft(x: number, y: number): boolean {
    if (x < this.WORD_LENGTH - 1 || x >= this.WIDTH) return false;
    return this.getWord(x, y, -1, 0) === this.XMAS;
  }

  public findUp(x: number, y: number): boolean {
    if (y > this.HEIGHT - this.WORD_LENGTH) return false;
    return this.getWord(x, y, 0, 1) === this.XMAS;
  }

  public findDown(x: number, y: number): boolean {
    if (y < this.WORD_LENGTH - 1 || y >= this.HEIGHT) return false;
    return this.getWord(x, y, 0, -1) === this.XMAS;
  }

  public findNorthEast(x: number, y: number): boolean {
    if (x >= this.WIDTH - (this.WORD_LENGTH - 1) || y >= this.HEIGHT - (this.WORD_LENGTH - 1)) return false;
    return this.getWord(x, y, 1, 1) === this.XMAS;
  }

  public findNorthWest(x: number, y: number): boolean {
    if (x < this.WORD_LENGTH - 1 || y >= this.HEIGHT - (this.WORD_LENGTH - 1)) return false;
    return this.getWord(x, y, -1, 1) === this.XMAS;
  }

  public findSouthEast(x: number, y: number): boolean {
    if (x >= this.WIDTH - (this.WORD_LENGTH - 1) || y < this.WORD_LENGTH - 1) return false;
    return this.getWord(x, y, 1, -1) === this.XMAS;
  }

  public findSouthWest(x: number, y: number): boolean {
    if (x < this.WORD_LENGTH - 1 || y < this.WORD_LENGTH - 1) return false;
    return this.getWord(x, y, -1, -1) === this.XMAS;
  }

  public findPattern(x: number, y: number, pattern: string): boolean {
    if (x > this.WIDTH - 3 || y < 2) return false;

    const part = this.grid[x][y] + this.grid[x + 2][y] + this.grid[x + 1][y - 1] + this.grid[x][y - 2] + this.grid[x + 2][y - 2];
    return part === pattern;
  }

  public findX_MasPattern(): number {
    let count = 0;
    for (let x = 0; x < this.WIDTH; x++) {
      for (let y = 0; y < this.HEIGHT; y++) {
        if (this.findPattern(x, y, "MSAMS")) count++;
        if (this.findPattern(x, y, "SMASM")) count++;
        if (this.findPattern(x, y, "MMASS")) count++;
        if (this.findPattern(x, y, "SSAMM")) count++; 
      }
    }
    return count;
  }
}

export function gridFactory(input: string): Grid {
  const lines = input.trim().split('\n');
  const height = lines.length;
  const width = lines[0].length;

  const grid: string[][] = Array(width).fill(null).map(() => Array(height).fill(''));

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      grid[x][height - 1 - y] = lines[y][x]; // Flip y coordinate to make bottom-left the origin
    }
  }

  return new Grid(grid);
}

async function main() {
  const data = await Bun.file(import.meta.dir + "/data.input.txt").text();
  const grid = gridFactory(data);

  console.log("Question 1: Total XMAS count:", grid.findAll()); // 2644
  console.log("Question 2: Total pattern count:", grid.findX_MasPattern()); // 1952
}

if (import.meta.main) {
  main();
}