export default function BizFeature({ text = "" }) {
  return (
    <div className="BizBanner">
      <div className="Biz-text">
        <p>{text}</p>
      </div>
    </div>
  );
}
