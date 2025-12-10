import React, { useState, useEffect } from 'react';
import { purchaseAPI } from '../utils/api';
import './History.css';

const History = () => {
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const { data } = await purchaseAPI.getHistory();
            setPurchases(data);
        } catch (error) {
            console.error('Failed to load history:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="history-page">
            <div className="container">
                <div className="page-header fade-in">
                    <h1 className="page-title">
                        Purchase <span className="gradient-text">History</span>
                    </h1>
                    <p className="page-subtitle">Track all your book purchases</p>
                </div>

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading history...</p>
                    </div>
                ) : purchases.length === 0 ? (
                    <div className="empty-state fade-in">
                        <div className="empty-icon">No Purchases</div>
                        <h3>No purchases yet</h3>
                        <p>Start buying books to see your history here!</p>
                    </div>
                ) : (
                    <div className="history-list fade-in">
                        {purchases.map((purchase, index) => (
                            <div
                                key={purchase._id}
                                className="history-card glass"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="history-image">
                                    <img
                                        src={purchase.book?.image || '/placeholder-book.jpg'}
                                        alt={purchase.book?.title}
                                    />
                                </div>
                                <div className="history-details">
                                    <h3>{purchase.book?.title || 'Unknown Book'}</h3>
                                    <p className="history-author">by {purchase.book?.author || 'Unknown'}</p>
                                    <div className="history-meta">
                                        <span className="history-price">₹{purchase.price}</span>
                                        <span className="history-date">
                                            {new Date(purchase.purchaseDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <div className="history-status">
                                    <span className="status-badge success">✓ Completed</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
