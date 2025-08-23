import HeaderManager from "../components/HeaderManager";
import map from "../assets/fi-rs-map-marker.png";
import checkbox from "../assets/fi-rr-checkbox.png";
import book from "../assets/fi-rr-book-alt.png";
import logo from "../assets/어디가게로고.png";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 650px;
  position: relative;

  &::before {
    content: "";
    background: url(${logo}) no-repeat center / 700px;
    position: absolute;
    opacity: 0.3;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: -1;
  }

  @media (max-width: 768px) {
    height: auto; /* 모바일에서는 높이를 자동으로 설정 */
    padding-top: 80px; /* 헤더 높이에 맞는 여백 추가 */
    &::before {
      content: "";
      background: url(${logo}) no-repeat center / 500px;
    }
  }
`;

const Text = styled.section`
  text-align: center;
  font-size: 30px;
  margin: 100px;

  div {
    margin-top: 10px;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    margin: 40px 20px; /* 모바일에서 여백 줄이기 */
  }
`;

const Features = styled.section`
  display: flex;
  justify-content: center;
  gap: 110px;
  padding-top: 50px;

  @media (max-width: 768px) {
    flex-direction: column; /* 모바일에서는 세로로 배치 */
    gap: 20px; /* 카드 간격 줄이기 */
  }
`;

const Card = styled.div`
  background-color: rgba(165, 237, 215, 0.6);
  border-radius: 10px;
  text-align: center;
  width: 236px;
  height: 276px;

  p {
    font-size: 18px;
    line-height: 1.2;
    padding: 20px;
  }

  @media (max-width: 768px) {
    width: 100%; /* 모바일에서는 카드 너비를 100%로 설정 */
    height: auto; /* 모바일에서는 카드 높이를 자동으로 설정 */
    font-size: 16px; /* 모바일에서 폰트 크기 줄이기 */
  }
`;

const Icon = styled.img`
  width: 115px;
  height: 114px;
  margin-top: 20px;

  @media (max-width: 768px) {
    width: 90px; /* 모바일에서 아이콘 크기 줄이기 */
    height: 90px;
    margin-top: 10px;
  }
`;

export default function AboutPage() {
  return (
    <Wrapper>
      <HeaderManager />
      <div>
        <Text>
          <div>복잡한 창업 정보, 누구보다 쉽게!</div>
          <div>꼭 필요한 정보만 딱!</div>
          <div>
            우리 엄마, 아빠, 할머니, 할아버지를 위한 맞춤 창업 정보 서비스
            '어디가게?'입니다.
          </div>
        </Text>
        <Features>
          <Card>
            <Icon src={map} alt="이미지없음" />
            <p>
              서울 각 지역의 유동인구, 소비패턴, 상권 정보를 누구나 이해할 수
              있는 리포트로 쉽게 제공합니다.
            </p>
          </Card>
          <Card>
            <Icon src={checkbox} alt="이미지없음" />
            <p>
              꼭 맞는 업종만 추천합니다.
              <br /> 자본, 연령, 희망 업종에 맞춘 맞춤형 업종 리포트로 필요한
              정보만 깔끔하게 담았습니다.
            </p>
          </Card>
          <Card>
            <Icon src={book} alt="이미지없음" />
            <p>
              정부, 지자체의 지원정책을 클릭 몇 번으로 한눈에 확인할 수
              있습니다.
            </p>
          </Card>
        </Features>
      </div>
    </Wrapper>
  );
}
