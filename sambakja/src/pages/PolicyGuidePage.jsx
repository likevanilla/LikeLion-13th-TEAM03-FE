import styled from "styled-components";
import HomeHeader from "../components/HomeHeader";
import { useState } from "react";

const Category = styled.div`
  background-color: #e7ffc1;
  border-radius: 50px;
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 40px 100px 40px 100px;
`;

const Btn = styled.button`
  background-color: #50adce;
  color: #fff;
  padding: 5px;
  width: 100px;
  height: 40px;
  border-style: none;
  border-radius: 10px;
  font-size: 20px;
`;

const List = styled.section`
  background-color: #e7ffc1;
  border-radius: 24px;
  padding: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

const Li = styled.div`
  border-bottom: 1px solid gray;
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function PolicyGuidePage() {
  const end = {
    전체: "/gu",
    "자금 지원": "/gu/b",
    "점포 지원": "/gu/st",
    "교육 지원": "/gu/ed",
  };

  //우선 목업데이터로 채워둠.
  const mock = {
    "/gu": [
      {
        id: 1,
        title: "[서울시] 자영업자 홍보 모집",
        url: "https://...",
        date: "2025-07-04",
      },
      {
        id: 2,
        title: "[서울시] 창업 안내",
        url: "https://...",
        date: "2025-07-04",
      },
    ],
    "/gu/b": [
      {
        id: 3,
        title: "[서울시] 대출 안내",
        url: "https://...",
        date: "2025-07-21",
      },
    ],
    "/gu/st": [
      {
        id: 4,
        title: "[서울시] 임대료 지원 안내",
        url: "https://...",
        date: "2025-08-02",
      },
    ],
    "/gu/ed": [
      {
        id: 5,
        title: "[서울시] 창업 교육 모집 안내",
        url: "https://...",
        date: "2025-08-01",
      },
    ],
  };

  const [active, setActive] = useState("전체");
  const url = end[active];
  const list = mock == null || mock[url] == null ? [] : mock[url];

  return (
    <div>
      <HomeHeader pageInfo="정책 안내" />
      <Category>
        {Object.keys(end).map((ca) => (
          <Btn key={ca} onClick={() => setActive(ca)}>
            {ca}
          </Btn>
        ))}
      </Category>
      <List>
        {list.map((item) => (
          <Li key={item.id}>
            <a
              href={item.url}
              style={{ color: "black", textDecoration: "none" }}
            >
              {item.title}
            </a>
            <span>
              {new Date(item.date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </span>
          </Li>
        ))}
      </List>
    </div>
  );
}
