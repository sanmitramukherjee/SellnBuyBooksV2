import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-content">
                <Link to="/" className="logo">
                    <span className="gradient-text">SellnBuyBooks</span>
                </Link>

                <div className="nav-links">
                    <Link to="/buy" className="nav-link">
                        Buy
                    </Link>
                    <Link to="/sell" className="nav-link">
                        Sell
                    </Link>
                    <Link to="/history" className="nav-link">
                        History
                    </Link>
                    <Link to="/account" className="nav-link">
                        Account
                    </Link>
                    <button onClick={toggleTheme} className="theme-toggle" title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    <button onClick={handleLogout} className="btn btn-outline btn-sm">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
