import { useNavigate } from 'react-router-dom';
import styles from '../css/passwordResetCard.module.css';
import { useLanguage } from './LanguageContext';

function PasswordResetCard () {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const ClickLodin = () => {
        navigate('/Auth/login');
    };
    const ClickRegister = () => {
        navigate('/Auth/register');
    };
    return (
        <div className={styles.dev}>
            <h1 className={styles.title}>EnergoLib</h1>
            <div className={styles.card}>
                <div className={styles.blockSing}>
                    <div 
                        className={styles.sing}
                        onClick={ClickLodin}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={styles.h3}>
                        {language === 'ru'? 'Вход' : 'Кіру'}
                        </h3>
                    </div>
                    <div 
                        className={styles.sing}
                        onClick={ClickRegister}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={styles.h3}>
                        {language === 'ru'? 'Регистрация' : 'Тіркелу'}
                        </h3>
                    </div>
                    <div 
                        className={styles.sing}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={styles.active}>
                        {language === 'ru'? 'Сброс пароля' : 'Қалпына келтіру'}
                        </h3>
                        <div className={styles.rectangleSing}></div>
                    </div>

                    <div className={styles.rectangle}>
                    </div>
                </div>
<<<<<<< HEAD
                <input className={styles.inp} type="email" placeholder="Email" required />
                <p className={styles.textCard}>                
                    {language === 'ru'? 'Пожалуйста, укажите email, который вы использовали для входа на сайт' : 'Сайтқа кіру үшін пайдаланған электрондық поштаны көрсетіңіз'}
=======
                <input className={styles.inp} type="email" placeholder="На данный момент это функция не работает" value={"На данный момент это функция не работает"} required />
                <p className={styles.textCard}>
                    Пожалуйста, укажите email, который вы использовали для входа на сайт
>>>>>>> b6c58f4c692732eca0ebfb9ba95723f30ea4da23
                </p>
                <button className={styles.btn}>
                {language === 'ru'? 'Вход' : 'Кіру'}
                </button>
                <p className={styles.text}>
                    {language === 'ru'? 'Не можете вспомнить почту?' : 'Поштаны еске түсіре алмайсыз ба?'}
                    <a className={styles.link} href="#2">
                        {language === 'ru'? 'Подсказать' : 'Кеңес беру'}
                    </a>
                </p>
            </div>
        </div>
    )
}

export default PasswordResetCard;