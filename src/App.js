import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-midnight text-white min-h-screen flex flex-col">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
