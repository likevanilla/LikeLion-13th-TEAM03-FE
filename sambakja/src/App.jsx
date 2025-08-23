import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GlobalStyle from "./GlobalStyle";
import AboutPage from "./pages/AboutPage";
import IndustryRecommendationQuestion from "./components/IndustryRecommendationQuestion";
import Map from "./components/KakaoMap";
import Inquiry from "./components/Inquiry";
import PolicyPage from "./pages/PolicyPage";
import CommercialAnalysisReportPage from "./pages/CommercialAnalysisReportPage";
import IndustryRecommendationReportPage from "./pages/IndustryRecommendationReportPage";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/re" element={<CommercialAnalysisReportPage />} />
        <Route path="/ab" element={<AboutPage />} />
        <Route path="/irq" element={<IndustryRecommendationQuestion />} />
        <Route path="/irr" element={<IndustryRecommendationReportPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/in" element={<Inquiry />} />
        <Route path="/po" element={<PolicyPage />} />
      </Routes>
    </>
  );
}
