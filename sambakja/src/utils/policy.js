import { dday, fmtFromYmd, ymdToUtc } from "./date";

export function filterActiveWithDeadLine(items = [], withinDays = 7) {
  const now = new Date();
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return items.filter((policy) => {
    if (!policy) return false;

    if (policy.rcrt_prgs_yn !== "Y") return false;

    const endYmd = policy.pbanc_rcpt_end_dt;
    const endUtc = ymdToUtc(endYmd);
    if (endUtc === null) return false;
    return endUtc >= todayUtc && dday(endYmd) <= withinDays;
  });
}

export function ddayLabel(endYmd) {
  const d = dday(endYmd);
  if (d === null || d < 0) return null;
  return `D-${d}`;
}

export function cardModel(p) {
  return {
    id: p.pbanc_sn,
    title: p.biz_pbanc_nm,
    period: `${fmtFromYmd(p.pbanc_rcpt_bgng_dt)} - ${fmtFromYmd(
      p.pbanc_rcpt_end_dt
    )}`,
    category: p.supt_biz_clsfc || "-",
    url: p.detl_pg_url,
    ddayText: ddayLabel(p.pbanc_rcpt_end_dt),
  };
}

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
