import HomeHeader from "./HomeHeader";
import "./IndustryRecommendationReport.css";
import React, { useEffect, useState } from "react";
import { api } from "../apis/api";
import { useSearchParams, Link } from "react-router-dom";
// import BizFeature from"../components/BizFeature";
// import FirstRegion from "../components/FirstRegion";
// import SecondRegion from "../components/SecondRegion";

// function normalizeReport(raw) {
//   const r = raw ?? {};
//   const rep = r.report ?? {};
//   return {
//     bizFeature: r.biz_feature ?? "",
//     firstRegion: rep["첫 번째 상권"] ?? {},
//     secondRegion: rep["두 번째 상권"] ?? {},
//   };
// }

// const INITIAL = { biz_feature: "", firstRegion: {}, secondRegion: {} };

export default function IndustryRecommendationReport() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sp] = useSearchParams();
  const sex = sp.get("sex");
  const type_large = sp.get("type_large");
  const type_medium = sp.get("type_medium");
  const type_small = sp.get("type_small");
  const budget = sp.get("budget");

  async function postReport() {
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/api/biz/recommendation", {
        sex,
        type_large,
        type_medium,
        type_small,
        budget,
      });
      const data = normalizeReport(res.data);
      setReportData(data);
      console.log(reportData);
    } catch (e) {
      setError("데이터 전송 실패");
      // setReportData(INITIAL);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    postReport();
  }, [sex, type_large, type_medium, type_small, budget]);

  return (
    <div className="Report-wrapper">
      <HomeHeader />
      <div className="Text">업종 추천 분석 리포트 출력 완료되었어요!</div>
      <div classNmae="Biz-feature">
        {reportData?.biz_feature || "업종 추천 중..."}
      </div>
      <div className="Report-grid">
        {/* <FirstRegion FirstRegion={reportData.FirstRegion} /> */}
        <div className="Right-column">
          {/* <SecondRegion SecondRegion={reportData.SecondRegion} /> */}
        </div>
      </div>
      <Link to="/irq" className="Back">
        다른 업종 분석 리포트를 작성해드릴까요?
      </Link>
    </div>
  );
}
