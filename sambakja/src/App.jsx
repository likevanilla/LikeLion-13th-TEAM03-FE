import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GlobalStyle from "./GlobalStyle";
import CommercialAnalysisReport from "./components/commercialAnalysisReport";
import PolicyGuidePage from "./pages/PolicyGuidePage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/re" element={<CommercialAnalysisReport />} />
        <Route path="/gu" element={<PolicyGuidePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
