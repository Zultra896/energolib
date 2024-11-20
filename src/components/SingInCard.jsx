import singInCardStyles from '../css/singInCard.module.css';
import { useNavigate } from 'react-router-dom';

function SingInCard () {
    const navigate = useNavigate();

    const ClickRegister = () => {
        navigate('/Auth/register');
    };
    const ClickReset = () => {
        navigate('/Auth/reset');
    };

    return (
        <div className={singInCardStyles.dev}>
            <h1 className={singInCardStyles.title}>EnergoLib</h1>
            <div className={singInCardStyles.card}>
                <div className={singInCardStyles.blockSing}>
                    <div 
                        className={singInCardStyles.sing}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={singInCardStyles.active}>Вход</h3>
                        <div className={singInCardStyles.rectangleSing}></div>
                    </div>
                    <div 
                        className={singInCardStyles.sing}
                        onClick={ClickRegister}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={singInCardStyles.h3}>Регистрация</h3>
                    </div>
                    <div 
                        className={singInCardStyles.sing}
                        onClick={ClickReset}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={singInCardStyles.h3}>Сброс пароля</h3>
                    </div>

                    <div className={singInCardStyles.rectangle}>

                    </div>
                </div>
                <input className={singInCardStyles.inp} type="email" placeholder="Email" required />
                <input className={singInCardStyles.inp} type="password" placeholder="Пароль" required />
                <button className={singInCardStyles.btn}>Войти</button>
                <p className={singInCardStyles.text}>
                    Вы забыли пароль? 
                    <a className={singInCardStyles.link} href="#2">Восстановить</a>
                </p>
            </div>
        </div>
    )
}

export default SingInCard