export {};

export class GameGrid {

  static factory(input: string): GameGrid {
    const grid = input.trim().split("\n").map(line => line.split(""));
    return new GameGrid(grid);
  }

  readonly WIDTH: number;
  readonly HEIGHT: number;

  constructor(private grid: string[][]) {
    this.HEIGHT = grid.length;
    this.WIDTH = grid[0].length;
  }

  public getGrid(): string[][] {
    return this.grid;
  }

  private getStartingLocation(): [number, number] {
    for (let x = 0; x < this.WIDTH; x++) {
      for (let y = 0; y < this.HEIGHT; y++) {
        if (this.grid[x][y] === '^') {
          return [x, y];
        }
      }
    }
    throw new Error("No starting position found");
  }
}
