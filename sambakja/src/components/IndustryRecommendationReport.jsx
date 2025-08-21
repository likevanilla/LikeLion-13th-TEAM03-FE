import HomeHeader from "./HomeHeader";
import "/src/style/IndustryRecommendationReport.css";
import { useEffect, useState } from "react";
import { api } from "../apis/api";
import { useSearchParams } from "react-router-dom";

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
      const data = res.data;
      setReportData(data);
      console.log(reportData);
    } catch (e) {
      setError("데이터 전송 실패");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    postReport();
  }, [sex, type_large, type_medium, type_small, budget]);

  return (
    <div>
      <HomeHeader />
      <header>
        <div>업종 추천 분석 리포트 출력 완료되었습니다!</div>
      </header>
      <article>
        <div className="Report">
          <div className="Industry">
            {reportData?.type_small || "업종 로딩 중..."}
          </div>
          <div className="Industry-explanation">
            {reportData?.biz_feature || "로딩 중..."}
          </div>
          <ol>
            <li>
              {reportData?.recommendation[0]?.region || "상권 로딩 중..."}
            </li>
            <ul>
              <li>{reportData?.recommendation[0]?.유동인구 || "로딩 중..."}</li>
              <li>{reportData?.recommendation[0]?.직장인구 || "로딩 중..."}</li>
              <li>{reportData?.recommendation[0]?.연령층 || "로딩 중..."}</li>
              <li>{reportData?.recommendation[0]?.임대료 || "로딩 중..."}</li>
              <li>{reportData?.recommendation[0]?.상권특징 || "로딩 중..."}</li>
            </ul>
            <li>
              {reportData?.recommendation[1]?.region || "상권 로딩 중..."}
            </li>
            <ul>
              <li>{reportData?.recommendation[1]?.유동인구 || "로딩 중..."}</li>
              <li>{reportData?.recommendation[1]?.직장인구 || "로딩 중..."}</li>
              <li>{reportData?.recommendation[1]?.연령층 || "로딩 중..."}</li>
              <li>{reportData?.recommendation[1]?.임대료 || "로딩 중..."}</li>
              <li>{reportData?.recommendation[1]?.상권특징 || "로딩 중..."}</li>
            </ul>
          </ol>
        </div>
      </article>
    </div>
  );
}
