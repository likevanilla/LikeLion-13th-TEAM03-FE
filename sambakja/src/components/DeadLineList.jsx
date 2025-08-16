import { useEffect, useState } from "react";
import { cardModel, filterActiveWithDeadLine } from "../utils/policy";
import { ymdToUtc } from "../utils/date";
import styled from "styled-components";

const Wrap = styled.section`
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 24px;
`;

const Header = styled.h2`
  font-size: 28px;
  font-weight: 800;
  margin: 8px 0 20px;
`;

const Board = styled.div`
  /* display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start; */
  width: 400px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`;

const Card = styled.article`
  background-color: #0479af;
  color: #fff;
  width: 100%;
  min-height: 100px;
  border-radius: 15px;
`;

const Dday = styled.span`
  background-color: #e7ffc1;
  border-radius: 5px;
  font-size: 14px;
  padding: 8px 14px;
  width: 40px;
  text-align: center;
  color: black;
  font-weight: 800;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0 0 6px;
`;

const Info = styled.div`
  font-size: 13px;
  padding-left: 15px;
  padding-top: 10px;
`;

const Url = styled.a`
  text-decoration: none;
  border-radius: 5px;
  background-color: #a5edd7;
  &:hover {
    cursor: pointer;
  }
  font-size: 15px;
  width: 80px;
  height: 35px;
  text-align: center;
  color: black;
  font-weight: 500;
`;

const Bottom = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const Top = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 10px;
`;

const USE_MOCK = true;

// 목업 데이터
const MOCK_ITEMS = [
  {
    pbanc_sn: "A1",
    biz_pbanc_nm: "관악×SK 오픈이노베이션",
    rcrt_prgs_yn: "Y",
    pbanc_rcpt_bgng_dt: "20250704",
    pbanc_rcpt_end_dt: "20250817",
    supt_biz_clsfc: "시설·공간·보육",
    detl_pg_url: "https://example.com/a1",
  },
  {
    pbanc_sn: "A2",
    biz_pbanc_nm: "창업 보육지원",
    rcrt_prgs_yn: "Y",
    pbanc_rcpt_bgng_dt: "20250615",
    pbanc_rcpt_end_dt: "20250830",
    supt_biz_clsfc: "보육",
    detl_pg_url: "https://example.com/a2",
  },
  {
    pbanc_sn: "A3",
    biz_pbanc_nm: "상시 공고 (필터에서 제외될 항목)",
    rcrt_prgs_yn: "Y",
    pbanc_rcpt_bgng_dt: "20250808",
    pbanc_rcpt_end_dt: null,
    supt_biz_clsfc: "상시",
    detl_pg_url: "https://example.com/a3",
  },
  {
    pbanc_sn: "A4",
    biz_pbanc_nm: "어제 마감 (필터에서 제외될 항목)",
    rcrt_prgs_yn: "Y",
    pbanc_rcpt_bgng_dt: "20250309",
    pbanc_rcpt_end_dt: "20250401",
    supt_biz_clsfc: "멘토링",
    detl_pg_url: "https://example.com/a4",
  },
  {
    pbanc_sn: "A5",
    biz_pbanc_nm: "모집중 아님 (필터에서 제외될 항목)",
    rcrt_prgs_yn: "N",
    pbanc_rcpt_bgng_dt: "20250817",
    pbanc_rcpt_end_dt: "20250910",
    supt_biz_clsfc: "교육",
    detl_pg_url: "https://example.com/a5",
  },
];

export default function DeadLineList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);

      let items = [];

      if (USE_MOCK) {
        items = MOCK_ITEMS;
      } else {
        const res = await axios.get("/startup", {
          params: { pageNo: 1, numOfRows: 10 },
        });
        items = res.data?.items || [];
      }

      const active = filterActiveWithDeadLine(items);

      active.sort(
        (a, b) => ymdToUtc(a.pbanc_rcpt_end_dt) - ymdToUtc(b.pbanc_rcpt_end_dt)
      );

      setData(active.map(cardModel));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div>불러오는 중..</div>;
  if (error)
    return (
      <div>
        오류가 발생했습니다.<button onClick={load}>다시 시도</button>
      </div>
    );

  return (
    <Wrap>
      <Header>마감 임박(D-7이내)</Header>
      <Board>
        {data.map((card) => (
          <Card key={card.id}>
            <Top>
              <Dday>{card.ddayText}</Dday>
              <Title>{card.title}</Title>
            </Top>
            <Bottom>
              <Info>
                {card.period} | {card.category}
              </Info>
              <Url href={card.url} target="_blank">
                상세보기
              </Url>
            </Bottom>
          </Card>
        ))}
      </Board>
    </Wrap>
  );
}
