import { Link } from "react-router-dom";
import styled from "styled-components";
import HomeHeader from "../components/HomeHeader";
import report from "../assets/report.png";
import recommend from "../assets/recommend.png";
import guide from "../assets/guide.png";
import Footer from "../components/Footer";

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 70px;
  font-weight: bold;
  margin-top: 100px;
  margin-bottom: 50px;
`;

const SubTitle = styled.p`
  font-size: 35px;
  color: gray;
  margin-bottom: 50px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;
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
  height: 300px;
`;

const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 100px;
  margin-bottom: 60px;
`;

export default function HomePage() {
  return (
    <Container>
      <HomeHeader style={{ position: "sticky", top: 0 }} />
      <Title>당신의 창업을 '어디가게'가 응원합니다.</Title>
      <SubTitle>아래 항목 중 필요한 서비스를 선택해주세요.</SubTitle>
      <Button>
        <StyledLink
          to="/map"
          style={{ backgroundColor: "#0479AF", color: "#fff" }}
        >
          <Icon>
            <img src={report} alt="이미지없음"></img>
          </Icon>
          상권 분석
        </StyledLink>
        <StyledLink
          to="/irq"
          style={{ backgroundColor: "#50ADCE", color: "#fff" }}
        >
          <Icon>
            <img src={recommend} alt="이미지없음"></img>
          </Icon>
          업종 추천
        </StyledLink>
        <StyledLink
          to="/po"
          style={{ backgroundColor: "#A5EDD7", color: "#fff" }}
        >
          <Icon>
            <img src={guide} alt="이미지없음"></img>
          </Icon>
          정책 안내
        </StyledLink>
      </Button>
      <Footer />
    </Container>
  );
}
