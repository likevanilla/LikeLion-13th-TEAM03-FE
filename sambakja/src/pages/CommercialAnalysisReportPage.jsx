import "/src/style/CommercialAnalysisReport.css";
import { useEffect, useState } from "react";
import HomeHeader from "/src/components/HomeHeader";
import { useSearchParams } from "react-router-dom";
import { api } from "../apis/api";
import { Link } from "react-router-dom";
import Population from "../components/Population";
import Industry from "../components/Industry";
import Locational from "../components/LocationalCharacteristics";

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
  const dong = sp.get("dong");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function postReport() {
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/api/region/report", { gu, dong });
      const data = normalizeReport(res.data);
      setReportData(data);
      console.log(reportData);
    } catch (e) {
      setError("데이터 전송 실패");
      setReportData(INITIAL);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    postReport();
  }, [gu, dong]);

  //   setTimeout(() => {
  //     setReportData(mockData);
  //   }, 500);
  // }, []);

  return (
    <div className="Report-wrapper">
      <HomeHeader />
      <div className="Report-region">
        {reportData?.region || "지역 로딩 중..."}
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
  );
}
