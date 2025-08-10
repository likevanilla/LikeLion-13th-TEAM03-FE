import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeHeather from "../components/HomeHeather";
import report from "../assets/report.png";
import recommend from "../assets/recommend.png";
import guide from "../assets/guide.png";

const Container = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 70px;
  font-weight: bold;
  margin-top: 20px;
`;

const SubTitle = styled.p`
  font-size: 40px;
  color: gray;
  margin-bottom: 40px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  gap: 60px;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 50px;
  font-weight: bold;
  padding: 40px 20px;
  border-radius: 10px;
  width: 250px;
  height: 250px;
`;

const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 100px;
  margin-bottom: 50px;
`;

// const Label = styled.p`
//   text-align: center;
//   font-size: 30px;
//   font-weight: bold;
// `;

export default function HomePage() {
  return (
    <Container>
      <HomeHeather />
      <Title>당신의 창업을 '어디가게'가 응원합니다.</Title>
      <SubTitle>아래 항목 중 필요한 서비스를 선택해주세요.</SubTitle>
      <Button>
        <StyledLink
          to="/report"
          style={{ backgroundColor: "#6c63ff", color: "#fff" }}
        >
          <Icon>
            <img src={report} alt="이미지없음"></img>
          </Icon>
          상권 분석
        </StyledLink>
        <StyledLink
          to="/recommend"
          style={{ backgroundColor: "#ff8c00", color: "#fff" }}
        >
          <Icon>
            <img src={recommend} alt="이미지없음"></img>
          </Icon>
          업종 추천
        </StyledLink>
        <StyledLink
          to="/guide"
          style={{ backgroundColor: "#28a745", color: "#fff" }}
        >
          <Icon>
            <img src={guide} alt="이미지없음"></img>
          </Icon>
          정책 안내
        </StyledLink>
      </Button>
    </Container>
  );
}
