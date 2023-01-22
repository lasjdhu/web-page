import React from "react";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contacts from "./Contacts";

function Main() {
  return (
      <main className="mb-auto">
            <Home />
            <About />
            <Projects />
            <Contacts />
      </main>
      );
}

export default Main;