import React, { useState } from 'react';
import bannerBlockHistoryStyles from '../css/bannerBlockHistory.module.css';
import btnArrowsStyles from '../css/btnArrows.module.css';
import btnLeft from '../img/arrowsLeft.svg';
import btnRight from '../img/arrowsRight.svg';
import banner1 from '../img/blogHistory.svg';
import banner2 from '../img/bashing.jpg';

const banners = [
    {
        img: banner1,
        title: "Из заключенных в великого утешителя",
        description: "Имя американского писателя О. Генри знает весь мир. У всех в чести его небольшие истории о приключениях благородных жуликов, радостях и заботах простых жителей Нью-Йорка, невероятных совпадениях и парадоксах жизни. Среди этих рассказов есть весёлые и задумчивые, смешные и грустные, но в каждом из них проявляется невероятная наблюдательность автора."
    },
    {
        img: banner2,
        title: "Другой заголовок",
        description: "Описание второго баннера. Оно может быть любым и соответствовать изображению."
    }
];

function BannerBlockHistory() {
    const [currentBanner, setCurrentBanner] = useState(0);

    const handlePrev = () => {
        setCurrentBanner((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentBanner((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
    };

    const { img, title, description } = banners[currentBanner];

    return (
        <div className={bannerBlockHistoryStyles.block}>
            <img src={img} alt="Banner" />
            <div className={bannerBlockHistoryStyles.textBlock}>
                <h3 className={bannerBlockHistoryStyles.title}>{title}</h3>
                <p className={bannerBlockHistoryStyles.description}>{description}</p>
            </div>
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
