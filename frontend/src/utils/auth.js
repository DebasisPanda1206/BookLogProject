// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000;
            if (decoded.exp > now) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('token');
            }
        } catch {
            localStorage.removeItem('token');
        }
    }, []);

    return isAuthenticated;
};

export default useAuth;