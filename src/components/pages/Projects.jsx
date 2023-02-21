import React from "react";
import Box from "../reusable/Box";

function Projects() {
  return (
    <main className="m-auto">
        <Box
            title="Game of Life"
            to="/projects/game-of-life"
            src="https://github.com/re-roll/game-of-life"
            desc="Cellular automaton zero-player game, Evolution is determined by initial state, requiring no further input."
        />
    </main>
  );
}

export default Projects;
