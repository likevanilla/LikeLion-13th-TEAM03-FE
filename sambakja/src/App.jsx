import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GlobalStyle from "./GlobalStyle";
import CommercialAnalysisReport from "./components/commercialAnalysisReport";
import PolicyGuidePage from "./pages/PolicyGuidePage";
import IndustryRecommendationQuestion from "./components/IndustryRecommendationQuestion";
import IndustryRecommendationReport from "./components/IndustryRecommendationReport";
import Inquiry from "./components/Inquiry";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/re" element={<CommercialAnalysisReport />} />
        <Route path="/gu" element={<PolicyGuidePage />} />
        <Route
          path="/industry-recommendation-question"
          element={<IndustryRecommendationQuestion />}
        />
        <Route
          path="/industry-report"
          element={<IndustryRecommendationReport />}
        />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
