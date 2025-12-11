import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import History from './pages/History';
import Account from './pages/Account';
import './index.css';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/buy" /> : <Login />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/sell" element={<PrivateRoute><Sell /></PrivateRoute>} />
                <Route path="/history" element={<PrivateRoute><History /></PrivateRoute>} />
                <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
                <Route path="/" element={<Navigate to="/buy" />} />
            </Routes>
        </BrowserRouter>
    );
};

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
