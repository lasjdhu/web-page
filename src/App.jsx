import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import GameOfLife from './pages/projects/GameOfLife';

function App() {
	return (
		<div
			id="wrapper"
			className="min-h-screen flex flex-col text-white bg-gradient-to-b from-midnight to-blue"
		>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/projects" element={<Projects />} />
					<Route
						path="/projects/game-of-life"
						element={<GameOfLife />}
					/>
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</Router>
			<Footer />
		</div>
	);
}

export default App;
