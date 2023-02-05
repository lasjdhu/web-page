import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from "./components/reusable/LoadingScreen"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Projects from "./components/pages/Projects";
import Contact from "./components/pages/Contact";

function App() {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [])

  return (
    <div id="wrapper" className="bg-gradient-to-b from-midnight to-blue text-white min-h-screen flex flex-col">
    {loading && <LoadingScreen />}
      <Router>
<<<<<<< HEAD
        <Navbar />         
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About/>} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/projects/game-of-life' render={() => {
              window.location.href = '/projects/game-of-life/index.html'
              return null
            }} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
=======
        <Navbar />
          <main className="m-auto">           
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About/>} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/projects/game-of-life' render={() => {
                window.location.href = '/projects/game-of-life/index.html'
                return null
              }} />
              <Route path='/contact' element={<Contact />} />
            </Routes>
          </main>
>>>>>>> 0266218ebb38af3f67b35c09065d7219eecf9649
        <Footer />
      </Router>
    </div>
  );
}

export default App;