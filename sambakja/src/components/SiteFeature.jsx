import HighlightText from "./HighlightText";
import "/src/style/CommercialAnalysisReport.css";

export default function SiteFeature({ text = "" }) {
  return (
    <div>
      <div className="Title">입지 특성 결과를 알려드려요.</div>
      <div className="Content-description">
        <HighlightText text={text} />
        <div>내용</div>
      </div>
    </div>
  );
}
