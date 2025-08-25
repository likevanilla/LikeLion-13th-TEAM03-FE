import "/src/style/CommercialAnalysisReport.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../apis/api";
import { Link } from "react-router-dom";
import Population from "../components/Population";
import Industry from "../components/Industry";
import Locational from "../components/LocationalCharacteristics";
import HeaderManager from "../components/HeaderManager";
import LoadingBox from "../components/LoadingBox";

function normalizeReport(raw) {
  const r = raw ?? {};
  const rep = r.report ?? {};
  return {
    region: r.region ?? "",
    population: rep["인구"] ?? {},
    industry: rep["업종"] ?? {},
    locational: rep["입지_특성"] ?? "",
  };
}

const INITIAL = { region: "", population: {}, industry: {}, locational: "" };

export default function CommercialAnalysisReportPage() {
  const [reportData, setReportData] = useState(INITIAL);
  const [sp] = useSearchParams();
  const gu = sp.get("gu");
  const region = sp.get("region");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function postReport() {
    const MIN_SPINNER = 3000;
    const started = Date.now();

    try {
      setLoading(true);
      setError("");
      const res = await api.post("/api/region/report", { region });
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
  }, [region]);

  return (
    <>
      <HeaderManager />
      <div className="Report-wrapper">
        {loading && <LoadingBox />}
        <div className="Report-region">
          {`서울시 ${gu} ${reportData?.region || "지역 로딩 중..."}`}
        </div>
        <div className="Text">상권 분석 리포트 출력 완료되었어요!</div>
        <div className="Report-grid">
          <Population population={reportData.population} />

          <div className="Right-column">
            <Industry industry={reportData.industry} />
            <Locational text={reportData.locational} />
          </div>
        </div>
        <Link to="/map" className="Back">
          다른 상권 분석 리포트를 작성해드릴까요?
        </Link>
      </div>
    </>
  );
}
