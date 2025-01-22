import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Проверка Cookies при монтировании компонента
    useEffect(() => {
        const storedUser = Cookies.get('user'); // Получаем cookie
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const now = Date.now();

            if (parsedUser.expiration && parsedUser.expiration > now) {
                setUser(parsedUser);
                setIsAuthenticated(true);
            } else {
                // Удаляем cookie, если срок действия истёк
                Cookies.remove('user');
            }
        }
    }, []);

    // Вход пользователя и сохранение в Cookies
    const login = (userData) => {
        const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 часа
        const dataWithExpiration = {
            ...userData,
            expiration: expirationTime,
        };

        setUser(dataWithExpiration);
        setIsAuthenticated(true);

        // Устанавливаем cookie с данными
        Cookies.set('user', JSON.stringify(dataWithExpiration), { expires: 1 }); // expires - срок жизни cookie (1 день)
    };

    // Выход пользователя и очистка Cookies
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        Cookies.remove('user'); // Удаляем cookie
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
