import "./Inquiry.css";
import { useState } from "react";
import HomeHeader from "./HomeHeader";
import { api } from "../apis/api";

export default function Inquiry() {
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ok, setOk] = useState(false);

  const handleEmailDomainChange = (e) => {
    const selectedDomain = e.target.value;
    setEmailDomain(selectedDomain);
  };

  async function postInquiry() {
    try {
      const res = await api.post("/api/inquiry", {
        name: name.trim(),
        phone: phoneNum.trim(),
        email: `${email.trim()}@${emailDomain.trim()}`,
        message: message.trim(),
      });

      console.log(res);

      setOk(true);
      setName("");
      setPhoneNum("");
      setEmail("");
      setEmailDomain("");
      setMessage("");
      console.log("데이터 전송 성공");
    } catch (e) {
      setError(true);
      console.log("데이터 전송 실패");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postInquiry();
  };

  function Modal() {
    return (
      <div className="simple-modal-backdrop" onClick={() => setOk(false)}>
        <div className="simple-modal">
          <p>
            문의가 정상적으로 접수되었습니다.
            <br />
            빠른 시일 내에 답변드리겠습니다.
          </p>
          <button
            type="button"
            className="simple-modal-button"
            onClick={() => setOk(false)}
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="Inquiry-container">
      {ok && <Modal />}
      <HomeHeader pageInfo="문의하기" />
      <header>
        <div>궁금하신 사항은 아래 양식을 통해 문의해 주시기 바랍니다.</div>
        <div>빠르고 친절하게 답변드리겠습니다.</div>
        <hr />
      </header>
      <div className="Inquiry-form-container">
        <div className="Inquiry-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">이름</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">연락처</label>
              <input
                type="text"
                className="form-input"
                placeholder="예: 010-1234-5678"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">이메일</label>
              <div className="email-input-group">
                <input
                  type="text"
                  className="form-input email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <textarea
                className="form-textarea"
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
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
