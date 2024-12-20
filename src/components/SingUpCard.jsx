import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/singUpCard.module.css';
import { useLanguage } from './LanguageContext';

function SingUpCard() {
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { language } = useLanguage();

    const passwordLanguage = language === 'ru' ? 'Пороль' : 'Құпиясөз';


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверяем длину пароля
        if (password.length !== 8) {
            setErrorMessage('Пароль должен быть ровно 8 символов');
            return;
        }

        const userData = { email, password, first_name: firstName, last_name: lastName };

        try {
            const response = await fetch('http://localhost:5000/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (data.success) {
                navigate('/Auth/login');  // Переходим на страницу входа после успешной регистрации
            } else {
                setErrorMessage(data.message);  // Отображаем ошибку, если регистрация не удалась
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса на сервер:', error);
            setErrorMessage('Ошибка при регистрации. Попробуйте позже.');
        }
    };

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

                    <div className={styles.rectangle}></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        className={styles.inp}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className={styles.inp}
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <input
                        className={styles.inp}
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <input
                        className={styles.inp}
                        type="password"
                        placeholder={passwordLanguage}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength="8"
                        maxLength="8"
                        required
                    />
                    <button className={styles.btn} type="submit">
                    {language === 'ru'? 'Зарегистрироваться' : 'Тіркелу'}

                    </button>
                </form>

                {errorMessage && <p className={styles.error}>{errorMessage}</p>}  {/* Отображаем ошибку */}

                <p className={styles.text}>
                {language === 'ru'? 'Регистрируясь, вы соглашаетесь' : 'Тіркеу арқылы келісесіз'}
                    <a className={styles.link} href="#2">
                    {language === 'ru'? 'с условиями использования и правилами сайта' : 'пайдалану шарттарымен және сайт ережелерімен'}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default SingUpCard;
