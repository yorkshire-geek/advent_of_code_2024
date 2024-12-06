const file = await Bun.file(import.meta.dir + "/test.txt").text();

class Grid {
  grid: string[][];

  constructor(input: string) {
    this.grid = input
      .trim()
      .split("\n")
      .map(line => line.split(""));
  }

  findRight(x: number, y: number): boolean {
    const row = this.grid[x] || [];
    return row.slice(y, y + 4).join('') === 'XMAS';
  }

  findLeft(x: number, y: number): boolean {
    const row = this.grid[x] || [];
    console.log("row", row);
    const part = row.slice(y - 3, y + 1).reverse().join('')
    return part === 'XMAS';
  }

  findDown(x: number, y: number): boolean {
    const column: string[] = [];
    console.log("column", column);
    for (let i = 0; i < 4; i++) {
      if (!this.grid[x + i]) return false;
      column.push(this.grid[x + i][y]);
    }
    return column.join('') === 'XMAS';
  }

  findUp(x: number, y: number): boolean {
    const column: string[] = [];
    for (let i = 0; i < 4; i++) {
      if (!this.grid[x - i]) return false;
      column.push(this.grid[x - i][y]);
    }
    return column.join('') === 'XMAS';
  }

  findDiagonalDownRight(x: number, y: number): boolean {
    const diagonal: string[] = [];
    for (let i = 0; i < 4; i++) {
      if (!this.grid[x + i] || !this.grid[x + i][y + i]) return false;
      diagonal.push(this.grid[x + i][y + i]);
    }
    return diagonal.join('') === 'XMAS';
  }

  findDiagonalDownLeft(x: number, y: number): boolean {
    const diagonal: string[] = [];
    for (let i = 0; i < 4; i++) {
      if (!this.grid[x + i] || !this.grid[x + i][y - i]) return false;
      diagonal.push(this.grid[x + i][y - i]);
    }
    return diagonal.join('') === 'XMAS';
  }

  findDiagonalUpRight(x: number, y: number): boolean {
    const diagonal: string[] = [];
    for (let i = 0; i < 4; i++) {
      if (!this.grid[x - i] || !this.grid[x - i][y + i]) return false;
      diagonal.push(this.grid[x - i][y + i]);
    }
    return diagonal.join('') === 'XMAS';
  }

  findDiagonalUpLeft(x: number, y: number): boolean {
    const diagonal: string[] = [];
    for (let i = 0; i < 4; i++) {
      if (!this.grid[x - i] || !this.grid[x - i][y - i]) return false;
      diagonal.push(this.grid[x - i][y - i]);
    }
    return diagonal.join('') === 'XMAS';
  }
}

export function setupGrid(input: string): Grid {
  return new Grid(input);
}



