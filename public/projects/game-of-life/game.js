class Cell {
  constructor(x, y, alive = false) {
    this.x = x;
    this.y = y;
    this.alive = alive;
  }
}

class Game {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.initGrid();
  }

  initGrid() {
    return Array.from({ length: this.rows }, (_, i) =>
      Array.from(
        { length: this.cols },
        (_, j) => new Cell(i, j, Math.random() > 0.5),
      ),
    );
  }

  getCell(x, y) {
    return this.grid[(x + this.rows) % this.rows][(y + this.cols) % this.cols];
  }

  getNeighbours(x, y) {
    const offsets = [-1, 0, 1];
    return offsets
      .flatMap((dx) =>
        offsets.map((dy) =>
          // Exclude the cell itself from the neighbours
          dx !== 0 || dy !== 0 ? this.getCell(x + dx, y + dy) : null,
        ),
      )
      .filter(Boolean);
  }

  aliveNeighbours(x, y) {
    return this.getNeighbours(x, y).reduce(
      (count, neighbour) => count + neighbour.alive,
      0,
    );
  }

  nextGeneration() {
    const nextGeneration = this.initGrid();
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cell = this.getCell(i, j);
        const aliveNeighbours = this.aliveNeighbours(i, j);
        if (
          (cell.alive && (aliveNeighbours === 2 || aliveNeighbours === 3)) ||
          (!cell.alive && aliveNeighbours === 3)
        ) {
          nextGeneration[i][j].alive = true;
        } else {
          nextGeneration[i][j].alive = false;
        }
      }
    }
    this.grid = nextGeneration;
  }

  randomize() {
    this.grid.forEach((row) =>
      row.forEach((cell) => (cell.alive = Math.random() > 0.5)),
    );
  }

  clear() {
    this.grid.forEach((row) => row.forEach((cell) => (cell.alive = false)));
  }

  allCellsDead() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (this.grid[i][j].alive) {
          return false;
        }
      }
    }
    return true;
  }
}
