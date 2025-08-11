import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GlobalStyle from "./GlobalStyle";
import CommercialAnalysisReport from "./components/commercialAnalysisReport";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/re" element={<CommercialAnalysisReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
