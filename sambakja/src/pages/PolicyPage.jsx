import GuideList from "../components/GuideList";
import HomeHeader from "../components/HomeHeader";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  gap: 30px;
  margin: 0 auto;
`;

const Page = styled.div`
  display: flex;
  justify-content: center;
`;

const Home = styled.div`
  /* position: fixed; */
`;

export default function PolicyPage() {
  return (
    <div>
      <Home>
        <HomeHeader />
      </Home>
      <Page>
        <Card>
          <GuideList />
        </Card>
      </Page>
    </div>
  );
}
