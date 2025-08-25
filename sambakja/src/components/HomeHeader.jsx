import styled from "styled-components";
import logo from "../assets/어디가게로고.png";
import { NavLink, useLocation, matchPath } from "react-router-dom";

const Header = styled.div`
  position: sticky;
  top: 0;
  padding: 10px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 90%;
  margin-left: 5%;
  border-bottom: none;
  border-radius: 50px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: #fff;
  flex-wrap: wrap;
  margin-top: 40px;
`;

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  gap: 20px;
  flex-wrap: wrap; /* 메뉴 항목들이 화면에 맞게 줄 바꿈 되도록 설정 */
  width: 100%; /* Menu의 너비를 100%로 설정하여 Nav에 맞게 맞춰줌 */
`;

const List = styled.li`
  margin-right: 15px;
  font-size: 25px;
  list-style: none;
  justify-content: center;
  align-items: center;
`;

const Alink = styled(NavLink)`
  text-decoration: none;
  color: #0479af;

  &.active {
    border-bottom: 2px solid #0479af;
  }

  &:hover {
    text-shadow: 2px 2px 2px gray;
  }

  @media (max-width: 768px) {
    font-size: 18px; /* 모바일에서 글씨 크기 줄이기 */
  }
`;

const Logo = styled.img`
  height: 70px;
  width: auto;
  display: block;

  @media (max-width: 768px) {
    height: 50px; /* 모바일에서 로고 크기 줄이기 */
  }
`;

function MultiRouteLink({ to, patterns = [], children }) {
  const { pathname } = useLocation();
  const isActive = patterns.some(
    (p) =>
      !!matchPath(
        typeof p === "string" ? { path: p, end: !p.endsWith("/*") } : p,
        pathname
      )
  );
  return (
    <Alink to={to} className={isActive ? "active" : undefined}>
      {children}
    </Alink>
  );
}

export default function HomeHeader() {
  return (
    <Header>
      <Nav>
        <Menu>
          <List>
            <Alink to="/" end>
              홈
            </Alink>
          </List>
          <List>
            <Alink to="/ab">서비스 소개</Alink>
          </List>
          <List>
            <Alink to="/in">문의하기</Alink>
          </List>
          <List>
            <Alink to="/">
              <Logo src={logo} alt="이미지없음" />
            </Alink>
          </List>
          <List>
            <MultiRouteLink to="/map" patterns={["/map", "/re"]}>
              상권 분석
            </MultiRouteLink>
          </List>
          <List>
            <MultiRouteLink to="/irq" patterns={["/irq", "irr"]}>
              상권 추천
            </MultiRouteLink>
          </List>
          <List>
            <Alink to="/po">정책 안내</Alink>
          </List>
        </Menu>
      </Nav>
    </Header>
  );
}
