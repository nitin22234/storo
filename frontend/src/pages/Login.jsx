import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FadeIn } from '../components/MotionEffects';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState('user');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(form.email, form.password);

      if (!result.success) {
        throw new Error(result.error);
      }

      const userData = JSON.parse(localStorage.getItem('user'));

      if (loginType === 'partner' && userData.role !== 'partner') {
        throw new Error('This account is not authorized as a partner.');
      }

      if (userData.role === 'partner') {
        navigate('/partner-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#ffffff",
        minHeight: '90vh',
        color: "#1a1a1a",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Blobs */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "-15%",
            right: "-10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(139, 61, 136, 0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(4, 120, 87, 0.12) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <FadeIn direction="up">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="card shadow-lg border-0 p-4 p-md-5"
                style={{
                  borderRadius: '1.75rem',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 15px 45px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div className="text-center mb-4">
                  <motion.span
                    key={loginType}
                    initial={{ scale: 0.6, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="display-4 mb-2 d-block"
                  >
                    {loginType === 'user' ? '🧳' : '🏨'}
                  </motion.span>
                  <h2 className="fw-bold" style={{ color: "#1a1a1a", fontFamily: "'Inter', sans-serif" }}>
                    {loginType === 'user' ? 'Welcome Back' : 'Partner Login'}
                  </h2>
                  <p className="text-muted" style={{ color: "#6b7280" }}>
                    {loginType === 'user'
                      ? 'Login to access your Storo account'
                      : 'Manage your bookings and earnings'}
                  </p>

                  {/* Login Type Toggle */}
                  <div className="d-flex p-1 bg-light rounded-3 mb-3" style={{ border: "1px solid #e5e7eb" }}>
                    <button
                      type="button"
                      className="btn flex-fill py-2 fw-semibold"
                      style={{
                        backgroundColor: loginType === 'user' ? '#047857' : 'transparent',
                        color: loginType === 'user' ? '#fff' : '#4b5563',
                        border: 'none',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setLoginType('user')}
                    >
                      User Login
                    </button>
                    <button
                      type="button"
                      className="btn flex-fill py-2 fw-semibold"
                      style={{
                        backgroundColor: loginType === 'partner' ? '#047857' : 'transparent',
                        color: loginType === 'partner' ? '#fff' : '#4b5563',
                        border: 'none',
                        borderRadius: '8px',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setLoginType('partner')}
                    >
                      Partner Login
                    </button>
                  </div>
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
                    <label className="form-label fw-bold small text-muted">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg shadow-none"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      style={{ borderRadius: "10px", fontSize: "1rem" }}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-bold small text-muted">PASSWORD</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg shadow-none"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      style={{ borderRadius: "10px", fontSize: "1rem" }}
                      required
                    />
                  </div>
                  <div className="d-grid">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="btn btn-lg fw-bold"
                      disabled={loading}
                      style={{
                        backgroundColor: '#047857',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.85rem'
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Logging in...
                        </>
                      ) : (
                        loginType === 'user' ? 'Login →' : 'Login as Partner →'
                      )}
                    </motion.button>
                  </div>
                </form>

                <div className="text-center mt-3">
                  <Link to="/forgot-password" className="text-decoration-none" style={{ color: '#047857', fontWeight: '600' }}>
                    Forgot Password?
                  </Link>
                </div>

                <div className="text-center mt-3">
                  <span className="text-muted" style={{ color: '#6b7280' }}>Don't have an account? </span>
                  <Link to="/signup" className="text-decoration-none fw-bold" style={{ color: '#047857' }}>
                    Register
                  </Link>
                </div>

                {loginType === 'partner' && (
                  <div className="text-center mt-2">
                    <Link to="/become-partner" className="text-decoration-none small" style={{ color: '#6b7280' }}>
                      Want to become a partner? Apply here
                    </Link>
                  </div>
                )}
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
