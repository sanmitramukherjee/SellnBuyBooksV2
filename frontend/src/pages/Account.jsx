import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import './Account.css';

const Account = () => {
    const { user, logout } = useAuth();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authAPI.updateProfile(formData);
            alert('Profile updated successfully!');
            setEditing(false);
        } catch (error) {
            alert('Failed to update profile');
        }
    };

    return (
        <div className="account-page">
            <div className="container">
                <div className="account-header fade-in">
                    <h1 className="page-title">
                        My <span className="gradient-text">Account</span>
                    </h1>
                    <p className="page-subtitle">Manage your profile information</p>
                </div>

                <div className="account-content">
                    <div className="profile-card glass fade-in">
                        <div className="profile-header">
                            <div className="profile-avatar">
                                {user?.firstName?.[0] || user?.email?.[0] || 'U'}
                            </div>
                            <div className="profile-info">
                                <h2>{user?.firstName} {user?.lastName}</h2>
                                <p className="profile-email">{user?.email}</p>
                                <p className="profile-username">@{user?.username}</p>
                            </div>
                        </div>

                        <div className="profile-stats">
                            <div className="stat-card">
                                <div className="stat-icon">Books</div>
                                <div className="stat-info">
                                    <h3>Books Listed</h3>
                                    <p className="stat-value">-</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon">Purchases</div>
                                <div className="stat-info">
                                    <h3>Purchases</h3>
                                    <p className="stat-value">-</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="details-card glass fade-in">
                        <div className="card-header">
                            <h3>Profile Details</h3>
                            {!editing && (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="btn btn-outline btn-sm"
                                >
                                    ✏️ Edit
                                </button>
                            )}
                        </div>

                        {editing ? (
                            <form onSubmit={handleSubmit} className="edit-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="input"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="9876543210"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Address</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="input textarea"
                                        rows="3"
                                        placeholder="Your address..."
                                    />
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        onClick={() => setEditing(false)}
                                        className="btn btn-outline"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="details-view">
                                <div className="detail-item">
                                    <strong>First Name:</strong>
                                    <span>{user?.firstName || 'Not set'}</span>
                                </div>
                                <div className="detail-item">
                                    <strong>Last Name:</strong>
                                    <span>{user?.lastName || 'Not set'}</span>
                                </div>
                                <div className="detail-item">
                                    <strong>Email:</strong>
                                    <span>{user?.email}</span>
                                </div>
                                <div className="detail-item">
                                    <strong>Phone:</strong>
                                    <span>{user?.phone || 'Not set'}</span>
                                </div>
                                <div className="detail-item">
                                    <strong>Address:</strong>
                                    <span>{user?.address || 'Not set'}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
