const canvas = document.querySelector(".gameCanvas");
const ctx = canvas.getContext("2d");

const cellSize = 15;
const rows = ctx.canvas.width / cellSize;
const cols = ctx.canvas.height / cellSize;

const game = new Game(rows, cols);

window.onload = () => {
  const drawGrid = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell.alive) {
          ctx.fillStyle = "rgba(255, 255, 255, 1)";
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0)";
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      });
    });
  };

  let running = false;
  let drawing = false;

  const handleMouseDown = (event) => {
    drawing = true;
    handleMouseMove(event);
  };

  const handleMouseUp = () => {
    drawing = false;
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    game.grid[x][y].alive = true;
  };

  const handleRandomize = () => {
    running = false;
    game.randomize();
  };

  const handleClear = () => {
    running = false;
    game.clear();
  };

  const handleStop = () => {
    running = false;
  };

  const handleStart = () => {
    running = true;
  };

  const gameLoop = () => {
    if (running) {
      game.nextGeneration();
      if (game.allCellsDead()) {
        running = false;
      }
    }
  };

  const drawLoop = () => {
    drawGrid();
    requestAnimationFrame(drawLoop);
  };

  document
    .querySelector(".randomizeButton")
    .addEventListener("click", handleRandomize);
  document.querySelector(".clearButton").addEventListener("click", handleClear);
  document.querySelector(".stopButton").addEventListener("click", handleStop);
  document.querySelector(".startButton").addEventListener("click", handleStart);
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mousemove", handleMouseMove);

  setInterval(gameLoop, 500);
  window.requestAnimationFrame(drawLoop);
};
