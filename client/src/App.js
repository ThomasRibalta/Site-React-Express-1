import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Realisation from "./pages/realisation";
import Realisations from "./pages/realisations";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/realisation/*" element={<Realisation />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/Realisation/*" element={<Realisation />} />
          <Route path="/Realisations" element={<Realisations />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
