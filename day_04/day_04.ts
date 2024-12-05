class Grid
  {
    private width: number;
    private height: number;
    
    constructor(private grid: string[][]) {
      this.width = grid.length;
      this.height = grid[0].length;
    }
  
    getGrid(): string[][] {
        return this.grid;
    }

    findRight(x: number, y: number): boolean {
      let result = false;
      // console.log("x", x, "y", y, "length", this.grid[0][0].length, "jobber", this.grid[0][0]);
      if (x < this.width - 3) {
        const part = `${this.grid[x][y]}${this.grid[x + 1][y]}${this.grid[x + 2][y]}${this.grid[x + 3][y]}`;
        console.log("jobber", part);
        result = part === 'XMAS' gs;
      }
      return result;
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