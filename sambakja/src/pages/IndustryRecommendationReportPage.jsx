import "/src/style/IndustryRecommendationReport.css";
import React, { useEffect, useState } from "react";
import { api } from "../apis/api";
import { useSearchParams, Link } from "react-router-dom";
import RecommendationCard from "../components/RecommendationCard";
import BizFeature from "../components/BizFeature";
import HeaderManager from "../components/HeaderManager";
import LoadingBox from "../components/LoadingBox";

function normalizeReport(raw) {
  const r = raw ?? {};

  return {
    typeSmall: r.type_small ?? "",
    bizFeature: r.biz_feature ?? "",
    recommendations: Array.isArray(r.recommendations) ? r.recommendations : [],
  };
}

const INITIAL = { typeSmall: "", bizFeature: "", recommendations: [] };

export default function IndustryRecommendationReport() {
  const [reportData, setReportData] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sp] = useSearchParams();
  const sex = sp.get("sex");
  const type_large = sp.get("type_large");
  const type_medium = sp.get("type_medium");
  const type_small = sp.get("type_small");
  const budget = sp.get("budget");

  async function postReport() {
    const MIN_SPINNER = 3000;
    const started = Date.now();

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
      setReportData(INITIAL);
      console.error(e);
    } finally {
      const elapsed = Date.now() - started;
      const remain = Math.max(0, MIN_SPINNER - elapsed);
      setTimeout(() => setLoading(false), remain);
    }
  }

  useEffect(() => {
    postReport();
  }, [sex, type_large, type_medium, type_small, budget]);

  return (
    <>
      <HeaderManager />
      <div className="Report-wrapper">
        {loading && <LoadingBox />}
        <div className="Text">상권 추천 분석 리포트 출력 완료되었어요!</div>
        <div className="Biz-feature">{reportData?.biz_feature}</div>
        <BizFeature text={reportData.bizFeature} />

        <div className="RecGrid">
          {reportData.recommendations?.length ? (
            reportData.recommendations.map((rec, i) => (
              <RecommendationCard
                key={i}
                region={rec.region}
                reason={rec.reason}
                keyMap={{ LLM평가: "AI 평가" }}
              />
            ))
          ) : (
            <>
              {/* API 없을 때 임시 카드 */}
              <RecommendationCard
                region=""
                reason={{
                  유동인구: "",
                  직장인구: "",
                  연령층: "",
                  임대료: "",
                  상권특징: "",
                  LLM평가: "",
                }}
              />
              {/* 필요하면 두 번째 목업도 */}
              <RecommendationCard
                region=""
                reason={{
                  유동인구: "",
                  직장인구: "",
                  연령층: "",
                  임대료: "",
                  상권특징: "",
                  LLM평가: "",
                }}
              />
            </>
          )}
        </div>

        <Link to="/irq" className="Back">
          다른 상권 분석 리포트를 작성해드릴까요?
        </Link>
      </div>
    </>
  );
}
