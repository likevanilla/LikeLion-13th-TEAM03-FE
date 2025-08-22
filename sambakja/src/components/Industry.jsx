import HighlightText from "./HighlightText";
import "/src/style/CommercialAnalysisReport.css";

export default function Industry({ industry = {} }) {
  const storeCount = industry?.["점포수"] ?? "";
  const rentFeature = industry?.["임대료_특징"] ?? "";

  return (
    <div>
      <div className="Title">업종 관련 결과를 알려드려요.</div>
      <div>
        <div className="Content-title">점포수</div>
        <div className="Content-description">
          <HighlightText text={storeCount} />
          <div>내용</div>
        </div>
      </div>
      <div>
        <div className="Content-title">임대료 특징</div>
        <div className="Content-description">
          <HighlightText text={rentFeature} />
          <div>내용</div>
        </div>
      </div>
    </div>
  );
}
