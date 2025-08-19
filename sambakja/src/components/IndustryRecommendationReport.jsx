import HomeHeader from "./HomeHeader";
import "./IndustryRecommendationReport.css";
import React, { useEffect, useState } from "react";

export default function IndustryRecommendationReport() {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // 목업 데이터
    // 어떻게 넣어올 지 모르겠음! 나중에 출력값 보고 변경
    // 업종 추천으로 나오는 지역들이 많아지면 li 태그도 유연하게 변경
    const mockData = {
      industry: "샐러드 전문점",
      industry_explanation:
        "샐러드 전문점은 젊은 층과 스포츠 층에서 다이어트 식단으로 수요가 높으므로",
      region: ["강동구 성내동", "노원구 공릉2동"],
    };

    // 추후 변경 후 코드
    // useEffect(() => {
    //   fetch("/api/report") // 실제 백엔드 API 주소
    //     .then((res) => res.json())
    //     .then((data) => setReportData(data))
    //     .catch((error) => console.error("데이터 불러오기 실패:", error));
    // }, []);

    setTimeout(() => {
      setReportData(mockData);
    }, 500);
  }, []);

  return (
    <div>
      <HomeHeader pageInfo="업종 추천 리포트" />
      <header>
        <div>업종 추천 분석 리포트 출력 완료되었습니다!</div>
      </header>
      <article>
        <div className="Report">
          <div className="Industry">
            {reportData?.industry || "업종 로딩 중..."}
          </div>
          <div className="Industry-explanation">
            {reportData?.industry_explanation || "로딩 중..."}
          </div>
          <ol>
            <li>{reportData?.region[0] || ""}</li>
            <ul>
              <li>
                JYP 엔터와 한체대가 위치해 있어 비교적 임대료가 높지만 많은 수요
                예상
              </li>
            </ul>
            <li>{reportData?.region[1] || ""}</li>
            <ul>
              <li>
                서울 외곽 지역이지만 서울과기대, 서울여대, 삼육대 등 대학가 다수
              </li>
              <li>
                태릉 선수촌, 태릉 골프장 위치해 있으므로 스포츠인 수요 높을
                것으로 예상
              </li>
            </ul>
          </ol>
        </div>
      </article>
    </div>
  );
}
