import bannerBlockStyles from '../css/bannerBlock.module.css'
import btnArrowsStyles from '../css/btnArrows.module.css'
import banner from '../img/Bibliya_Piskatora.jpg'
import btnLeft from '../img/arrowsLeft.svg'
import btnRight from '../img/arrowsRight.svg'


function bannerBlock() {
  return (
    <div className={bannerBlockStyles.bannerBlock}>
        <div className={bannerBlockStyles.bannerBlock__info}>
            <div className={bannerBlockStyles.btnBlock}>
              <button className={btnArrowsStyles.btnBanner}>
                <img src={btnLeft} alt=""  />
              </button>
              <button className={btnArrowsStyles.btnBanner}>
                <img src={btnRight} alt=""  />
              </button>
            </div>
            <h2 className={bannerBlockStyles.title}>Книжные памятники</h2>
            <p className={bannerBlockStyles.description}>Возможность познакомиться с историческим, культурным и художественным наследием России</p>
            <a className={bannerBlockStyles.link} href="">Подробнее</a>
        </div>
        <div className={bannerBlockStyles.bannerBlock__photo}>
            <img className={bannerBlockStyles.bannerBlock__photoBack} src={banner} alt="" />
        </div>
    </div>
  )
}

export default bannerBlock