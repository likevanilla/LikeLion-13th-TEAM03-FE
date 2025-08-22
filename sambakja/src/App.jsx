import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GlobalStyle from "./GlobalStyle";
import PolicyGuidePage from "./pages/PolicyGuidePage";
import AboutPage from "./pages/AboutPage";
import IndustryRecommendationQuestion from "./components/IndustryRecommendationQuestion";
import IndustryRecommendationReport from "./components/IndustryRecommendationReport";
import Map from "./components/KakaoMap";
import Inquiry from "./components/Inquiry";
import PolicyPage from "./pages/PolicyPage";
import CommercialAnalysisReportPage from "./pages/CommercialAnalysisReportPage";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/re" element={<CommercialAnalysisReportPage />} />
        <Route path="/gu" element={<PolicyGuidePage />} />
        <Route path="/ab" element={<AboutPage />} />
        <Route path="/irq" element={<IndustryRecommendationQuestion />} />
        <Route path="/irr" element={<IndustryRecommendationReport />} />
        <Route path="/map" element={<Map />} />
        <Route path="/in" element={<Inquiry />} />
        <Route path="/po" element={<PolicyPage />} />
      </Routes>
    </>
  );
}
