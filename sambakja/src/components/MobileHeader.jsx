import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/어디가게로고.png";
import { useState } from "react";

const MobileNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const MobileLogo = styled.img`
  height: 50px;
  width: auto;
`;

const HamburgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  cursor: pointer;

  div {
    height: 4px;
    background-color: #0479af;
    border-radius: 10px;
  }
`;

const MobileMenu = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  padding: 20px;
  text-align: center;

  a {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: #0479af;
    font-size: 20px;

    &:hover {
      text-shadow: 2px 2px 2px gray;
    }
  }
`;

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <MobileNav>
      <Link to="/">
        <MobileLogo src={logo} alt="로고" />
      </Link>
      <HamburgerIcon onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </HamburgerIcon>
      <MobileMenu open={menuOpen}>
        <Link to="/" onClick={toggleMenu}>
          홈
        </Link>
        <Link to="/ab" onClick={toggleMenu}>
          서비스 소개
        </Link>
        <Link to="/in" onClick={toggleMenu}>
          문의하기
        </Link>
        <Link to="/map" onClick={toggleMenu}>
          상권 분석
        </Link>
        <Link to="/irq" onClick={toggleMenu}>
          업종 추천
        </Link>
        <Link to="/po" onClick={toggleMenu}>
          정책 안내
        </Link>
      </MobileMenu>
    </MobileNav>
  );
}
