import "./Inquiry.css";
import { Link } from "react-router-dom";

export default function Inquiry() {
  return (
    <div className="Inquiry-container">
      <nav>
        <div className="Page-info">문의하기</div>
        <ul className="Menu">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/industry-report">업종 추천</Link>
          </li>
          <li>
            <a href="#">정책 안내</a>
          </li>
          <li>
            <a href="#">서비스소개</a>
          </li>
        </ul>
      </nav>
      <header>
        <div>궁금하신 사항은 아래 양식을 통해 문의해 주시기 바랍니다.</div>
        <div>빠르고 친절하게 답변드리겠습니다.</div>
      </header>
      <article>
        <div className="Inquiry-form">
          <form>
            <div className="form-group">
              <label className="form-label">이름</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">연락처</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">이메일</label>
              <input type="text" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">문의 내용</label>
              <textarea className="form-input" />
            </div>
            <button type="submit" className="submit-button">
              문의하기
            </button>
          </form>
        </div>
      </article>
    </div>
  );
}
