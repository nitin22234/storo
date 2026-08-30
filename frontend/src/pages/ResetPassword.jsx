import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authAPI } from '../api';
import { FadeIn } from '../components/MotionEffects';

function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            await authAPI.resetPassword(token, formData.newPassword);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div
                className="container-fluid d-flex align-items-center justify-content-center py-5"
                style={{
                    minHeight: '90vh',
                    backgroundColor: "#ffffff",
                    color: "#1a1a1a"
                }}
            >
                <div className="row w-100 justify-content-center">
                    <div className="col-md-5 col-lg-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="card shadow-lg border-0"
                            style={{ borderRadius: '1.75rem', border: '1px solid #e5e7eb' }}
                        >
                            <div className="card-body p-5 text-center">
                                <motion.div
                                    initial={{ scale: 0, rotate: -30 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                                    className="mb-4"
                                >
                                    <span style={{ fontSize: '4rem' }}>✅</span>
                                </motion.div>
                                <h3 className="fw-bold mb-3" style={{ color: '#047857', fontFamily: 'serif' }}>Password Reset Successful!</h3>
                                <p className="text-muted mb-4" style={{ color: '#6b7280' }}>
                                    Your password has been reset successfully. You can now login with your new password.
                                </p>
                                <p className="text-muted small">Redirecting to login page in 3 seconds...</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="container-fluid d-flex align-items-center justify-content-center py-5"
            style={{
                minHeight: '90vh',
                backgroundColor: "#ffffff",
                color: "#1a1a1a",
                position: "relative",
                overflow: "hidden"
            }}
        >
            <div className="row w-100 justify-content-center" style={{ position: "relative", zIndex: 1 }}>
                <div className="col-md-5 col-lg-4">
                    <FadeIn direction="up">
                        <div className="card shadow-lg border-0" style={{ borderRadius: '1.75rem', border: '1px solid #e5e7eb', boxShadow: '0 15px 45px rgba(0,0,0,0.08)' }}>
                            <div className="card-body p-4 p-md-5">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold" style={{ color: "#1a1a1a", fontFamily: "'Inter', sans-serif" }}>Reset Password</h2>
                                    <p className="text-muted" style={{ color: "#6b7280" }}>Enter your new password below</p>
                                </div>

                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="alert alert-danger py-2 px-3 mb-3"
                                            style={{ borderRadius: "10px" }}
                                            role="alert"
                                        >
                                            {error}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label fw-bold small text-muted">NEW PASSWORD</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg shadow-none"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            placeholder="Enter new password"
                                            style={{ borderRadius: "10px", fontSize: "1rem" }}
                                            required
                                            minLength="6"
                                        />
                                        <small className="text-muted">Minimum 6 characters</small>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold small text-muted">CONFIRM PASSWORD</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg shadow-none"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm new password"
                                            style={{ borderRadius: "10px", fontSize: "1rem" }}
                                            required
                                            minLength="6"
                                        />
                                    </div>

                                    <div className="d-grid gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            className="btn btn-primary btn-lg fw-bold"
                                            disabled={loading}
                                            style={{
                                                borderRadius: '12px',
                                                background: 'linear-gradient(135deg, #0d2aabff 0%, #081b70 100%)',
                                                border: 'none',
                                                padding: '0.85rem'
                                            }}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Resetting...
                                                </>
                                            ) : (
                                                'Reset Password →'
                                            )}
                                        </motion.button>

                                        <Link to="/login" className="btn btn-outline-secondary btn-lg py-2" style={{ borderRadius: '12px', fontSize: '0.95rem' }}>
                                            Back to Login
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
