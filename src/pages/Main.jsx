import BannerBlock from '../components/BannerBlock.jsx'
// import BlockHistory from '../components/BlockHistory.jsx'
import BlockHistory2 from '../components/BlockHistory2.jsx'
// import SlideBannerBlock from '../components/SlideBannerBlock.jsx'

import React, { useState, useEffect } from'react';
import Search from '../components/Search.jsx';

export default function Main() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 378);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 378);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div>
        {isSmallScreen && <Search />} {/* Показываем поиск только если экран ≤ 378px */}
        <BannerBlock />
        {/* <BlockHistory /> */}
        <BlockHistory2 />
        {/* <SlideBannerBlock /> */}
    </div>
  )
}