import HighlightText from "./HighlightText";
import "/src/style/CommercialAnalysisReport.css";

export default function Population({ population = {} }) {
  const one = population?.["1인가구"] ?? "";
  const resident = population?.["상주인구"] ?? "";
  const flow = population?.["유동인구"] ?? "";
  const worker = population?.["직장인구"] ?? "";

  return (
    <div>
      <div className="Population">
        <div className="Title">
          <span style={{ fontFamily: "Pretendard-Bold" }}>인구</span> 관련
          결과를 알려드려요.
        </div>
        <div className="Content">
          <div className="Single-person">
            <div className="Content-title">1인가구</div>
            <div className="Content-description">
              <HighlightText text={one} />
              <div>1인가구내용입니다</div>
            </div>
          </div>
          <div>
            <div className="Content-title">상주인구</div>
            <div className="Content-description">
              <HighlightText text={resident} />
              <div>상주인구내용입니다</div>
            </div>
          </div>
          <div>
            <div className="Content-title">유동인구</div>
            <div className="Content-description">
              <HighlightText text={flow} />
              <div>유동인구내용입니다</div>
            </div>
          </div>
          <div>
            <div className="Content-title">직장인구</div>
            <div className="Content-description">
              <HighlightText text={worker} />
              <div>직장인구내용입니다</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
