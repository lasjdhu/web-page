import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import LoadingScreen from "./components/reusable/LoadingScreen"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Projects from "./components/pages/Projects";
import Contact from "./components/pages/Contact";

function App() {
  const [loading, setLoading] = useState(true);

  window.onload = () => {
    setLoading(false);
  };

  const history = createBrowserHistory();
  const componentRef = useRef(null);

  return (
    <div id="wrapper" className="bg-gradient-to-b from-midnight to-blue text-white min-h-screen flex flex-col">
    {loading && <LoadingScreen />}
      <Router>
        <Navbar />
          <main className="m-auto">
            <TransitionGroup>
            <CSSTransition key={history.location.pathname} timeout={2000} ref={componentRef} >               
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
            </CSSTransition>
            </TransitionGroup>
          </main>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
