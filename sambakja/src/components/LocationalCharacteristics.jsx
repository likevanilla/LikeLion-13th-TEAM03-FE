import HighlightText from "./HighlightText";
import "/src/style/CommercialAnalysisReport.css";

export default function LocationalCharacteristics({ text = "" }) {
  return (
    <div className="Locational">
      <div className="Title">
        <span style={{ fontFamily: "Pretendard-Bold" }}>입지 특성</span> 결과를
        알려드려요.
      </div>
      <div className="Content">
        <div className="Content-description">
          <HighlightText text={text} />
        </div>
      </div>
    </div>
  );
}
