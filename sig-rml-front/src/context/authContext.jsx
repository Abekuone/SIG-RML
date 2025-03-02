import { createContext, useState, useEffect } from 'react';
import { authenticateWithKeycloak, isAuthenticated, logout } from '../auth/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (isAuthenticated()) {
            // Récupérer l'utilisateur depuis le localStorage ou API si besoin
            setUser(JSON.parse(localStorage.getItem('user')) || null);
        }
    }, []);

    const login = async () => {
        const userData = await authenticateWithKeycloak();
        if (userData) {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        }
    };

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, handleLogout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}