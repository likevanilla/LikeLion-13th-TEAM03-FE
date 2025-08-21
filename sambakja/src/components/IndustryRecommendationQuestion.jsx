import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./IndustryRecommendationQuestion.css";
import HomeHeader from "./HomeHeader";
import { industryList } from "../data/industryList";
import { budgetList } from "../data/industryList";

export default function IndustryRecommendationQuestion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: "선택안함",
    majorCategory: "",
    midCategory: "",
    minorCategory: "",
    investmentBudget: "",
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

  const majorOptions = useMemo(
    () => industryList.map((m) => m.majorCategory),
    []
  );

  const midOptions = useMemo(() => {
    const major = industryList.find(
      (m) => m.majorCategory === formData.majorCategory
    );
    return major ? major.mids.map((x) => x.midCategory) : [];
  }, [formData.majorCategory]);

  const minorOptions = useMemo(() => {
    const major = industryList.find(
      (m) => m.majorCategory === formData.majorCategory
    );
    const mid = major?.mids.find((x) => x.midCategory === formData.midCategory);
    return mid ? mid.minorCategory : [];
  }, [formData.majorCategory, formData.midCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("폼 데이터:", formData);
    const params = new URLSearchParams({
      sex: formData.gender,
      type_large: formData.majorCategory,
      type_medium: formData.midCategory,
      type_small: formData.minorCategory,
      budget: formData.investmentBudget,
    });

    navigate(`/irr?${params.toString()}`);
  };

  return (
    <div className="industry-recommendation-container">
      <HomeHeader pageInfo="업종 추천 질문" />

      <main className="main-content">
        <form onSubmit={handleSubmit} className="question-form">
          <div className="form-group">
            <label className="form-label">성별</label>
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
            <label className="form-label">업종 대분류</label>
            <select
              className="form-select"
              value={formData.majorCategory}
              onChange={(e) =>
                handleInputChange("majorCategory", e.target.value)
              }
              required
            >
              <option value="">대분류를 선택해주세요</option>
              {majorOptions.map((maj) => (
                <option key={maj} value={maj}>
                  {maj}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">업종 중분류</label>
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
              {midOptions.map((mid) => (
                <option key={mid} value={mid}>
                  {mid}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">업종 세분류</label>
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
              {minorOptions.map((minor) => (
                <option key={minor} value={minor}>
                  {minor}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">투자 예산</label>
            <select
              className="form-select"
              value={formData.investmentBudget}
              onChange={(e) =>
                handleInputChange("investmentBudget", e.target.value)
              }
              required
            >
              <option value="">투자 예산을 선택해주세요</option>
              {budgetList.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
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
