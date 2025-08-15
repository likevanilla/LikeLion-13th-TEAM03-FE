import React, { useMemo, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import "./KakaoMap.css";
import { guDongMap } from "../data/guDongMapWithCoords";
import { useNavigate } from "react-router-dom";

export default function KakaoMap(props) {
  // 검색창 입력값 상태
  const [searchText, setSearchText] = useState("");
  // 현재 선택된 구 ID (없으면 null)
  const [selectedGuId, setSelectedGuId] = useState(null);
  // 현재 선택된 동 객체 (없으면 null, { id, label } 형태)
  const [selectedDong, setSelectedDong] = useState(null);
  // 지도 중심 좌표 (기본값: 서울 시청 좌표)
  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });

  // 페이지 이동을 위한 react-router-dom 훅
  const navigate = useNavigate();

  /**
   * 서울시 25개 구 목록
   * useMemo를 사용해 컴포넌트 재렌더링 시 불필요하게 새 배열 생성 방지
   */
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

  /**
   * 현재 표시해야 할 목록
   * - 구 선택 전: 구 목록
   * - 구 선택 후: 해당 구의 동 목록 (guDongMap에서 가져옴)
   */
  const shownItems = selectedGuId ? guDongMap[selectedGuId] ?? [] : guList;

  /**
   * 현재 선택된 구의 label (ex: "강남구")
   * - 선택된 구 ID가 없으면 빈 문자열
   */
  const selectedGuLabel = useMemo(() => {
    if (!selectedGuId) return "";
    const found = guList.find((g) => g.id === String(selectedGuId));
    return found?.label ?? "";
  }, [guList, selectedGuId]);

  return (
    <div className="kmap-container">
      {/* 지도 영역 */}
      <div className="kmap-mapWrapper">
        <Map center={mapCenter} className="kmap-map" level={3} />
      </div>

      {/* 우측 상단 네비게이션 메뉴 */}
      <div className="kmap-nav">
        <nav className="kmap-navInner">
          <a href="#">홈</a>
          <a href="#">업종추천</a>
          <a href="#">정책안내</a>
        </nav>
      </div>

      {/* 좌측 패널: 검색창 + 구/동 선택 목록 */}
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
              // 현재 구현은 없음 (검색 기능 비중 낮음)
            }}
          >
            🔍
          </button>
        </div>

        {/* 안내 문구 */}
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

        {/* 구/동 목록 */}
        <div className="kmap-list">
          {shownItems
            // 검색어 필터링
            .filter((item) => {
              const text = typeof item === "string" ? item : item.label;
              return text.includes(searchText.trim());
            })
            // 목록 버튼 생성
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
                      // 구 선택 → 동 목록으로 전환
                      setSelectedGuId(key);
                      setSearchText("");
                    } else {
                      // 동 선택
                      setSelectedDong({ id: key, label });

                      // 해당 동의 좌표가 있으면 지도 중심 이동
                      const found = guDongMap[String(selectedGuId)]?.find(
                        (d) => d.id === String(key)
                      );
                      if (
                        found &&
                        typeof found.lat === "number" &&
                        typeof found.lng === "number"
                      ) {
                        setMapCenter({ lat: found.lat, lng: found.lng });
                      }
                    }
                  }}
                >
                  {label}
                </button>
              );
            })}
        </div>

        {/* '이전 페이지로 돌아가기' 버튼 (동 목록에서만 표시) */}
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

      {/* 동까지 선택했을 때 → 분석 리포트 작성 여부 확인 카드 */}
      {selectedGuId && selectedDong && (
        <div className="kmap-confirmWrap">
          <div className="kmap-confirmCard">
            <div className="kmap-confirmTitle">{`서울특별시 ${selectedGuLabel} ${selectedDong.label}`}</div>
            <div className="kmap-confirmDesc">
              상권 분석 리포트를 작성해드릴까요?
            </div>
            <div className="kmap-confirmButtons">
              {/* '네' → /re 페이지로 이동하면서 선택 정보 전달 */}
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

              {/* '아니요' → 선택 초기화 */}
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
