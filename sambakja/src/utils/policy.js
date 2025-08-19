import { dday, fmtFromYmd, ymdToUtc } from "./date";

export function rightDdayLabel(endYmd) {
  const d = dday(endYmd);
  if (d == null) return "상시";
  if (d < 0) return "마감";
  return `D-${d}`;
}

export function rightCard(p) {
  return {
    id: p.pbanc_sn,
    title: p.biz_pbanc_nm,
    period: `${fmtFromYmd(p.pbanc_rcpt_bgng_dt)} - ${fmtFromYmd(
      p.pbanc_rcpt_end_dt
    )}`,
    category: p.supt_biz_clsfc || "-",
    url: p.detl_pg_url,
    ddayText: rightDdayLabel(p.pbanc_rcpt_end_dt),
  };
}
