import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import MacroMenu from "./components/MacroMenu";
import { SimpleNavbar } from "./components/SimpleNavbar";
import Learn from "./components/Learn";
import ProteinSortingGameSource from "./components/Protein/ProteinSortingGameSource";
import FatsSortingGameSource from "./components/Fats/FatsSortingGameSource";
import CarbsSortingGameSource from "./components/Carbs/CarbsSortingGameSource";
import Breakdown from "./components/Breakdown";
import Quiz from "./components/Quiz";



function App() {
  return (
    <>
      <SimpleNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/macros" element={<MacroMenu />} />
        <Route path="/learn/protein-source" element={<ProteinSortingGameSource />} />
        <Route path="/learn/carbs-source" element={<CarbsSortingGameSource />} />
        <Route path="/learn/fat-source" element={<FatsSortingGameSource />} />
        <Route path="/learn/breakdown" element={<Breakdown />} />
        <Route path="/quiz" element={<Quiz />} />
        {/*Add other paths here */}
      </Routes>
    </>
  );
}

export default App;
