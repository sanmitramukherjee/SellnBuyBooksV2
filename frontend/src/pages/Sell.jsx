import React, { useState } from 'react';
import { booksAPI } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './Sell.css';

const Sell = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        condition: 5,
        purchaseDate: '',
        info: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('author', formData.author);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('condition', formData.condition);
            data.append('purchaseDate', formData.purchaseDate);
            data.append('info', formData.info);
            data.append('phone', formData.phone);

            const imageInput = document.querySelector('input[type="file"]');
            if (imageInput.files[0]) {
                data.append('image', imageInput.files[0]);
            }

            await booksAPI.create(data);
            alert('Book listed successfully!');
            navigate('/buy');
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to list book');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sell-page">
            <div className="container">
                <div className="sell-header fade-in">
                    <h1 className="page-title">
                        Sell Your <span className="gradient-text">Books</span>
                    </h1>
                    <p className="page-subtitle">
                        Turn your old textbooks into cash! List them in minutes.
                    </p>
                </div>

                <div className="sell-content">
                    <div className="image-upload-section glass fade-in">
                        <h3>Book Photo</h3>
                        <div className="image-upload-container">
                            {imagePreview ? (
                                <div className="image-preview">
                                    <img src={imagePreview} alt="Preview" />
                                    <button
                                        type="button"
                                        className="remove-image"
                                        onClick={() => {
                                            setImagePreview(null);
                                            document.querySelector('input[type="file"]').value = '';
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ) : (
                                <label className="upload-placeholder">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        hidden
                                    />
                                    <div className="upload-icon">📷</div>
                                    <p>Click to upload book image</p>
                                    <span className="upload-hint">PNG, JPG up to 10MB</span>
                                </label>
                            )}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="sell-form glass fade-in">
                        <h3>Book Details</h3>

                        <div className="form-group">
                            <label>Book Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="input"
                                placeholder="e.g., Data Structures & Algorithms"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Author</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                className="input"
                                placeholder="e.g., Thomas H. Cormen"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="input textarea"
                                placeholder="Describe the book's content, topics covered, etc."
                                rows="4"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Price (₹) *</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="500"
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Contact Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="9876543210"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Condition: {formData.condition}/10</label>
                                <input
                                    type="range"
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    className="range-input"
                                    min="1"
                                    max="10"
                                />
                                <div className="range-labels">
                                    <span>Poor</span>
                                    <span>Excellent</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Purchase Date</label>
                                <input
                                    type="date"
                                    name="purchaseDate"
                                    value={formData.purchaseDate}
                                    onChange={handleChange}
                                    className="input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Additional Information</label>
                            <textarea
                                name="info"
                                value={formData.info}
                                onChange={handleChange}
                                className="input textarea"
                                placeholder="Any other details buyers should know..."
                                rows="3"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary btn-block btn-large"
                        >
                            {loading ? 'Listing Book...' : 'List Book for Sale'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sell;
