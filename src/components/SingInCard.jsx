import React, { useState, useContext } from 'react';
import singInCardStyles from '../css/singInCard.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useLanguage } from './LanguageContext';

function SingInCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Получаем функцию login из контекста
    const { language } = useLanguage(); 
    const passwordLanguage = language === 'ru' ? 'Пороль' : 'Құпиясөз';

    const ClickRedister = () => {
        navigate('/Auth/register');
    };
    const ClickReset = () => {
        navigate('/Auth/reset');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
    
            const data = await response.json(); // Декодируем JSON-ответ
            console.log('Data from server:', data); // Логируем ответ от сервера
    
            if (!response.ok) {
                throw new Error(data.message || 'Ошибка при входе');
            }
    
            if (data.success) {
                login({
                    email: data.email,
                    first_name: data.first_name,  // Добавляем first_name
                    last_name: data.last_name,    // Добавляем last_name
                    group_name: data.group_name,
                });                
                navigate('/'); // Переход на главную страницу
            } else {
                alert(data.message || 'Неверный email или пароль');
            }
        } catch (error) {
            console.error('Ошибка при запросе:', error);
            alert('Ошибка при входе, попробуйте позже');
        }
    };
    
    

    return (
        <div className={singInCardStyles.dev}>
            <h1 className={singInCardStyles.title}>EnergoLib</h1>
            <div className={singInCardStyles.card}>
                <div className={singInCardStyles.blockSing}>
                    <div 
                        className={singInCardStyles.sing} 
                        style={{ cursor: 'pointer' }}>
                        <h3 className={singInCardStyles.active}>
                        {language === 'ru'? 'Вход' : 'Кіру'}
                        </h3>
                        <div className={singInCardStyles.rectangleSing}></div>
                    </div>
                    <div className={singInCardStyles.sing} style={{ cursor: 'pointer' }}
                    onClick={ClickRedister}>
                        <h3 className={singInCardStyles.h3}>
                        {language === 'ru'? 'Регистрация' : 'Тіркелу'}
                        </h3>
                    </div>
                    <div className={singInCardStyles.sing} style={{ cursor: 'pointer' }}
                    onClick={ClickReset}>
                        <h3 className={singInCardStyles.h3}>
                        {language === 'ru'? 'Сброс пароля' : 'Қалпына келтіру'}
                        </h3>
                    </div>
                    <div className={singInCardStyles.rectangle}></div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        className={singInCardStyles.inp}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className={singInCardStyles.inp}
                        type="password"
                        placeholder={passwordLanguage}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className={singInCardStyles.btn} type="submit">
                    {language === 'ru'? 'Вход' : 'Кіру'}
                    </button>
                </form>
                <p className={singInCardStyles.text}>
                    {language === 'ru'? 'Вы забыли пароль? ' : 'Сіз парольді ұмытып қалдыңыз ба?'}
                    <a className={singInCardStyles.link} href="#2">
                        {language === 'ru'? 'Восстановить' : 'Қалпына келтіру'}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default SingInCard;
