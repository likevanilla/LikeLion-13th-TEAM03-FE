import "/src/style/CommercialAnalysisReport.css";
import { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import { useSearchParams } from "react-router-dom";
import { api } from "../apis/api";
import KakaoMap from "./KakaoMap";
import { Link } from "react-router-dom";

// 텍스트 강조 함수 - 키워드는 추후 더 추가
function HighlightText({ text }) {
  const keywords = [
    "10대",
    "20대",
    "30대",
    "40대",
    "50대",
    "남성",
    "여성",
    "늘어나는",
    "평균매출",
    "임대료",
    "유입",
  ];
  const highlightStyle = { color: "#0278AE", fontWeight: "bold" };
  const regex = new RegExp(`(${keywords.join("|")})`, "g");

  return (
    <span>
      {text.split(regex).map((part, i) =>
        keywords.includes(part) ? (
          <span key={i} style={highlightStyle}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default function CommercialAnalysisReport() {
  const [reportData, setReportData] = useState(null);
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
  }, [gu, dong]);

  // useEffect(() => {
  //   // 목업 데이터
  //   const mockData = {
  //     region: "서울시 마포구 연남동",
  //     연령별_성별_비율: "연남동은 20대 여성 비율이 높아!",
  //     인구_추이: "전반적으로 인구가 늘어나는 추세!",
  //     유동인구: "20대 유동 인구가 늘어나고 있어!",
  //     점포수_및_매출: "관광업종이 적은데 평균매출은 높아!",
  //     임대료_특징: "임대료 특징 ~~~~~~",
  //     입지_특성: "연남동은 홍대, 감성 카페, 맛집 등으로 인해 젊은 층 유입이 큼",
  //   };

  // 추후 변경 후 코드
  // useEffect(() => {
  //   fetch("/api/report") // 실제 백엔드 API 주소
  //     .then((res) => res.json())
  //     .then((data) => setReportData(data))
  //     .catch((error) => console.error("데이터 불러오기 실패:", error));
  // }, []);

  //   setTimeout(() => {
  //     setReportData(mockData);
  //   }, 500);
  // }, []);

  return (
    <div>
      <HomeHeader />
      <header>
        <div className="Report-region">
          {reportData?.region || "지역 로딩 중..."}
        </div>
        <div>상권 분석 리포트 출력 완료되었어요!</div>
      </header>
      <div>
        <div className="Population">
          <div>인구 관련 결과를 알려드려요.</div>
          <div>
            <div className="Single-person">
              <div>1인가구</div>
              <HighlightText text={reportData?.인구?.["1인가구"] || ""} />
            </div>
            <div>
              <div>상주인구</div>
              <HighlightText text={reportData?.상주인구 || ""} />
            </div>
            <div>
              <div>직장인구</div>
              <HighlightText text={reportData?.유동인구 || ""} />
            </div>
            <div>
              <HighlightText text={reportData?.직장인구 || ""} />
            </div>
          </div>
          <div>
            <div>업종 관련 결과를 알려드려요.</div>
            <div>
              <div>점포수</div>
              <HighlightText text={reportData?.업종.점포수 || ""} />
            </div>
            <div>
              <div>임대료 특징</div>
              <HighlightText text={reportData?.업종.임대료_특징 || ""} />
            </div>
          </div>
          <div>
            <div>입지 특성 결과를 알려드려요.</div>
            <div>
              <HighlightText text={reportData?.입지_특성 || ""} />
            </div>
          </div>
          {/* <li>업종</li>
            <ul>
              <li>
                <HighlightText text={reportData?.점포수_및_매출 || ""} />
              </li>
              <li>{reportData?.임대료_특징 || ""}</li>
            </ul>
            <li>입지 특성</li>
            <ul>
              <li>
                <HighlightText text={reportData?.입지_특성 || ""} />
              </li>
            </ul> */}
        </div>
      </div>
      <Link to="/map" className="Back" element={<KakaoMap />}>
        다른 상권 분석 리포트를 작성해드릴까요?
      </Link>
    </div>
  );
}
