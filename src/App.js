import React from "react";
import "./App.css";
import Body from "./views/body/body";
import Navbar from "./views/navbar/navbar";
import Footer from "./views/footer/footer";
import Hardware from "./views/hardware/hardware";
import DetalleHardware from "./views/hardware/detalleHardware";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/hardware" element={<Hardware />} />

          <Route path="/hardware/:equipo" element={<DetalleHardware/>} />

          <Route path="/" element={<Body />} />

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
