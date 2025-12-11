import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPrompt.css';

const LoginPrompt = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="login-prompt-overlay" onClick={onClose}>
            <div className="login-prompt-content glass" onClick={(e) => e.stopPropagation()}>
                <button className="login-prompt-close" onClick={onClose}>
                    ×
                </button>

                <div className="login-prompt-body">
                    <div className="login-prompt-icon">🔒</div>
                    <h2 className="login-prompt-title">Login Required</h2>
                    <p className="login-prompt-message">
                        Please login or create an account to interact with books, search, and make purchases.
                    </p>

                    <div className="login-prompt-actions">
                        <button onClick={handleLogin} className="btn btn-primary btn-block">
                            Login / Register
                        </button>
                        <button onClick={onClose} className="btn btn-outline btn-block">
                            Continue Browsing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPrompt;
