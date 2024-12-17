import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext.jsx';

function PrivateAdminRoute({ children }) {
    const { isAuthenticated, user } = useContext(AuthContext);

    // Проверяем, авторизован ли пользователь и является ли он администратором
    return isAuthenticated && user.role === 'admin' ? (
        children
    ) : (
        <Navigate to="/" /> // Перенаправление, если не администратор
    );
}

export default PrivateAdminRoute;
