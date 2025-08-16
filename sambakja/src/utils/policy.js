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

// export function filterSeven(items = [], withinDays = 7) {
//   return items.filter((p) => {
//     const d = dday(p.pbanc_rcpt_end_dt);
//     return d != null && d >= 0 && d <= withinDays;
//   });
// }

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
