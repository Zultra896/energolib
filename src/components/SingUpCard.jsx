import { useNavigate } from 'react-router-dom';
import styles from '../css/singUpCard.module.css';
import { useLanguage } from './LanguageContext';


function SingUpCard () {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const ClickLodin = () => {
        navigate('/Auth/login');
    };
    const ClickReset = () => {
        navigate('/Auth/reset');
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
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={styles.active}>
                            {language === 'ru'? 'Регистрация' : 'Тіркелу'}
                        </h3>
                        <div className={styles.rectangleSing}></div>
                    </div>
                    <div 
                        className={styles.sing}
                        onClick={ClickReset}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={styles.h3}>
                            {language === 'ru'? 'Сброс пароля' : 'Қалпына келтіру'}
                        </h3>
                    </div>

                    <div className={styles.rectangle}>
                    </div>
                </div>
                <button className={styles.btn}>
                    {language === 'ru'? 'Форма регистрации' : 'Тіркелу формасы'}
                </button>
                <p className={styles.text}>
                    {language === 'ru'? 'Регистрируясь, вы соглашаетесь' : 'Тіркелу арқылы сіз келісесіз'}
                    <a className={styles.link} href="#2">
                        {language === 'ru'? 'с условиями использования и правилами сайта' : 'пайдалану шарттарымен және сайт ережелерімен'}
                    </a>
                </p>
            </div>
        </div>
    )
}

export default SingUpCard;