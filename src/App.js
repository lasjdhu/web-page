import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-midnight text-white">
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
