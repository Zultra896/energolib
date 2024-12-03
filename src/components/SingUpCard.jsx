import { useNavigate } from 'react-router-dom';
import styles from '../css/singUpCard.module.css';


function SingUpCard () {
    const navigate = useNavigate();

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
                        <h3 className={styles.h3}>Вход</h3>
                    </div>
                    <div 
                        className={styles.sing}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={styles.active}>Регистрация</h3>
                        <div className={styles.rectangleSing}></div>
                    </div>
                    <div 
                        className={styles.sing}
                        onClick={ClickReset}
                        style={{ cursor: 'pointer' }}
                    >
                        <h3 className={styles.h3}>Сброс пароля</h3>
                    </div>

                    <div className={styles.rectangle}>
                    </div>
                </div>
                <button className={styles.btn}>Форма регистрации</button>
                <p className={styles.text}>
                    Регистрируясь, вы соглашаетесь
                    <a className={styles.link} href="#2">с условиями использования и правилами сайта</a>
                </p>
            </div>
        </div>
    )
}

export default SingUpCard;