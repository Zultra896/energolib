import React, { useState } from 'react';
import bannerBlockStyles from '../css/bannerBlock.module.css';
import btnArrowsStyles from '../css/btnArrows.module.css';
import banner1 from '../img/Bibliya_Piskatora.jpg';
import banner2 from '../img/photo1694678778-701x500.jpeg'; // Добавьте другие баннеры
import banner3 from '../img/Screenshot-2024-08-28-at-6.58.48-AM-701x500.jpg';
import btnLeft from '../img/arrowsLeft.svg';
import btnRight from '../img/arrowsRight.svg';

const banners = [
  { img: banner1, title: 'Книжные памятники', description: 'Историческое и художественное наследие России' },
  { img: banner2, title: 'Современные издания', description: 'Лучшие книги нашего времени' },
  { img: banner3, title: 'Классическая литература', description: 'Произведения, которые нужно знать' },
];

function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className={bannerBlockStyles.bannerBlock}>
      <div className={bannerBlockStyles.bannerBlock__info}>
        <div className={bannerBlockStyles.btnBlock}>
          <button className={btnArrowsStyles.btnBanner} onClick={handlePrev}>
            <img src={btnLeft} alt="Previous" />
          </button>
          <button className={btnArrowsStyles.btnBanner} onClick={handleNext}>
            <img src={btnRight} alt="Next" />
          </button>
        </div>
        <h2 className={bannerBlockStyles.title}>{banners[currentSlide].title}</h2>
        <p className={bannerBlockStyles.description}>{banners[currentSlide].description}</p>
        <a className={bannerBlockStyles.link} href="#1">
          Подробнее
        </a>
      </div>
      <div className={bannerBlockStyles.bannerBlock__photo}>
        <img
          className={bannerBlockStyles.bannerBlock__photoBack}
          src={banners[currentSlide].img}
          alt={banners[currentSlide].title}
        />
      </div>
    </div>
  );
}

export default BannerSlider;
