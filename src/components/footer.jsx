
import footerStyles from '../css/footer.module.css'
import logoIcon from '../img/logo.svg'
import twitterIcon from '../img/twitterIcon.svg'
import facebookIcon from '../img/facebookIcon.svg'
import instagramIcon from '../img/instagramIcon.svg'
import gitHubIcon from '../img/gitHubIcon.svg'


function Footer() {
  return (
    <footer className={footerStyles.footer}>
        <div className={footerStyles.footer__container}>
            <div className={footerStyles.footer__item}>
                <div className={footerStyles.footer__logo}>
                  <img src={logoIcon} alt="" />
                  <p className={footerStyles.footer__logoTitle}>EnergoLibrary</p>
                </div>
                <div className={footerStyles.footer__description}>
                  <p className={footerStyles.footer__link}>
                  Что то на это что это типа анау мынау Данияр Дарабоз Чорный Тигр Чорный Пантера Чорный Жираф Меган Фокс Уву Фокс  ФОКС                  
                  </p>
                </div>
                <div className={footerStyles.socialNetworks}>
                  <div className={footerStyles.socialNetworks__list}>
                    <img src={twitterIcon} alt="" />
                  </div>
                  <div className={footerStyles.socialNetworks__list}>
                    <img src={facebookIcon} alt="" />
                  </div>
                  <div className={footerStyles.socialNetworks__list}>
                    <img src={instagramIcon} alt="" />
                  </div>
                  <div className={footerStyles.socialNetworks__list}>
                    <img src={gitHubIcon} alt="" />
                  </div>
                </div>
            </div>
            <div className={footerStyles.footer__item}>
                  <div className={footerStyles.footer__list}>
                    <p className={footerStyles.footer__title}>Каталог</p>
                    <p className={footerStyles.footer__link}>О нас</p>
                    <p className={footerStyles.footer__link}>Новости</p>
                    <p className={footerStyles.footer__link}>Обратная связь</p>
                    <p className={footerStyles.footer__link}>Вакансии</p>
                  </div>
            </div>
            <div className={footerStyles.footer__item}>
            <div className={footerStyles.footer__list}>
                    <p className={footerStyles.footer__title}>Помощь</p>
                    <p className={footerStyles.footer__link}>Customer Support</p>
                    <p className={footerStyles.footer__link}>Delivery Details</p>
                    <p className={footerStyles.footer__link}>Terms & Conditions</p>
                    <p className={footerStyles.footer__link}>Privacy Policy</p>
                  </div>
            </div>
            <div className={footerStyles.footer__item}>
            <div className={footerStyles.footer__title}>
            <div className={footerStyles.footer__list}>
                   <p className={footerStyles.footer__title}>Вопросы</p>
                   <div className={footerStyles.footer__question}>
                   <input className={footerStyles.footer__inp} type="text" name="" id="" placeholder='Введите' />
                   <button className={footerStyles.footer__btn}>Отправить</button>
                   </div>
                  </div>
                  </div>
            </div>
        </div>
              <p className={footerStyles.footer__rights}>
              © Copyright 2024, All Rights Reserved by Energo
              </p>
    </footer>
  )
}

export default Footer