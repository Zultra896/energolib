import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Проверка LocalStorage при монтировании компонента
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const now = Date.now();

            if (parsedUser.expiration && parsedUser.expiration > now) {
                setUser(parsedUser);
                setIsAuthenticated(true);
            } else {
                // Удаляем данные, если срок действия истёк
                localStorage.removeItem('user');
            }
        }
    }, []);

    // Вход пользователя и сохранение в LocalStorage
    const login = (userData) => {
        const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 часа
        const dataWithExpiration = {
            ...userData,
            expiration: expirationTime,
        };

        setUser(userData);
        setIsAuthenticated(true);

        localStorage.setItem('user', JSON.stringify(dataWithExpiration));
    };

    // Выход пользователя и очистка LocalStorage
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
