class Cell {
  constructor(x, y, alive = false) {
    this.x = x;
    this.y = y;

    this.alive = alive;
  }

  isAlive() {
    return this.alive;
  }

  toggle() {
    this.alive = !this.alive;
  }
}

class Game extends Cell {
  constructor(rows, cols) {
    super();

    this.rows = rows;
    this.cols = cols;

    this.grid = this.initGrid();
  }

  initGrid() {
    const grid = [];
    for (let i = 0; i < this.rows; i++) {
      grid[i] = [];
      for (let j = 0; j < this.cols; j++) {
        grid[i][j] = new Cell(i, j, Math.random() > 0.5 ? true : false);
      }
    }
    return grid;
  }

  getCell(x, y) {
    return this.grid[x][y];
  }

  getNeighbours(x, y) {
    const neighbours = [];
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        const row = (x + i + this.rows) % this.rows;
        const col = (y + j + this.cols) % this.cols;
        neighbours.push(this.getCell(row, col));
      }
    }
    return neighbours;
  }

  aliveNeighbours(x, y) {
    let neighbours = this.getNeighbours(x, y);
    let aliveNeighbours = 0;
    neighbours.forEach((neighbour) => {
      if (neighbour.isAlive()) {
        aliveNeighbours++;
      }
    });
    return aliveNeighbours;
  }

  nextGeneration() {
    let nextAlive = false;
    const nextGeneration = this.initGrid();
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const cell = this.getCell(i, j);
        const aliveNeighbours = this.aliveNeighbours(i, j);
        if (cell.isAlive() && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
          nextAlive = false;
        } else if (!cell.isAlive() && aliveNeighbours === 3) {
          nextAlive = true;
        } else {
          nextAlive = cell.isAlive();
        }
        nextGeneration[i][j].alive = nextAlive;
      }
    }

    this.grid = nextGeneration;
  }

  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.getCell(i, j).alive = Math.random() > 0.5 ? true : false;
      }
    }
  }

  clear() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.getCell(i, j).alive = false;
      }
    }
  }
}
