import Spinner from "/src/assets/loading.gif";
import Logo from "/src/assets/어디가게로고.png";
import styled from "styled-components";

const Box = styled.div`
  background-color: #fff;
  max-width: 600px;
  width: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const Loading = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
`;

const LogoImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  padding-bottom: 30px;
  transform: translate(-50%, -50%);
`;

const SpinnerImg = styled.img`
  width: 300px;
  height: 300px;
`;

const Text = styled.div`
  font-size: 24px;
  text-align: center;
  font-family: "Pretendard-ExtraLight";
  color: #a6a1a1;
`;

export default function LoadingBox() {
  return (
    <Loading>
      <Box>
        <SpinnerImg src={Spinner} />
        <LogoImg src={Logo} alt="logo" />
        <Text>
          <div>데이터를 가져오고 있어요</div>
          <div>잠시만 기다려주세요..</div>
        </Text>
      </Box>
    </Loading>
  );
}
