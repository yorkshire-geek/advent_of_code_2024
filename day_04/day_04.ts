class Grid {
  private readonly width: number;
  private readonly height: number;
  private readonly XMAS = 'XMAS';
  private readonly WORD_LENGTH = 4;
  
  constructor(private grid: string[][]) {
    this.width = grid.length;
    this.height = grid[0].length;
  }

  getGrid(): string[][] {
    return this.grid;
  }

    findAll(): number {
      let count = 0;
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
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
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  public findRight(x: number, y: number): boolean {
    if (x >= this.width - (this.WORD_LENGTH - 1)) return false;
    return this.getWord(x, y, 1, 0) === this.XMAS;
  }

  public findLeft(x: number, y: number): boolean {
    if (x < this.WORD_LENGTH - 1 || x >= this.width) return false;
    return this.getWord(x, y, -1, 0) === this.XMAS;
  }

  public findUp(x: number, y: number): boolean {
    if (y > this.height - this.WORD_LENGTH) return false;
    return this.getWord(x, y, 0, 1) === this.XMAS;
  }

  public findDown(x: number, y: number): boolean {
    if (y < this.WORD_LENGTH - 1 || y >= this.height) return false;
    return this.getWord(x, y, 0, -1) === this.XMAS;
  }

  public findNorthEast(x: number, y: number): boolean {
    if (x >= this.width - (this.WORD_LENGTH - 1) || y >= this.height - (this.WORD_LENGTH - 1)) return false;
    return this.getWord(x, y, 1, 1) === this.XMAS;
  }

  public findNorthWest(x: number, y: number): boolean {
    if (x < this.WORD_LENGTH - 1 || y >= this.height - (this.WORD_LENGTH - 1)) return false;
    return this.getWord(x, y, -1, 1) === this.XMAS;
  }

  public findSouthEast(x: number, y: number): boolean {
    if (x >= this.width - (this.WORD_LENGTH - 1) || y < this.WORD_LENGTH - 1) return false;
    return this.getWord(x, y, 1, -1) === this.XMAS;
  }

  public findSouthWest(x: number, y: number): boolean {
    if (x < this.WORD_LENGTH - 1 || y < this.WORD_LENGTH - 1) return false;
    return this.getWord(x, y, -1, -1) === this.XMAS;
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

  console.log("Question 1: Total XMAS count:", grid.findAll());
}

if (import.meta.main) {
  main();
}