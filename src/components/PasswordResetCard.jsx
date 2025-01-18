import { useNavigate } from 'react-router-dom';
import styles from '../css/passwordResetCard.module.css';
import { useLanguage } from './LanguageContext';

function PasswordResetCard() {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const handleLoginClick = () => {
        navigate('/Auth/login');
    };

    const handleRegisterClick = () => {
        navigate('/Auth/register');
    };

    const ClickHome = () => {
        navigate('/');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Логика отправки email на сервер
        console.log('Email submitted');
    };

    return (
        <div className={styles.dev}>
            <h1 className={styles.title} onClick={ClickHome}>EnergoLib</h1>
            <div className={styles.card}>
                <div className={styles.blockSing}>
                    <div 
                        className={styles.sing}
                        onClick={handleLoginClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={styles.h3}>
                            {language === 'ru' ? 'Вход' : 'Кіру'}
                        </h3>
                    </div>
                    <div 
                        className={styles.sing}
                        onClick={handleRegisterClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={styles.h3}>
                            {language === 'ru' ? 'Регистрация' : 'Тіркелу'}
                        </h3>
                    </div>
                    <div 
                        className={styles.sing}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={styles.active}>
                            {language === 'ru' ? 'Сброс пароля' : 'Қалпына келтіру'}
                        </h3>
                        <div className={styles.rectangleSing}></div>
                    </div>
                    <div className={styles.rectangle}></div>
                </div>
                <input 
                    className={styles.inp} 
                    type="email" 
                    placeholder={
                        language === 'ru' 
                            ? 'Это функция ещё в разработке' 
                            : 'Бұл функция әлі жасалуда'
                    } 
                    required 
                />
                <p className={styles.textCard}>
                {
                        language === 'ru' 
                            ? 'Пожалуйста, укажите email, который вы использовали для входа на сайт' 
                            : 'Сайтқа кіру үшін пайдаланған электрондық поштаны көрсетіңіз'
                    } 
                </p>
                <button className={styles.btn} onClick={handleSubmit}>
                    {language === 'ru' ? 'Отправить' : 'Жіберу'}
                </button>
                <p className={styles.text}>
                    {language === 'ru' 
                        ? 'Не можете вспомнить почту?' 
                        : 'Поштаны еске түсіре алмайсыз ба?'}
                    <a className={styles.link} href="#2">
                        {language === 'ru' ? 'Подсказать' : 'Кеңес беру'}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default PasswordResetCard;
