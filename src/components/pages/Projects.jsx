import React from "react";
import { NavLink } from "react-router-dom";
import Project from "../reusable/Project";

function Projects() {
  return (
    <main className="m-auto">
        <article className="text-center">
            <NavLink to="/projects/game-of-life" >
                <Project
                    title="Game of Life"
                    desc="Cellular automaton zero-player game, Evolution is determined by initial state, requiring no further input."
                />
            </NavLink>
            <a 
                href="https://github.com/re-roll/game-of-life" 
                className="text-center text-xl border-gray border-b border-dashed"
            >
                Source
            </a>
        </article>
    </main>
  );
}

export default Projects;
