import React, { useState, useEffect, useMemo, useRef } from "react";
import { Map, Polygon } from "react-kakao-maps-sdk";
import "./KakaoMap.css";
import { guDongMap } from "../data/guDongMapWithCoords";
import { guList as seoulGuList } from "../data/guList";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function KakaoMap() {
  const [searchText, setSearchText] = useState("");
  const [selectedGuId, setSelectedGuId] = useState(null);
  const [selectedDong, setSelectedDong] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });
  const [guPolygons, setGuPolygons] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [labels, setLabels] = useState([]);

  const mapRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/seoul_gu_polygons.json")
      .then((res) => res.json())
      .then((data) => setGuPolygons(data));
  }, []);

  // 구 클릭 시 해당 구에 속하는 행정동 마커 표시
  const handleGuClick = (guId) => {
    // 구에 해당하는 행정동 목록 가져오기
    const selectedGu = guDongMap[guId];

    // 이전에 표시된 마커들 삭제
    markers.forEach((marker) => marker.setMap(null));
    labels.forEach((label) => label.setMap(null));

    const newMarkers = [];
    const newLabels = [];

    // 새로운 마커 표시
    selectedGu.forEach((dong) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(dong.lat, dong.lng),
        map: mapRef.current,
        zIndex: 10,
      });

      // 행정동 마커 위에 라벨 추가
      const label = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(dong.lat, dong.lng),
        content: `<div style="padding:5px; background-color:white; border-radius:5px; box-shadow: 0 0 3px rgba(0,0,0,0.2); font-size:12px;">${dong.label}</div>`, // 동 이름을 라벨로 표시
        xAnchor: 0.5,
        yAnchor: 0, // 마커 바로 위에 라벨이 위치하도록 설정
      });

      label.setMap(mapRef.current); // 라벨을 지도에 추가

      newMarkers.push(marker);
      newLabels.push(label);
    });

    // 새로운 마커들을 상태에 저장
    setMarkers(newMarkers);
    setLabels(newLabels);

    // 구 중심으로 지도 이동
    const guInfo = seoulGuList.find((g) => g.id === guId);
    if (guInfo) {
      setMapCenter({ lat: guInfo.lat, lng: guInfo.lng });
      mapRef.current.setLevel(6);
    }

    setSelectedGuId(guId);
  };

  const handleDongClick = (dongId, dongLabel) => {
    // 해당 동이 속한 구의 ID 찾기
    const guId = Object.keys(guDongMap).find((guId) => {
      return guDongMap[guId].some((dong) => dong.id === dongId);
    });

    if (guId) {
      // 구 클릭 처리 함수 호출 (구 폴리곤 색상, 마커, 확대 처리)
      handleGuClick(guId);

      // 동 선택 후 해당 동으로 지도 이동 (행정동의 좌표로 이동)
      const selectedGu = guDongMap[guId];
      const foundDong = selectedGu.find((dong) => dong.id === dongId);
      if (foundDong) {
        setSelectedDong({ id: dongId, label: dongLabel });
        mapRef.current.setLevel(4); // 지도를 특정 레벨로 축소
        setMapCenter({ lat: foundDong.lat, lng: foundDong.lng }); // **행정동의 좌표**로 이동
      }
    }
  };

  // 검색창에서 동 검색 시 결과 생성
  const searchResults = useMemo(() => {
    if (!searchText.trim()) return [];
    const results = [];
    Object.entries(guDongMap).forEach(([guId, dongs]) => {
      dongs.forEach((dong) => {
        if (dong.label.includes(searchText.trim())) {
          const guInfo = seoulGuList.find((g) => g.id === guId);
          results.push({
            dongId: dong.id,
            dongLabel: dong.label,
            guId,
            guLabel: guInfo?.label,
            guLat: guInfo?.lat,
            guLng: guInfo?.lng,
          });
        }
      });
    });
    return results;
  }, [searchText]);

  // 패널에 보여줄 목록
  const shownItems = useMemo(() => {
    if (searchText.trim()) return searchResults; // 검색 중이면 검색 결과
    if (selectedGuId) return guDongMap[selectedGuId] ?? []; // 구 선택 후 동 목록
    return seoulGuList; // 기본 구 목록
  }, [searchText, selectedGuId, searchResults]);

  const selectedGuLabel = useMemo(() => {
    if (!selectedGuId) return "";
    const found = seoulGuList.find((g) => g.id === selectedGuId);
    return found?.label ?? "";
  }, [selectedGuId]);

  return (
    <div className="kmap-container">
      {/* 우측 상단 네비게이션 메뉴 */}
      <div className="kmap-nav">
        <nav className="kmap-navInner">
          <Link to="/" className="kmap-link">
            홈
          </Link>
          <Link to="/irq" className="kmap-link">
            상권추천
          </Link>
          <Link to="/po" className="kmap-link">
            정책안내
          </Link>
        </nav>
      </div>

      {/* 지도 영역 */}
      <div className="kmap-mapWrapper">
        <Map
          center={mapCenter}
          className="kmap-map"
          level={8}
          draggable={true}
          ref={mapRef}
        >
          {guPolygons.map((gu) => {
            const guCenter = { lat: gu.lat, lng: gu.lng };

            return (
              <React.Fragment key={gu.id}>
                <Polygon
                  path={gu.polygon}
                  strokeColor="#0278AE"
                  strokeOpacity={0.8}
                  strokeWeight={2}
                  fillColor={selectedGuId === gu.id ? "#EF476F" : "#cce6ff"}
                  fillOpacity={0.5}
                  onClick={() => {
                    handleGuClick(gu.id);
                  }}
                />
              </React.Fragment>
            );
          })}
        </Map>
      </div>

      {/* 패널 */}
      <div className="kmap-panel">
        {/* 검색창 */}
        <div className="kmap-searchRow">
          <input
            className="kmap-searchInput"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="동 검색"
          />
          <button className="kmap-searchBtn" type="button">
            🔍
          </button>
        </div>

        <div className="kmap-desc">
          {selectedGuId
            ? "아래 동을 선택 또는 지도에서 선택해주세요."
            : "검색어를 입력하거나 구를 선택해주세요."}
        </div>
        <div className="kmap-title">
          {selectedGuId
            ? "분석할 동을 선택해주세요"
            : "분석할 구를 선택해주세요"}
        </div>

        {/* 목록 버튼 */}
        <div className="kmap-list">
          {shownItems.map((item) => {
            const key = item.dongId ?? item.id;
            const label = item.dongLabel ?? item.label;
            const isSelected = selectedDong?.id === key;

            return (
              <button
                key={key}
                type="button"
                className={`kmap-itemBtn ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  if (!selectedGuId && item.guId) {
                    // 검색 결과에서 동 클릭 시
                    handleDongClick(item.dongId, item.dongLabel);
                    setSearchText("");
                    // 검색된 동의 좌표로 지도 이동
                    if (item.lat && item.lng) {
                      setMapCenter({ lat: item.lat, lng: item.lng }); // 행정동 좌표로 이동
                    }
                  } else if (selectedGuId) {
                    // 구 선택 후 동 클릭 시
                    setSelectedDong({ id: key, label });
                    mapRef.current.setLevel(4);
                    const found = guDongMap[selectedGuId]?.find(
                      (d) => d.id === key
                    );
                    if (found?.lat && found?.lng) {
                      setMapCenter({ lat: found.lat, lng: found.lng }); // 해당 동으로 이동
                    }
                  } else {
                    // 구 버튼 클릭 시
                    setSelectedGuId(item.id);
                    setSelectedDong(null);
                    setSearchText("");
                    handleGuClick(item.id);
                    if (item.lat && item.lng) {
                      setMapCenter({ lat: item.lat, lng: item.lng }); // 구의 중심으로 이동
                    }
                  }
                }}
              >
                {label} {item.guLabel ? `(${item.guLabel})` : ""}
              </button>
            );
          })}
        </div>

        {/* 이전 페이지 버튼 */}
        {selectedGuId && (
          <div className="kmap-backRow">
            <button
              className="kmap-backBtn"
              type="button"
              onClick={() => {
                setSelectedGuId(null);
                setSelectedDong(null);
                setSearchText("");
                markers.forEach((marker) => marker.setMap(null));
                labels.forEach((label) => label.setMap(null));
              }}
            >
              이전 페이지로 돌아가기
            </button>
          </div>
        )}
      </div>

      {/* 분석 리포트 카드 */}
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
                  const region = selectedDong.label;
                  navigate(
                    `/re?gu=${encodeURIComponent(
                      selectedGuLabel
                    )}&region=${encodeURIComponent(region)}`,
                    {
                      state: { guId: selectedGuId, dongId: selectedDong.id },
                    }
                  );
                }}
              >
                네, 작성해주세요.
              </button>
              <button
                className="kmap-secondaryBtn"
                type="button"
                onClick={() => {
                  setSelectedGuId(null);
                  setSelectedDong(null);
                  setSearchText("");
                  setMapCenter({ lat: 37.566826, lng: 126.9786567 });
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
