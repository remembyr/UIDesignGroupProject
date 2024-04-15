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

function App() {
  return (
    <>
      <SimpleNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/macros" element={<MacroMenu />} />
        {/*Add other paths here */}
      </Routes>
    </>
  );
}

export default App;
