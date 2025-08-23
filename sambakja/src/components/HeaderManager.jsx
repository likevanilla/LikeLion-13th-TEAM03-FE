import { useState, useEffect } from "react";
import HomeHeader from "./HomeHeader";
import MobileHeader from "./MobileHeader";

// 헤더 관리 컴포넌트
export default function HeaderManager() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    // 화면 크기 변경에 따라 상태 업데이트
    const updateMedia = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", updateMedia);
    updateMedia(); // 초기 실행

    return () => window.removeEventListener("resize", updateMedia); // cleanup
  }, []);

  return isDesktop ? <HomeHeader /> : <MobileHeader />;
}
