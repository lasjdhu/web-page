import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Projects from "./components/pages/Projects";
import Contact from "./components/pages/Contact";
import GameOfLife from "./components/pages/projects/GameOfLife";

function App() {
  return (
    <div id="wrapper" className="bg-midnight text-white h-screen flex flex-col">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/game-of-life' element={<GameOfLife />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
    </Router>
    </div>
  );
}

export default App;
