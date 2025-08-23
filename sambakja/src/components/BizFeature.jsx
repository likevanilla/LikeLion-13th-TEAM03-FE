import HighlightText from "./HighlightText";

export default function BizFeature({ text = "" }) {
  return (
    <div className="BizBanner">
      <div className="Biz-text">
        <HighlightText text={text} />
      </div>
    </div>
  );
}
