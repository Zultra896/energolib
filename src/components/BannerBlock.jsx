import React, { useState, useEffect } from 'react';
import bannerBlockStyles from '../css/bannerBlock.module.css';
import btnArrowsStyles from '../css/btnArrows.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import btnRight from '../img/arrowsRight.svg'
import btnLeft from '../img/arrowsLeft.svg'

function BannerSlider() {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://localhost:5000/collections'); // Предположим, что сервер возвращает массив баннеров
        setBanners(response.data);
      } catch (error) {
        console.error('Ошибка загрузки баннеров:', error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, [banners]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (banners.length === 0) {
    return <div>Загрузка...</div>; // Пока данные не загружены, показываем индикатор загрузки
  }

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
        <h2 className={bannerBlockStyles.title}>{banners[currentSlide].name}</h2>
        <p className={bannerBlockStyles.description}>{banners[currentSlide].description}</p>
        <p className={bannerBlockStyles.link} onClick={() => navigate(`/collection/${banners[currentSlide].id}`)}>
          Подробнее
        </p>
      </div>
      <div className={bannerBlockStyles.bannerBlock__photo}>
        {banners.map((banner, index) => (
          <img
            key={banner.id} // Используем уникальный идентификатор баннера
            className={`${bannerBlockStyles.bannerBlock__photoBack} ${currentSlide === index ? bannerBlockStyles.visible : ''}`}
            src={banner.img_url} // Ссылка на картинку из данных
            alt={banner.title}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerSlider;
