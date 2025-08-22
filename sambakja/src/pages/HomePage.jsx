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

const Title = styled.p`
  font-size: 65px;
  font-weight: 800;
  margin-top: 60px;
  margin-bottom: 30px;
  font-family: "Pretendard-SemiBold";
  text-shadow: 2px 2px 2px gray;
`;

const SubTitle = styled.p`
  font-size: 30px;
  color: #a6a1a1;
  margin-bottom: 50px;
  font-family: "Pretendard-ExtraLight";
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;
  margin-bottom: 60px;
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
  width: 291px;
  height: 390px;
  font-family: "Pretendard-Bold";
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  background-image: linear-gradient(transparent, transparent);
  transition: background-image 0.2s, box-shadow 0.2s;

  &:hover {
    background-image: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15));
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
`;

const Icon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 255px;
  height: 245px;
  margin-bottom: 40px;
  & > img {
    width: 100%;
    height: 100%;
    /* object-fit: contain; */
    display: block;
  }
`;

export default function HomePage() {
  return (
    <Container>
      <HomeHeader style={{ position: "sticky", top: 0 }} />
      <Title>
        당신의 창업을 <span style={{ color: "#0479AF" }}>'어디가게'</span>가
        응원합니다.
      </Title>
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
