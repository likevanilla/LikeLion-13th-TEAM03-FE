import { useEffect, useState } from "react";
import { filterNotExpired, rightCard } from "../utils/policy";
import styled from "styled-components";
import { api } from "../apis/api";

const Wrap = styled.section`
  /* max-width: 1200px; */
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

const Header = styled.h2`
  font-size: 28px;
  font-weight: 800;
  margin: 8px 0 20px;
`;

const Board = styled.div`
  width: 700px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
`;

const Card = styled.article`
  background-color: #e7ffc1;
  color: black;
  width: 100%;
  min-height: 30px;
  border-radius: 15px;
`;

const Dday = styled.span`
  background-color: #0479af;
  border-radius: 5px;
  font-size: 14px;
  padding: 8px 14px;
  width: 40px;
  text-align: center;
  color: #fff;
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
  height: 20px;
  text-align: center;
  color: black;
  font-weight: 500;
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  margin-bottom: 10px;
`;

const Bottom = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  width: 100%;
`;

const Top = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
`;

const Pagination = styled.div`
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding-top: 6px;
  margin: 0 auto;
`;

const PageBtn = styled.button`
  min-width: 32px;
  height: 32px;
  border: 0;
  cursor: pointer;
`;

const BlockNext = styled.button`
  width: 36px;
  height: 32px;
  border: 0;
  cursor: pointer;
`;

const ROWS_PAGE = 10; //한 페이지 데이터 수
const PAGES = 5; //페이지 번호는 5개씩

export default function Possibility() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]); //현재 페이지 카드
  const [total, setTotal] = useState(0); //전체 개수
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function makePageNumbers(start, end) {
    const arr = [];
    for (let p = start; p <= end; p++) arr.push(p);
    return arr;
  }

  async function load() {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/api/guide/startup", {
        responseType: "json",
      });

      let items = res.data.data;

      const all = filterNotExpired(items)
        .map(rightCard)
        .sort((a, b) => a.title.localeCompare(b.title));

      setTotal(all.length);
      const start = (page - 1) * ROWS_PAGE;
      const end = start + ROWS_PAGE;
      setData(all.slice(start, end));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / ROWS_PAGE));
  const blockIndex = Math.floor((page - 1) / PAGES);
  const blockStart = blockIndex * PAGES + 1;
  const blockEnd = Math.min(blockStart + PAGES - 1, totalPages);
  const pageNumbers = makePageNumbers(blockStart, blockEnd);

  if (loading)
    return (
      <Wrap>
        <Header>오늘 지원 가능</Header>
        <div>불러오는 중..</div>
      </Wrap>
    );
  if (error)
    return (
      <Wrap>
        <Header>오늘 지원 가능</Header>
        <div>
          오류가 발생했습니다.<button onClick={load}>다시 시도</button>
        </div>
      </Wrap>
    );

  return (
    <Wrap>
      <Header>오늘 지원 가능</Header>
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
      <Pagination>
        {pageNumbers.map((p) => {
          return (
            <PageBtn key={p} onClick={() => setPage(p)}>
              {p}
            </PageBtn>
          );
        })}
        <BlockNext
          disabled={blockEnd === totalPages}
          onClick={() => setPage(Math.min(totalPages, blockEnd + 1))}
        >
          &gt;
        </BlockNext>
      </Pagination>
    </Wrap>
  );
}
