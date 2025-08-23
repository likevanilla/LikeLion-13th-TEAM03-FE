export default function HighlightText({ text = "" }) {
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
  const highlightStyle = {
    // backgroundColor: "#FFF6B5",
    borderBottom: "2px solid black",
    color: "black",
    fontFamily: "Pretendard-ExtraBold",
    fontSize: "20px",
  };
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
