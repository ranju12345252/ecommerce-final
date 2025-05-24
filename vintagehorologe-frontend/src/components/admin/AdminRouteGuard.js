import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRouteGuard = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const adminToken = localStorage.getItem('adminToken');

    const validateAdminToken = (token) => {
        try {
            const decoded = jwtDecode(token);

            // Check token expiration
            const isExpired = Date.now() >= decoded.exp * 1000;
            if (isExpired) {
                throw new Error('Token expired');
            }

            // Check admin role
            if (decoded.role !== 'ROLE_ADMIN') {
                throw new Error('Invalid permissions');
            }

            return true;
        } catch (error) {
            console.error('Token validation error:', error.message);
            localStorage.removeItem('adminToken');
            return false;
        }
    };

    useEffect(() => {
        const checkAuth = () => {
            if (!adminToken) {
                navigate('/admin/login', {
                    state: { from: location },
                    replace: true
                });
                return;
            }

            if (!validateAdminToken(adminToken)) {
                navigate('/admin/login', {
                    state: { from: location },
                    replace: true
                });
            }
        };

        // Initial check
        checkAuth();

        // Set up periodic checks every 5 minutes
        const interval = setInterval(checkAuth, 5 * 60 * 1000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [adminToken, navigate, location]);

    if (!adminToken) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    try {
        if (!validateAdminToken(adminToken)) {
            return <Navigate to="/admin/login" state={{ from: location }} replace />;
        }
    } catch (error) {
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
};

export default AdminRouteGuard;