import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { authAPI } from '../api';
import { FadeIn } from '../components/MotionEffects';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await authAPI.forgotPassword(email);
            setMessage(response.message);
            setEmail('');
        } catch (err) {
            setError(err.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

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
                                    <span className="display-4 mb-2 d-block">🔑</span>
                                    <h2 className="fw-bold" style={{ color: "#1a1a1a", fontFamily: "'Inter', sans-serif" }}>Forgot Password?</h2>
                                    <p className="text-muted" style={{ color: "#6b7280" }}>
                                        Enter your email and we'll send you a link to reset your password
                                    </p>
                                </div>

                                <AnimatePresence>
                                    {message && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="alert alert-success py-2 px-3 mb-3"
                                            style={{ borderRadius: "10px" }}
                                            role="alert"
                                        >
                                            {message}
                                        </motion.div>
                                    )}

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
                                    <div className="mb-4">
                                        <label className="form-label fw-bold small text-muted">EMAIL ADDRESS</label>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg shadow-none"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            style={{ borderRadius: "10px", fontSize: "1rem" }}
                                            required
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
                                                    Sending...
                                                </>
                                            ) : (
                                                'Send Reset Link →'
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

export default ForgotPassword;
