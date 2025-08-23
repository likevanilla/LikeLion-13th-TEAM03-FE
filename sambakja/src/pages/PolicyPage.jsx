import GuideList from "../components/GuideList";
import HeaderManager from "../components/HeaderManager";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  gap: 30px;
  margin: 0 auto;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center; /* 모바일에서 카드들을 중앙에 배치 */
    gap: 15px; /* 모바일에서는 카드 간격을 줄이기 */
  }
`;

const Page = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;

  @media (max-width: 768px) {
    padding-top: 120px; /* 모바일에서는 여백을 좀 더 크게 */
  }
`;

export default function PolicyPage() {
  return (
    <div>
      <HeaderManager />
      <Page>
        <Card>
          <GuideList />
        </Card>
      </Page>
    </div>
  );
}
