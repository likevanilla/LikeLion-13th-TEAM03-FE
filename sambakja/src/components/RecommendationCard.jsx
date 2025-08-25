import "/src/style/IndustryRecommendationReport.css";

const ORDER = [
  "유동인구",
  "직장인구",
  "연령층",
  "임대료",
  "상권특징",
  "LLM평가",
];

export default function RecommendationCard({
  region = "",
  reason = {},
  keyMap = {},
}) {
  const entries = Object.entries(reason || {})
    .map(([rawKey, value]) => ({ key: keyMap[rawKey] ?? rawKey, value }))
    .filter(({ value }) => value);

  const orderIndex = (k) => {
    const idx = ORDER.indexOf(k);
    return idx === -1 ? ORDER.length + 1 : idx;
  };

  const rows = entries.sort((a, b) => orderIndex(a.key) - orderIndex(b.key));

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
