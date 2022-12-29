import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="bg-neutral-900 text-neutral-100">
      <Navbar />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
