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
import QuizResults from "./components/QuizResults";

import CarbsGoodBadSource from "./components/Carbs/CarbsGoodBadSource";
import ProteinGoodBadSource from "./components/Protein/ProteinGoodBadSource";
import FatsQualityModal from "./components/Fats/FatsQualityModal";
import FatsGoodBadSource from "./components/Fats/FatsGoodBadSource";

function App() {
  return (
    <div className="bg-green-200 app-box">
      <SimpleNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn/macros" element={<MacroMenu />} />
        <Route
          path="/learn/protein-source"
          element={<ProteinSortingGameSource />}
        />
        <Route
          path="/learn/carbs-source"
          element={<CarbsSortingGameSource />}
        />
        <Route path="/learn/fat-source" element={<FatsSortingGameSource />} />
        <Route path="/learn/breakdown" element={<Breakdown />} />
        <Route path="/quiz/" element={<Quiz />} />
        <Route path="/quiz/results" element={<QuizResults />} />
        <Route path="/learn/carbs-quality" element={<CarbsGoodBadSource />} />
        <Route
          path="/learn/protein-quality"
          element={<ProteinGoodBadSource />}
        />
        <Route path="/learn/fats-quality" element={<FatsGoodBadSource />} />
        {/*Add other paths here */}
      </Routes>
    </div>
  );
}

export default App;
