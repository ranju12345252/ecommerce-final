import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import { GiClockwork } from 'react-icons/gi'; // Changed to GiClockwork
import './NavigationBar.css';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" className={`luxury-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <GiClockwork className="brand-icon" /> {/* Using GiClockwork here */}
          VintageHorologe
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggler" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto primary-nav-links">
            <Nav.Link as={Link} to="/marketplace" className="nav-item">Collections</Nav.Link>
            <Nav.Link as={Link} to="/inspiration" className="nav-item">Boutique</Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-item">Legacy</Nav.Link>
          </Nav>

          <Form className="d-flex search-bar-wrapper">
            <FormControl
              type="search"
              placeholder="Search timepieces..."
              className="search-input"
              aria-label="Search"
            />
            <Button variant="outline-success" className="search-btn">
              <FiSearch />
            </Button>
          </Form>

          <Nav className="align-items-center user-actions">
            <Nav.Link as={Link} to="/cart" className="nav-item cart-link">
              <FiShoppingCart className="cart-icon" />
            </Nav.Link>

            {isAuthenticated ? (
              <NavDropdown
                title={
                  <div className="profile-trigger">
                    <div className="user-initials">
                      {user?.email && user.email[0].toUpperCase()}
                    </div>
                  </div>
                }
                align="end"
                className="user-profile-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profiles" className="dropdown-item">
                  My Vault
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/orders" className="dropdown-item">
                  Order History
                </NavDropdown.Item>
                <NavDropdown.Divider className="dropdown-divider" />
                <NavDropdown.Item onClick={handleLogout} className="dropdown-item logout-item">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="auth-controls">
                <Button as={Link} to="/login" className="btn-exclusive-access">
                  Client Access
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;