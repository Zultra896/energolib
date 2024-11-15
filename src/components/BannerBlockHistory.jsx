import bannerBlockHistoryStyles from '../css/bannerBlockHistory.module.css';
import btnArrowsStyles from '../css/btnArrows.module.css';
import btnLeft from '../img/arrowsLeft.svg';
import btnRight from '../img/arrowsRight.svg';
import banner from '../img/blogHistory.svg';


function bannerBlockHistory () {
    return (
        <div className={bannerBlockHistoryStyles.block}>
            <img src={banner} alt="" />
            <div className={bannerBlockHistoryStyles.btnBlock}>
                <button className={btnArrowsStyles.btnBanner2}>
                    <img src={btnLeft} alt=""  />
                </button>
                <button className={btnArrowsStyles.btnBanner2}>
                    <img src={btnRight} alt=""  />
                </button>
            </div>
        </div>
    )
}

export default bannerBlockHistory