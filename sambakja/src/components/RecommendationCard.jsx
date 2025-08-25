import "/src/style/IndustryRecommendationReport.css";

const ORDER = [
  "유동인구",
  "직장인구",
  "연령층",
  "임대료",
  "상권특징",
  "LLM평가",
];

export default function RecommendationCard({ region = "", reason = {} }) {
  const rows = ORDER.map((key) => ({ key, value: reason?.[key] })).filter(
    (row) => row.value
  );

  return (
    <div className="Card">
      <div className="Card-region">{region || ""}</div>
      <div className="Card-content">
        {rows.map(({ key, value }) => (
          <div className="Row" key={key}>
            <div className="Key">{key}</div>
            <div className="V">
              <p>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
