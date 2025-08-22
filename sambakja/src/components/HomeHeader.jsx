import styled from "styled-components";
import logo from "../assets/어디가게로고.png";
import { NavLink } from "react-router-dom";

const Header = styled.div`
  position: sticky;
  top: 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 80px;
  max-width: 1000px;
  border-bottom: none;
  border-radius: 50px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin-top: 50px;
  width: 100%;
  margin: 0 auto;
  margin-top: 40px;
  padding-right: 20px;

  /* @media screen and (max-width: 767px) {
    display: flex;
    /* justify-content: space-between;
    align-items: center; */
  /* flex-direction: column;
    border-bottom: none; */
  /* } */
`;

const Menu = styled.ul`
  /* display: flex;
  justify-content: flex-end;
   */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 20px;
  margin-left: 85px;
`;

const List = styled.li`
  margin-right: 30px;
  font-size: 25px;
  list-style: none;
  justify-content: center;
  align-items: center;

  &:has(a.active) {
    border-bottom: #0479af;
  }

  /* @media screen and (max-width: 767px) {
    display: flex;
    /* justify-content: space-between;
    align-items: center; */
  /* flex-direction: column;
  } */
`;

const Alink = styled(NavLink)`
  text-decoration: none;
  color: #0479af;

  &.active {
    border-bottom: 2px solid #0479af;
  }

  &:hover {
    /* background-color: #e7ffc1; */
    text-shadow: 2px 2px 2px gray;
  }

  /* @media screen and (max-width: 767px) {
    display: flex;
    /* justify-content: space-between;
    align-items: center; */
  /* flex-direction: column;
    border-bottom: none;
  } */
`;

const Logo = styled.img`
  height: 70px;
  width: auto;
  display: block;
`;

export default function HomeHeader() {
  return (
    <Header>
      <Nav>
        <Menu>
          <List>
            <Alink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              홈
            </Alink>
          </List>
          <List>
            <Alink
              to="/ab"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              서비스 소개
            </Alink>
          </List>
          <List>
            <Alink
              to="/in"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              문의하기
            </Alink>
          </List>
          <List>
            <Alink to="/">
              <Logo src={logo} alt="이미지없음" />
            </Alink>
          </List>
          <List>
            <Alink
              to="/map"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              상권 분석
            </Alink>
          </List>
          <List>
            <Alink
              to="/irq"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              업종 추천
            </Alink>
          </List>
          <List>
            <Alink
              to="/po"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              정책 안내
            </Alink>
          </List>
        </Menu>
      </Nav>
    </Header>
  );
}
