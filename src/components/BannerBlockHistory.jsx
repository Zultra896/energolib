import React, { useState } from 'react';
import bannerBlockHistoryStyles from '../css/bannerBlockHistory.module.css';
import btnArrowsStyles from '../css/btnArrows.module.css';
import btnLeft from '../img/arrowsLeft.svg';
import btnRight from '../img/arrowsRight.svg';
import banner1 from '../img/blogHistory.svg';
import banner2 from '../img/bashing.jpg'; // Добавьте изображение для слайдера

const banners = [banner1, banner2]; // Массив с изображениями слайдера

function BannerBlockHistory() {
    const [currentBanner, setCurrentBanner] = useState(0);

    const handlePrev = () => {
        setCurrentBanner((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1)); // Переход к предыдущему изображению
    };

    const handleNext = () => {
        setCurrentBanner((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1)); // Переход к следующему изображению
    };

    return (
        <div className={bannerBlockHistoryStyles.block}>
            <img src={banners[currentBanner]} alt="Banner" />
            <div className={bannerBlockHistoryStyles.btnBlock}>
                <button className={btnArrowsStyles.btnBanner2} onClick={handlePrev}>
                    <img src={btnLeft} alt="Left arrow" />
                </button>
                <button className={btnArrowsStyles.btnBanner2} onClick={handleNext}>
                    <img src={btnRight} alt="Right arrow" />
                </button>
            </div>
        </div>
    );
}

export default BannerBlockHistory;
