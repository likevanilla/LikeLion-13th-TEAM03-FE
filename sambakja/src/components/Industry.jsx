import "/src/style/CommercialAnalysisReport.css";

export default function Industry({ industry = {} }) {
  const storeCount = industry?.["점포수"] ?? "";
  const rentFeature = industry?.["임대료_특징"] ?? "";

  return (
    <div className="Industry-style">
      <div className="Title">
        <span style={{ fontFamily: "Pretendard-ExtraBold" }}>업종</span> 관련
        결과를 알려드려요.
      </div>
      <div className="Content">
        <div>
          <div className="Content-title">점포수</div>
          <div className="Content-description">
            <p>{storeCount}</p>
          </div>
        </div>
        <div>
          <div className="Content-title">임대료 특징</div>
          <div className="Content-description">
            <p>{rentFeature}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
