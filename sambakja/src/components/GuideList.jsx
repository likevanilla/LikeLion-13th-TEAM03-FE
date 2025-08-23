import { useEffect, useState } from "react";
import { rightCard } from "../utils/policy";
import styled from "styled-components";
import { api } from "../apis/api";
import GuideListLoading from "../components/GuideListLoadingBox";

const Wrap = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.h2`
  font-size: 28px;
  margin: 20px 0 30px 0;
  text-align: center;
  color: #a6a1a1;
  font-family: "Pretendard-ExtraLight";
`;

const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: #e7ffc1;
  color: black;
  border-radius: 15px;
  display: grid;
  grid-template-rows: 45% 40%;
  box-sizing: border-box;
  width: 500px;
  height: 150px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.15),
    0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.15);
`;

const Dday = styled.span`
  background-color: #0479af;
  border-radius: 5px;
  font-size: 14px;
  padding: 8px 14px;
  width: 80px;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  font-family: "Pretendard-Bold";
`;

const Title = styled.h3`
  font-size: 18px;
  padding-right: 10px;
  padding-top: 10px;
  width: 100%;
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
    background-color: #8bd0bb;
    border: 2px solid #0479af;
  }
  font-size: 15px;
  width: 100px;
  height: 40px;
  text-align: center;
  color: black;
  font-weight: 500;
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
`;

const Bottom = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  width: 100%;
  padding-top: 30px;
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
  margin-top: 40px;
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

const ROWS_PAGE = 12; //한 페이지 데이터 수
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
      const currentPage = p || 1;

      const res = await api.get("/api/guide/startup", {
        params: { page: currentPage, size: ROWS_PAGE },
      });

      const { content = [], totalPages = 1 } = res?.data ?? {};

      const mapped = (Array.isArray(content) ? content : []).map(rightCard);

      setData(mapped);
      setTotalPages(totalPages || 1);
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
      <Header>원하시는 정책 정보를 확인하세요.</Header>
      {/* {loading && <GuideListLoading/>} */}
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
