import React, { useState } from 'react';
import { purchaseAPI } from '../utils/api';
import './BookCard.css';

const BookCard = ({ book, onPurchaseSuccess, isAuthenticated = true, onLoginRequired }) => {
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    const handleBuy = async () => {
        if (!isAuthenticated) {
            if (onLoginRequired) onLoginRequired();
            return;
        }

        if (book.isSold) return;

        setLoading(true);
        try {
            const { data } = await purchaseAPI.buy(book._id);
            alert(data.message);
            if (onPurchaseSuccess) onPurchaseSuccess();
        } catch (error) {
            alert(error.response?.data?.error || 'Purchase failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDetailsClick = () => {
        if (!isAuthenticated) {
            if (onLoginRequired) onLoginRequired();
            return;
        }
        setShowDetails(true);
    };

    const handleCardClick = () => {
        if (!isAuthenticated) {
            if (onLoginRequired) onLoginRequired();
        }
    };

    return (
        <>
            <div className="book-card card" onClick={handleCardClick} style={{ cursor: isAuthenticated ? 'default' : 'pointer' }}>
                <div className="book-image-container">
                    <img
                        src={book.image || '/placeholder-book.jpg'}
                        alt={book.title}
                        className="book-image"
                    />
                    {book.isSold && <div className="sold-badge">SOLD</div>}
                </div>

                <div className="book-content">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">by {book.author}</p>

                    {book.description && (
                        <p className="book-description">
                            {book.description.length > 100
                                ? book.description.substring(0, 100) + '...'
                                : book.description}
                        </p>
                    )}

                    <div className="book-meta">
                        {book.condition && (
                            <span className="condition-badge">
                                Condition: {book.condition}/10
                            </span>
                        )}
                    </div>

                    <div className="book-footer">
                        <span className="book-price">₹{book.price}</span>
                        <div className="book-actions">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDetailsClick();
                                }}
                                className="btn btn-outline btn-sm"
                            >
                                Details
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleBuy();
                                }}
                                disabled={loading || book.isSold}
                                className="btn btn-primary btn-sm"
                            >
                                {loading ? 'Processing...' : book.isSold ? 'Sold Out' : 'Buy Now'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showDetails && (
                <div className="modal-overlay" onClick={() => setShowDetails(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowDetails(false)}>
                            ×
                        </button>

                        <div className="modal-body">
                            <img
                                src={book.image || '/placeholder-book.jpg'}
                                alt={book.title}
                                className="modal-image"
                            />

                            <div className="modal-details">
                                <h2 className="gradient-text">{book.title}</h2>
                                <p className="modal-author">by {book.author}</p>

                                {book.description && (
                                    <div className="detail-section">
                                        <h4>Description</h4>
                                        <p>{book.description}</p>
                                    </div>
                                )}

                                <div className="detail-section">
                                    <h4>Details</h4>
                                    <div className="detail-grid">
                                        <div>
                                            <strong>Price:</strong> ₹{book.price}
                                        </div>
                                        {book.condition && (
                                            <div>
                                                <strong>Condition:</strong> {book.condition}/10
                                            </div>
                                        )}
                                        {book.phone && (
                                            <div>
                                                <strong>Contact:</strong> {book.phone}
                                            </div>
                                        )}
                                        {book.purchaseDate && (
                                            <div>
                                                <strong>Purchased:</strong>{' '}
                                                {new Date(book.purchaseDate).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {book.info && (
                                    <div className="detail-section">
                                        <h4>Additional Info</h4>
                                        <p>{book.info}</p>
                                    </div>
                                )}

                                <button
                                    onClick={handleBuy}
                                    disabled={loading || book.isSold}
                                    className="btn btn-primary btn-block"
                                >
                                    {loading ? 'Processing Payment...' : book.isSold ? 'Sold Out' : 'Buy Now'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookCard;
