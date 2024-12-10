import React from 'react';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import slideBannerBlockStyles from '../css/slideBannerBlock.module.css';
import img1 from '../img/buzz.jpg';
import img2 from '../img/mooneye.jpg';
import img3 from '../img/redforest.jpg'

function SlideBannerBlock() {
    return (
        <div className={slideBannerBlockStyles.container}>
            <div className={slideBannerBlockStyles.sliderContainer}>
                <Splide
                    options={{
                        gap: '1rem',
                        type: 'loop',
                        padding: '5rem',
                    }}
                >
                    <SplideSlide>
                        <div className={slideBannerBlockStyles.slide}>
                            <img
                                src={img1}
                                alt="Banner 1"
                                className={slideBannerBlockStyles.slideImage}
                            />
                        </div>

                    </SplideSlide>
                    <SplideSlide>
                        <div className={slideBannerBlockStyles.slide}>
                            <img
                                src={img2}
                                alt="Banner 2"
                                className={slideBannerBlockStyles.slideImage}
                            />
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className={slideBannerBlockStyles.slide}>
                            <img
                                src={img3}
                                alt="Banner 3"
                                className={slideBannerBlockStyles.slideImage}
                            />
                        </div>
                    </SplideSlide>
                </Splide>
            </div>
        </div>
        
    );
}

export default SlideBannerBlock;
