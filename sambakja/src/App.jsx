import { Routes, Route, Navigate } from "react-router-dom";
import CommercialAnalysisReport from "./components/CommercialAnalysisReport";
import IndustryRecommendationReport from "./components/IndustryRecommendationReport";
import IndustryRecommendationQuestion from "./components/IndustryRecommendationQuestion";
import Inquiry from "./components/Inquiry";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndustryRecommendationQuestion />} />
      <Route
        path="/industry-report"
        element={<IndustryRecommendationReport />}
      />
      <Route path="/commercial-report" element={<CommercialAnalysisReport />} />
      <Route path="/inquiry" element={<Inquiry />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
