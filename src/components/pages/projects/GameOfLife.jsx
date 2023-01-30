import React, { useState, useEffect } from 'react';
import Game from './game.js';

const GameOfLife = () => {
  const canvasRef = React.useRef(null);
  const [running, setRunning] = useState(false);
  const [game] = useState(new Game(50, 50));
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cellSize = 10;

    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < game.rows; i++) {
        for (let j = 0; j < game.cols; j++) {
          const cell = game.getCell(i, j);
          if (cell.isAlive()) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
      }
    }

    function gameLoop() {
      if (running) game.nextGeneration();
    }

    function drawLoop() {
      drawGrid();
      requestAnimationFrame(drawLoop);
    }

    setIntervalId(setInterval(gameLoop, 500));
    window.requestAnimationFrame(drawLoop);

    return () => clearInterval(intervalId);
  }, [running, game]);

  const handleRandomize = () => {
    game.randomize();
  };

  const handleClear = () => {
    game.clear();
  };

  const handleStart = () => {
    setRunning(true);
  };

  const handleStop = () => {
    setRunning(false);
  };
	return (
	    <div className="m-auto">
          <h1 className="text-center text-5xl m-5">Game of Life</h1>
	      	<div className="flex justify-center">
	        	<button 
              className="m-5 px-4 py-2 border hover:bg-white hover:text-midnight hover:border-transparent duration-300" 
              onClick={handleRandomize}
            >
	          		randomize
	        	</button>
	        	<button 
              className="m-5 px-4 py-2 border hover:bg-white hover:text-midnight hover:border-transparent duration-300" 
              onClick={handleClear}
            >
	          		clear
	        	</button>
	        	<button 
              className="m-5 px-4 py-2 border hover:bg-white hover:text-midnight hover:border-transparent duration-300"  
              onClick={handleStart}
            >
	          		start
	        	</button>
	        	<button 
              className="m-5 px-4 py-2 border hover:bg-white hover:text-midnight hover:border-transparent duration-300" 
              onClick={handleStop}
            >
	          		stop
	        	</button>
	      	</div>
	      	<canvas className="flex justify-center items-center border p-4" ref={canvasRef} width={500} height={300} />
	    </div>
	  );
};

export default GameOfLife;
