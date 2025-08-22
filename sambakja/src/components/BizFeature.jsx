import HighlightText from "./HighlightText";

export default function BizFeature({ text = "" }) {
  return (
    <div className="BizBanner">
      <div className="Biz-text">
        <HighlightText text={text} />
        <div>어쩌구어쩌구냠냠배고파</div>
      </div>
    </div>
  );
}
