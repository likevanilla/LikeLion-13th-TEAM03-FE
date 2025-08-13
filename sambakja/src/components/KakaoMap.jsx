import React, { useMemo, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import "./KakaoMap.css";
import { guDongMap } from "../data/guDongMap";
import { useNavigate } from "react-router-dom";

export default function KakaoMap(props) {
  const [searchText, setSearchText] = useState("");
  const [selectedGuId, setSelectedGuId] = useState(null);
  const [selectedDong, setSelectedDong] = useState(null); // { id, label }
  const navigate = useNavigate();

  // 구 목록
  const guList = useMemo(
    () => [
      { id: "11680", label: "강남구" },
      { id: "11740", label: "강동구" },
      { id: "11305", label: "강북구" },
      { id: "11500", label: "강서구" },
      { id: "11620", label: "관악구" },
      { id: "11215", label: "광진구" },
      { id: "11530", label: "구로구" },
      { id: "11545", label: "금천구" },
      { id: "11350", label: "노원구" },
      { id: "11320", label: "도봉구" },
      { id: "11230", label: "동대문구" },
      { id: "11590", label: "동작구" },
      { id: "11440", label: "마포구" },
      { id: "11410", label: "서대문구" },
      { id: "11650", label: "서초구" },
      { id: "11200", label: "성동구" },
      { id: "11290", label: "성북구" },
      { id: "11710", label: "송파구" },
      { id: "11470", label: "양천구" },
      { id: "11560", label: "영등포구" },
      { id: "11170", label: "용산구" },
      { id: "11380", label: "은평구" },
      { id: "11110", label: "종로구" },
      { id: "11140", label: "중구" },
      { id: "11260", label: "중랑구" },
    ],
    []
  );

  const shownItems = selectedGuId ? guDongMap[selectedGuId] ?? [] : guList;

  const selectedGuLabel = useMemo(() => {
    if (!selectedGuId) return "";
    const found = guList.find((g) => g.id === String(selectedGuId));
    return found?.label ?? "";
  }, [guList, selectedGuId]);

  return (
    <div className="kmap-container">
      <div className="kmap-mapWrapper">
        <Map
          center={{ lat: 37.566826, lng: 126.9786567 }}
          className="kmap-map"
          level={3}
        />
      </div>

      {/* 우측 상단 네비게이션 */}
      <div className="kmap-nav">
        <nav className="kmap-navInner">
          <a href="#">홈</a>
          <a href="#">업종추천</a>
          <a href="#">정책안내</a>
        </nav>
      </div>

      {/* 좌측 패널 (검색 + 구/동 목록) */}
      <div className="kmap-panel">
        {/* 검색창 */}
        <div className="kmap-searchRow">
          <input
            className="kmap-searchInput"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={selectedGuId ? "동 검색" : "구 검색"}
          />
          <button
            className="kmap-searchBtn"
            type="button"
            onClick={() => {
              // 실제 검색 동작은 생략 (요구사항 비중 아님)
            }}
          >
            🔍
          </button>
        </div>

        {/* 타이틀 및 상태 토글 */}
        <div className="kmap-desc">
          {selectedGuId
            ? "아래 동을 선택 또는 지도에서 선택해주세요."
            : "아래 구를 선택 또는 지도에서 선택해주세요."}
        </div>
        <div className="kmap-title">
          {selectedGuId
            ? "분석할 동을 선택해주세요"
            : "분석할 구를 선택해주세요"}
        </div>

        {/* 목록 (구 또는 동) */}
        <div className="kmap-list">
          {shownItems
            .filter((item) => {
              const text = typeof item === "string" ? item : item.label;
              return text.includes(searchText.trim());
            })
            .map((item) => {
              const key = typeof item === "string" ? item : item.id;
              const label = typeof item === "string" ? item : item.label;
              const isSelected = !selectedGuId ? selectedGuId === key : false;
              return (
                <button
                  key={key}
                  type="button"
                  className={`kmap-itemBtn ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    if (!selectedGuId) {
                      setSelectedGuId(key);
                      setSearchText("");
                    } else {
                      setSelectedDong({ id: key, label });
                    }
                  }}
                >
                  {label}
                </button>
              );
            })}
        </div>

        {selectedGuId && (
          <div className="kmap-backRow">
            <button
              className="kmap-backBtn"
              type="button"
              onClick={() => {
                setSelectedGuId(null);
                setSearchText("");
                setSelectedDong(null);
              }}
            >
              이전 페이지로 돌아가기
            </button>
          </div>
        )}
      </div>

      {selectedGuId && selectedDong && (
        <div className="kmap-confirmWrap">
          <div className="kmap-confirmCard">
            <div className="kmap-confirmTitle">{`서울특별시 ${selectedGuLabel} ${selectedDong.label}`}</div>
            <div className="kmap-confirmDesc">
              상권 분석 리포트를 작성해드릴까요?
            </div>
            <div className="kmap-confirmButtons">
              <button
                className="kmap-primaryBtn"
                type="button"
                onClick={() => {
                  navigate("/re", {
                    state: { guId: selectedGuId, dongId: selectedDong.id },
                  });
                }}
              >
                네, 작성해주세요.
              </button>
              <button
                className="kmap-secondaryBtn"
                type="button"
                onClick={() => {
                  setSelectedDong(null);
                  setSelectedGuId(null);
                  setSearchText("");
                }}
              >
                아니요, 다시 선택할래요.
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
