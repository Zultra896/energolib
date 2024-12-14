import { useNavigate } from 'react-router-dom';
import styles from '../css/passwordResetCard.module.css';

function PasswordResetCard () {
    const navigate = useNavigate();

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
                        <h3 className={styles.h3}>Вход</h3>
                    </div>
                    <div 
                        className={styles.sing}
                        onClick={ClickRegister}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={styles.h3}>Регистрация</h3>
                    </div>
                    <div 
                        className={styles.sing}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={styles.active}>Сброс пароля</h3>
                        <div className={styles.rectangleSing}></div>
                    </div>

                    <div className={styles.rectangle}>
                    </div>
                </div>
                <input className={styles.inp} type="email" placeholder="На данный момент это функция не работает" value={"На данный момент это функция не работает"} required />
                <p className={styles.textCard}>
                    Пожалуйста, укажите email, который вы использовали для входа на сайт
                </p>
                <button className={styles.btn}>Войти</button>
                <p className={styles.text}>
                    Не можете вспомнить почту?
                    <a className={styles.link} href="#2">Подсказать</a>
                </p>
            </div>
        </div>
    )
}

export default PasswordResetCard;