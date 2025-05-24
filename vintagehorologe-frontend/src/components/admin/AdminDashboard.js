import React from 'react';
import { Routes, Route, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import AdminUsers from './AdminUsers';
import AdminArtisans from './AdminArtisans';
import AdminOrders from './AdminOrders';
import AdminProducts from './AdminProducts';
import AdminUserOrders from './AdminUserOrders';

const AdminDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <div style={{
                width: '240px',
                backgroundColor: '#1f1f2e',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem 1rem'
            }}>
                <div>
                    <h4 className="mb-4 text-center">🛠 Admin Panel</h4>
                    <Nav className="flex-column">
                        <Nav.Link
                            as={Link}
                            to="/admin/dashboard/users"
                            className={`text-white mb-2 ${location.pathname.includes('/users') ? 'active-link' : ''}`}
                        >
                            👥 Users
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/admin/dashboard/artisans"
                            className={`text-white mb-2 ${location.pathname.includes('/artisans') ? 'active-link' : ''}`}
                        >
                            🛠 Artisans
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/admin/dashboard/orders"
                            className={`text-white mb-2 ${location.pathname.includes('/orders') ? 'active-link' : ''}`}
                        >
                            📦 Orders
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/admin/dashboard/products"
                            className={`text-white mb-2 ${location.pathname.includes('/products') ? 'active-link' : ''}`}
                        >
                            🛍 Products
                        </Nav.Link>

                        <hr style={{ borderColor: '#444' }} />

                        <Nav.Link
                            href="#logout"
                            onClick={handleLogout}
                            className="text-white mt-2"
                            style={{ color: '#ff4d4f', fontWeight: 'bold' }}
                        >
                            🚪 Logout
                        </Nav.Link>
                    </Nav>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f8f9fa', overflowY: 'auto' }}>
                <Outlet />
            </div>
        </div>
    );
};

export const AdminLayout = () => (
    <Routes>
        <Route path="/" element={<AdminDashboard />}>
            <Route index element={<AdminUsers />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:userId/orders" element={<AdminUserOrders />} />
            <Route path="artisans" element={<AdminArtisans />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
        </Route>
    </Routes>
);

export default AdminLayout;
