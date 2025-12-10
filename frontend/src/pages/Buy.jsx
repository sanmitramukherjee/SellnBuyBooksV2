import React, { useState, useEffect } from 'react';
import { booksAPI } from '../utils/api';
import BookCard from '../components/BookCard';
import './Buy.css';

const FeaturedCarousel = ({ books }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % books.length);
        }, 4000); // Auto-rotate every 4 seconds

        return () => clearInterval(interval);
    }, [books.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + books.length) % books.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % books.length);
    };

    return (
        <div className="featured-section fade-in">
            <h2 className="section-title">Recently Added</h2>
            <div className="carousel-container">
                <button onClick={goToPrevious} className="carousel-nav prev">
                    ←
                </button>

                <div className="carousel-wrapper">
                    <div
                        className="carousel-track"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {books.map((book) => (
                            <div key={book._id} className="carousel-slide">
                                <div className="carousel-card glass">
                                    <img
                                        src={book.image || '/placeholder-book.jpg'}
                                        alt={book.title}
                                        className="carousel-image"
                                    />
                                    <div className="carousel-content">
                                        <h3>{book.title}</h3>
                                        <p className="carousel-author">{book.author}</p>
                                        <p className="carousel-price">₹{book.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={goToNext} className="carousel-nav next">
                    →
                </button>

                <div className="carousel-indicators">
                    {books.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Buy = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            const { data } = await booksAPI.getAll();
            setBooks(data);
        } catch (error) {
            console.error('Failed to load books:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredBooks = books.filter(book => {
        // Filter by sold status
        if (filter === 'available' && book.isSold) return false;
        if (filter === 'sold' && !book.isSold) return false;

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesTitle = book.title?.toLowerCase().includes(query);
            const matchesAuthor = book.author?.toLowerCase().includes(query);
            const matchesDescription = book.description?.toLowerCase().includes(query);
            return matchesTitle || matchesAuthor || matchesDescription;
        }

        return true;
    });

    const recentBooks = books.slice(-3).reverse();

    return (
        <div className="buy-page">
            <div className="container">
                {/* Hero Section */}
                <div className="hero-section fade-in">
                    <h1 className="hero-title">
                        Find Your Next <span className="gradient-text">Great Read</span>
                    </h1>
                    <p className="hero-subtitle">
                        Browse through our collection of quality used books at amazing prices
                    </p>
                </div>

                {/* Featured Carousel */}
                {recentBooks.length > 0 && (
                    <FeaturedCarousel books={recentBooks} />
                )}

                {/* Search Bar */}
                <div className="search-section fade-in">
                    <div className="search-bar glass">

                        <input
                            type="text"
                            placeholder="Search by title, author, or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="clear-search"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>

                {/* Filters */}
                <div className="filters fade-in">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All Books
                    </button>
                    <button
                        className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
                        onClick={() => setFilter('available')}
                    >
                        Available
                    </button>
                    <button
                        className={`filter-btn ${filter === 'sold' ? 'active' : ''}`}
                        onClick={() => setFilter('sold')}
                    >
                        Sold
                    </button>
                </div>

                {/* Books Grid */}
                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading books...</p>
                    </div>
                ) : filteredBooks.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">No Books</div>
                        <h3>No books found</h3>
                        <p>Check back later for new listings!</p>
                    </div>
                ) : (
                    <div className="books-grid fade-in">
                        {filteredBooks.map((book, index) => (
                            <div
                                key={book._id}
                                style={{ animationDelay: `${index * 0.05}s` }}
                                className="fade-in"
                            >
                                <BookCard book={book} onPurchaseSuccess={loadBooks} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Buy;
