import styled from "styled-components";

const FooterSt = styled.footer`
  padding: 16px 0;
  text-align: center;
  font-size: 12px;
  border-top: 1px solid #666;
  max-width: 800px;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  margin-top: 15px;
`;

export default function Footer() {
  const year = new Date().getFullYear();
  return <FooterSt>© {year} 어디가게? 팀. All rights reserved.</FooterSt>;
}
