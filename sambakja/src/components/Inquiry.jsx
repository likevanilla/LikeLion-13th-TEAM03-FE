import "./Inquiry.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import HomeHeader from "./HomeHeader";

export default function Inquiry() {
  const [emailDomain, setEmailDomain] = useState("");

  const handleEmailDomainChange = (e) => {
    const selectedDomain = e.target.value;
    setEmailDomain(selectedDomain);
  };

  return (
    <div className="Inquiry-container">
      <HomeHeader pageInfo="문의하기" />
      <header>
        <div>궁금하신 사항은 아래 양식을 통해 문의해 주시기 바랍니다.</div>
        <div>빠르고 친절하게 답변드리겠습니다.</div>
        <hr />
      </header>
      <div className="Inquiry-form-container">
        <div className="Inquiry-form">
          <form>
            <div className="form-group">
              <label className="form-label">이름</label>
              <input type="text" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">연락처</label>
              <input
                type="text"
                className="form-input"
                placeholder="예: 010-1234-5678"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">이메일</label>
              <div className="email-input-group">
                <input
                  type="text"
                  className="form-input email-input"
                  required
                />
                <span className="email-at">@</span>
                <input
                  type="text"
                  className="form-input email-input"
                  value={emailDomain}
                  onChange={(e) => setEmailDomain(e.target.value)}
                  required
                />
                <select
                  className="email-dropdown"
                  onChange={handleEmailDomainChange}
                  value={emailDomain}
                >
                  <option value="">직접입력</option>
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">문의 내용</label>
              <textarea className="form-textarea" rows="6" required />
            </div>
            <div className="button-container">
              <button type="submit" className="submit-button">
                문의하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
