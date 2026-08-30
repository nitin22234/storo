import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api';
import { FadeIn } from '../components/MotionEffects';

function Profile() {
    const { user, setUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const userData = await authAPI.getProfile();
            setFormData({
                name: userData?.name || '',
                email: userData?.email || '',
                phone: userData?.phone || '',
                address: userData?.address || ''
            });
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            setMessage({ type: '', text: '' });

            const response = await authAPI.updateProfile(
                formData.name,
                formData.phone,
                formData.address
            );

            if (setUser && response) {
                setUser(response);
            }

            setMessage({ type: 'success', text: 'Profile updated successfully!' });

            setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 3000);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div style={{ backgroundColor: '#ffffff', minHeight: '90vh', display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted fw-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: "#ffffff", minHeight: '100vh', paddingTop: '2rem', paddingBottom: '3rem', color: "#1a1a1a", position: "relative", overflow: "hidden" }}>
            <div className="container" style={{ maxWidth: '800px', position: "relative", zIndex: 1 }}>
                <FadeIn direction="up">
                    <div className="bg-white shadow-sm p-4 p-md-5 rounded-4" style={{ border: '1px solid #e5e7eb', borderRadius: "1.75rem" }}>
                        <div className="text-center mb-4">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                className="mb-2 d-inline-block"
                                style={{ fontSize: '3.5rem' }}
                            >
                                👤
                            </motion.div>
                            <h2 className="fw-bold mb-1" style={{ color: '#1a202c', fontFamily: "'Inter', sans-serif" }}>User Profile</h2>
                            <p style={{ color: '#6b7280' }}>Manage your personal details and contact information</p>
                        </div>

                        <AnimatePresence>
                            {message.text && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mb-4 py-2 px-3`}
                                    style={{ borderRadius: "10px" }}
                                    role="alert"
                                >
                                    {message.text}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-bold small text-muted">FULL NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control form-control-lg shadow-none"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{ borderColor: '#e5e7eb', borderRadius: "10px", fontSize: "1rem" }}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold small text-muted">EMAIL ADDRESS</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control form-control-lg shadow-none"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                    style={{ borderColor: '#e5e7eb', backgroundColor: '#f9fafb', borderRadius: "10px", fontSize: "1rem" }}
                                />
                                <small style={{ color: '#6b7280' }}>Email cannot be changed</small>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-bold small text-muted">PHONE NUMBER</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-control form-control-lg shadow-none"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    style={{ borderColor: '#e5e7eb', borderRadius: "10px", fontSize: "1rem" }}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-bold small text-muted">ADDRESS</label>
                                <textarea
                                    name="address"
                                    className="form-control form-control-lg shadow-none"
                                    rows="3"
                                    placeholder="Your address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    style={{ borderColor: '#e5e7eb', borderRadius: "10px", fontSize: "1rem" }}
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="btn w-100 py-3 fw-bold btn-lg"
                                disabled={saving}
                                style={{
                                    background: 'linear-gradient(135deg, #0d2aabff 0%, #081b70 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '0.85rem'
                                }}
                            >
                                {saving ? 'Saving...' : 'Save Profile Changes →'}
                            </motion.button>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}

export default Profile;
