import React from "react";
import { Map } from "react-kakao-maps-sdk";

export default function KakaoMap(props) {
  return (
    <Map
      center={{ lat: 33.450701, lng: 126.570667 }}
      style={{ width: "2000px", height: "900px" }}
      level={3}
    />
  );
}
