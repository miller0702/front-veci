import React, { createContext, useState, useContext } from 'react';
import axios from '../services/clienteAxios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const [userName, setUserName] = useState(() => localStorage.getItem('user') || '');

    const login = async ({ user, password }) => {
        try {
            const response = await axios.post('/auth', { user, password });
            const { token } = response.data;
            
            setToken(token);
            localStorage.setItem('token', token);
            
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
        }
    };
    

    const logout = () => {
        setToken(null);
        setUserName('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ login, token, userName, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
