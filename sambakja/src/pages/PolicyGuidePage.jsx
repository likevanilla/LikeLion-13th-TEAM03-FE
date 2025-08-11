import styled from "styled-components";
import HomeHeader from "../components/HomeHeader";

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
  return (
    <div>
      <HomeHeader />
      <Category>
        <Btn>전체</Btn>
        <Btn>자금 지원</Btn>
        <Btn>점포 지원</Btn>
        <Btn>교육 지원</Btn>
      </Category>
      <List>
        <Li>
          <span>[서울시] 서울시 자영업자 대상 홍보 모집</span>
          <span>Jul 24, 2025</span>
        </Li>
      </List>
    </div>
  );
}
