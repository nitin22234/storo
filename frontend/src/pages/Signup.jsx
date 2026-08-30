import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FadeIn } from '../components/MotionEffects';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const result = await register(form.name, form.email, form.password);

      if (!result.success) {
        throw new Error(result.error);
      }

      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Registration failed. Please try again.');
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
          animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
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
          animate={{ scale: [1, 1.1, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
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
              <div
                className="card shadow-lg border-0 p-4 p-md-5"
                style={{
                  borderRadius: '1.75rem',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 15px 45px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div className="text-center mb-4">
                  <span className="display-4 mb-2 d-block">✈️</span>
                  <h2 className="fw-bold" style={{ color: "#1a1a1a", fontFamily: "'Inter', sans-serif" }}>
                    Join Storo
                  </h2>
                  <p className="text-muted" style={{ color: "#6b7280" }}>
                    Create your account and start storing with confidence.
                  </p>
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
                    <label className="form-label fw-bold small text-muted">FULL NAME</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg shadow-none"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      style={{ borderRadius: "10px", fontSize: "1rem" }}
                      required
                    />
                  </div>
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
                      placeholder="Password (min 6 characters)"
                      value={form.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      minLength={6}
                      style={{ borderRadius: "10px", fontSize: "1rem" }}
                      required
                    />
                    <small className="text-muted">Must be at least 6 characters long</small>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn w-100 btn-lg fw-bold"
                    disabled={loading}
                    style={{
                      borderRadius: '12px',
                      backgroundColor: '#047857',
                      color: '#fff',
                      border: 'none',
                      padding: '0.85rem'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating account...
                      </>
                    ) : (
                      'Sign Up →'
                    )}
                  </motion.button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-1" style={{ color: '#6b7280' }}>
                    Already have an account?{' '}
                    <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#047857' }}>
                      Login here
                    </Link>
                  </p>
                </div>

                <div className="text-center mt-2">
                  <Link to="/become-partner" className="text-decoration-none small" style={{ color: '#6b7280' }}>
                    Want to become a partner? <span className="fw-bold" style={{ color: '#8b3d88' }}>Join Us</span>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
