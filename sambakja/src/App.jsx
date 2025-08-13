import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GlobalStyle from "./GlobalStyle";
import CommercialAnalysisReport from "./components/commercialAnalysisReport";
import PolicyGuidePage from "./pages/PolicyGuidePage";
import AboutPage from "./pages/AboutPage";
import IndustryRecommendationQuestion from "./components/IndustryRecommendationQuestion";
import IndustryRecommendationReport from "./components/IndustryRecommendationReport";
import Map from "./components/KakaoMap";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/re" element={<CommercialAnalysisReport />} />
        <Route path="/gu" element={<PolicyGuidePage />} />
        <Route path="/ab" element={<AboutPage />} />
        <Route path="/irq" element={<IndustryRecommendationQuestion />} />
        <Route path="/irr" element={<IndustryRecommendationReport />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
