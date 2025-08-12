import styled from "styled-components";
import logo from "../assets/어디가게로고.png";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  border-bottom: 2px solid #0479af;
`;

const Menu = styled.ul`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  /* margin: 0;
  padding: 0; */
`;

const PageInfo = styled.div`
  /* font-size: 40px;
  margin-left: 50px; */
`;

const List = styled.li`
  margin-right: 30px;
  font-size: 30px;
  list-style: none;
`;

const Alink = styled.a`
  text-decoration: none;
  color: black;
`;

const Logo = styled.img`
  height: 70px;
  width: auto;
  display: block;
`;

export default function HomeHeader({ pageInfo }) {
  return (
    <div>
      <Nav>
        <PageInfo>
          {pageInfo ? (
            <span style={{ fontSize: 40, marginLeft: 50 }}>{pageInfo}</span>
          ) : (
            <Logo src={logo} alt="이미지없음" />
          )}
        </PageInfo>
        <Menu>
          <List>
            <Alink href="#">홈</Alink>
          </List>
          <List>
            <Alink href="#">업종 추천</Alink>
          </List>
          <List>
            <Alink href="#">정책 안내</Alink>
          </List>
          <List>
            <Alink href="#">서비스소개</Alink>
          </List>
          <List>
            <Alink href="#">문의하기</Alink>
          </List>
        </Menu>
      </Nav>
    </div>
  );
}
