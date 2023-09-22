import React from "react";
import "./App.css";
import Body from "./body/body";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import Hardware from "./hardware/hardware";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/hardware" element={<Hardware />} />

          <Route path="/" element={<Body />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
