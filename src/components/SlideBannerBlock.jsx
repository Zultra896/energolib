import React from 'react';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import slideBannerBlockStyles from '../css/slideBannerBlock.module.css';

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
                                src="https://initiate.alphacoders.com/image_requests/243977-final.jpg"
                                alt="Banner 1"
                                className={slideBannerBlockStyles.slideImage}
                            />
                        </div>

                    </SplideSlide>
                    <SplideSlide>
                        <div className={slideBannerBlockStyles.slide}>
                            <img
                                src="https://images.alphacoders.com/666/thumb-1920-666466.jpg"
                                alt="Banner 2"
                                className={slideBannerBlockStyles.slideImage}
                            />
                        </div>
                    </SplideSlide>
                    <SplideSlide>
                        <div className={slideBannerBlockStyles.slide}>
                            <img
                                src="https://wallpapers.com/images/hd/dc-universe-online-bat-family-illustration-3bswhsym7gikmy6f.jpg"
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
