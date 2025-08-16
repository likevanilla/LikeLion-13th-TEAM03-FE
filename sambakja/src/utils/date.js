export function ymdToUtc(ymd) {
  if (!/^\d{8}$/.test(ymd || "")) return null;
  const year = parseInt(ymd.slice(0, 4), 10);
  const month = parseInt(ymd.slice(4, 6), 10) - 1;
  const day = parseInt(ymd.slice(6, 8), 10);
  return Date.UTC(year, month, day);
}

export function dday(endYmd) {
  const endUtc = ymdToUtc(endYmd);
  if (endUtc == null) return null;
  const now = new Date();
  const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const ms = 24 * 60 * 60 * 1000; //하루의 밀리초 계산
  const msLeft = endUtc - todayUtc; //종료일과 오늘의 밀리초 차이
  const daysLeft = msLeft / ms; //며칠 남았는지 일 수로 바꾸기
  return daysLeft;
}

export function fmtFromYmd(ymd) {
  const date = ymdToUtc(ymd);
  if (date == null) return "-";
  const yy = ymd.slice(2, 4);
  const mm = ymd.slice(4, 6);
  const dd = ymd.slice(6, 8);
  return `${yy}.${mm}.${dd}`;
}
