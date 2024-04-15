import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import MacroMenu from "./components/MacroMenu";

function App() {
  return (
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/learn/macros" element={<MacroMenu />}/>
                    {/*Add other paths here */}
                </Routes>
  );
}

export default App;
