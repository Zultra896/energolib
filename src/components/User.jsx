import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import styles from '../css/user.module.css'
import avatar1 from '../img/user.png'
import img from '../img/update.png'
import { useNavigate } from 'react-router-dom';
function User () {
    const { user, logout } = useContext(AuthContext); // Получаем данные пользователя из контекста

    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Вызываем функцию logout для выхода
    };

    const ClickAdmin = () => {
        navigate('/admin');
    }

    return (
        <div className={styles.main}>
            <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                    <img src={avatar1} alt="" />
                </div>
                
                <div className={styles.avatarUpdate}>
                    <img src={img} alt="п" />
                    
                </div>
            </div>
            <div className={styles.info}>
                <h1>{user.first_name + " " +user.last_name}</h1>
                <p>{user.email}</p>
                <p>{user.group_name}</p>
            </div>

            {user.role === 'admin' &&
                <button className={styles.adminButton} onClick={ClickAdmin}>
                    Админка
                </button>
            }

            
            
            <button className={styles.logoutButton} onClick={handleLogout}>
                Выйти
            </button>
        </div>
    );
}

export default User;