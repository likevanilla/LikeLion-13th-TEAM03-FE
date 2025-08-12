import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./IndustryRecommendationQuestion.css";

export default function IndustryRecommendationQuestion() {
  const [formData, setFormData] = useState({
    gender: "선택안함",
    businessType: "",
    majorCategory: "",
    midCategory: "",
    minorCategory: "",
    businessForm: "",
    investmentBudget: "",
  });

  const [categories, setCategories] = useState({
    major: [],
    mid: [],
    minor: [],
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "majorCategory") {
      setFormData((prev) => ({
        ...prev,
        midCategory: "",
        minorCategory: "",
      }));
    } else if (field === "midCategory") {
      setFormData((prev) => ({
        ...prev,
        minorCategory: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("폼 데이터:", formData);
  };

  return (
    <div className="industry-recommendation-container">
      <nav>
        <div className="Page-info">업종 추천 질문</div>
        <ul className="Menu">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/commercial-report">상권 분석</Link>
          </li>
          <li>
            <a href="#">정책 안내</a>
          </li>
          <li>
            <a href="#">서비스소개</a>
          </li>
          <li>
            <Link to="/inquiry">문의하기</Link>
          </li>
        </ul>
      </nav>

      <main className="main-content">
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-group">
            <label className="form-label">
              성별<span className="required">*</span>
            </label>
            <div className="gender-buttons">
              <button
                type="button"
                className={`gender-btn ${
                  formData.gender === "남성" ? "selected" : ""
                }`}
                onClick={() => handleInputChange("gender", "남성")}
              >
                남성
              </button>
              <button
                type="button"
                className={`gender-btn ${
                  formData.gender === "여성" ? "selected" : ""
                }`}
                onClick={() => handleInputChange("gender", "여성")}
              >
                여성
              </button>
              <button
                type="button"
                className={`gender-btn ${
                  formData.gender === "선택안함" ? "selected" : ""
                }`}
                onClick={() => handleInputChange("gender", "선택안함")}
              >
                선택안함
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              사업 종류<span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.businessType}
              onChange={(e) =>
                handleInputChange("businessType", e.target.value)
              }
              required
            >
              <option value="">사업 종류를 선택해주세요</option>
              <option value="서비스업">서비스업</option>
              <option value="제조업">제조업</option>
              <option value="도소매업">도소매업</option>
              <option value="음식점업">음식점업</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              업종 대분류<span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.majorCategory}
              onChange={(e) =>
                handleInputChange("majorCategory", e.target.value)
              }
              required
            >
              <option value="">대분류를 선택해주세요</option>
              <option value="음식점업">음식점업</option>
              <option value="소매업">소매업</option>
              <option value="서비스업">서비스업</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              업종 중분류<span className="required">*</span>
            </label>
            <select
              className={`form-select ${
                !formData.majorCategory ? "disabled" : ""
              }`}
              value={formData.midCategory}
              onChange={(e) => handleInputChange("midCategory", e.target.value)}
              disabled={!formData.majorCategory}
              required
            >
              <option value="">
                {formData.majorCategory
                  ? "중분류를 선택해주세요"
                  : "먼저 대분류를 선택해주세요"}
              </option>
              {formData.majorCategory && (
                <>
                  <option value="한식">한식</option>
                  <option value="중식">중식</option>
                  <option value="일식">일식</option>
                  <option value="양식">양식</option>
                </>
              )}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              업종 세분류<span className="required">*</span>
            </label>
            <select
              className={`form-select ${
                !formData.midCategory ? "disabled" : ""
              }`}
              value={formData.minorCategory}
              onChange={(e) =>
                handleInputChange("minorCategory", e.target.value)
              }
              disabled={!formData.midCategory}
              required
            >
              <option value="">
                {formData.midCategory
                  ? "세분류를 선택해주세요"
                  : "먼저 중분류를 선택해주세요"}
              </option>
              {formData.midCategory && (
                <>
                  <option value="한식집">한식집</option>
                  <option value="분식점">분식점</option>
                  <option value="치킨집">치킨집</option>
                </>
              )}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              사업 형태<span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.businessForm}
              onChange={(e) =>
                handleInputChange("businessForm", e.target.value)
              }
              required
            >
              <option value="">사업 종류를 선택해주세요</option>
              <option value="개인사업자">개인사업자</option>
              <option value="법인사업자">법인사업자</option>
              <option value="프랜차이즈">프랜차이즈</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              투자 예산<span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={formData.investmentBudget}
              onChange={(e) =>
                handleInputChange("investmentBudget", e.target.value)
              }
              required
            >
              <option value="">사업 종류를 선택해주세요</option>
              <option value="1000만원 미만">1000만원 미만</option>
              <option value="1000만원-3000만원">1000만원-3000만원</option>
              <option value="3000만원-5000만원">3000만원-5000만원</option>
              <option value="5000만원 이상">5000만원 이상</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            업종 추천 리포트를 작성해드릴까요?
          </button>
        </form>
      </main>
    </div>
  );
}
