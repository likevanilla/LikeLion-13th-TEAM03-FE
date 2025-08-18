import { useEffect, useState } from "react";
import { rightCard } from "../utils/policy";
import styled from "styled-components";
import { api } from "../apis/api";

const Wrap = styled.section`
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

const ROWS_PAGE = 8; //한 페이지 데이터 수
const PAGES = 5; //페이지 번호는 5개씩

export default function GuideList() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]); //현재 페이지 카드
  const [totalPages, setTotalPages] = useState(1); //전체 개수
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function makePageNumbers(start, end) {
    const arr = [];
    for (let p = start; p <= end; p++) arr.push(p);
    return arr;
  }

  async function load(p = page) {
    setLoading(true);
    setError(null);
    try {
      const uiPage = Number.isFinite(p) ? p : 1;
      const serverPage = Math.max(0, uiPage - 1);

      const res = await api.get("/api/guide/startup", {
        params: { page: serverPage, size: ROWS_PAGE },
      });

      const { content = [], totalPages = 1 } = res?.data ?? {};

      const mapped = (Array.isArray(content) ? content : []).map(rightCard);

      setData(mapped);
      setTotalPages(Number.isFinite(totalPages) ? totalPages : 1);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(page);
  }, [page]);

  const blockIndex = Math.floor((page - 1) / PAGES);
  const blockStart = blockIndex * PAGES + 1;
  const blockEnd = Math.min(blockStart + PAGES - 1, totalPages);
  const pageNumbers = makePageNumbers(blockStart, blockEnd);

  return (
    <Wrap>
      <Header>정책 리스트</Header>
      {loading && <p>불러오는 중..</p>}
      {error && <p>에러가 발생했습니다.</p>}
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
        <PageBtn
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          이전
        </PageBtn>
        {pageNumbers.map((p) => (
          <PageBtn key={p} onClick={() => setPage(p)} disabled={p === page}>
            {p}
          </PageBtn>
        ))}
        <PageBtn
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          다음
        </PageBtn>

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
