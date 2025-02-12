import footerStyles from '../css/footer.module.css'
import logoIcon from '../img/logo.svg'
import twitterIcon from '../img/twitterIcon.svg'
import facebookIcon from '../img/facebookIcon.svg'
import instagramIcon from '../img/instagramIcon.svg'
import gitHubIcon from '../img/gitHubIcon.svg'
import { useLanguage } from './LanguageContext'
import { Link, useNavigate } from 'react-router-dom';


function Footer() {
  const navigate = useNavigate();

  const { language } = useLanguage();
  const placeholderText = language === "ru" ? "Поиск" : "Іздеу";

  return (
    <footer className={footerStyles.footer}>
        <div className={footerStyles.footer__container}>
                <div className={footerStyles.footer__list}>
                  <div className={footerStyles.footer__logo}>
                    <img src={logoIcon} alt="" />
                    <Link className={footerStyles.footer__logoTitle} to="/">
                    EnergoLibrary</Link>
                  </div>
                  <div className={footerStyles.footer__description}>
                    <p className={footerStyles.footer__link}>
                      {language === 'ru' ? 'Онлайн библиотека для вашего удобства ' : 'Сізге ыңғайлы болу үшін онлайн кітапхана'}
                    </p>
                  </div>
                </div>
            <div className={footerStyles.footer__block}>
                  <div className={footerStyles.footer__list}>
                    <p className={footerStyles.footer__link} onClick={() => navigate('/catalog')}>Каталог</p>
                    <p className={footerStyles.footer__link} onClick={() => navigate('/About')}>
                      {language === 'ru'? 'О нас' : 'Біз туралы'}
                    </p>
                  </div>
                  <div className={footerStyles.footer__list}>
                    <p className={footerStyles.footer__link} onClick={() => navigate('/NewsContainer')}>
                      {language === 'ru'? 'Новости' : 'Жаңалықтар'}
                    </p>
                    <p className={footerStyles.footer__link} onClick={() => navigate('/Feedback')}>
                      {language === 'ru'? 'Обратная связь' : 'Кері байланыс'}
                    </p>
            </div>
            <div className={footerStyles.footer__list}>
                <p className={footerStyles.footer__title}>
                {language === 'ru'? 'Вопросы' : 'Сұрақтар'}
                </p>
                <div className={footerStyles.footer__question}>
                <input className={footerStyles.footer__inp} type="text" name="" id=""   placeholder={placeholderText}/>
                <button className={footerStyles.footer__btn}>
                {language === 'ru'? 'Отправить' : 'Жіберу'}
                </button>
                </div>
                </div>
            </div>
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
            <p className={footerStyles.footer__rights}>
                © Copyright 2025, All Rights Reserved by Energo
            </p>
    </footer>
  )
}

export default Footer
