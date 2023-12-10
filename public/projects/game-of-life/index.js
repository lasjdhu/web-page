const canvas = document.querySelector(".gameCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 10;
const rows = ctx.canvas.width / cellSize;
const cols = ctx.canvas.height / cellSize;

const game = new Game(rows, cols);

window.onload = () => {
  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < game.rows; i++) {
      for (let j = 0; j < game.cols; j++) {
        const cell = game.getCell(i, j);
        if (cell.isAlive()) {
          ctx.fillStyle = "#fff";
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  let running = false;

  const random = document.querySelector(".randomizeButton");
  random.addEventListener("click", () => {
    game.randomize();
  });

  document.querySelector(".clearButton").addEventListener("click", () => {
    game.clear();
  });

  document.querySelector(".stopButton").addEventListener("click", () => {
    running = false;
  });

  document.querySelector(".startButton").addEventListener("click", () => {
    running = true;
  });

  function gameLoop() {
    if (running) game.nextGeneration();
  }

  function drawLoop() {
    drawGrid();
    requestAnimationFrame(drawLoop);
  }

  setInterval(gameLoop, 500);
  window.requestAnimationFrame(drawLoop);
};
