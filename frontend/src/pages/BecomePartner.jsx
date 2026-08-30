import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { partnerAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { FadeIn } from '../components/MotionEffects';

function BecomePartner() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    capacity: '',
    lat: '',
    lng: '',
    base: '',
    perKg: '',
    perHour: '',
    userName: '',
    userEmail: '',
    userPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!form.name || !form.address || !form.capacity || !form.lat || !form.lng || !form.userName || !form.userEmail || !form.userPassword) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (form.userPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const partnerData = {
        name: form.name,
        address: form.address,
        capacity: parseInt(form.capacity),
        location: {
          type: 'Point',
          coordinates: [parseFloat(form.lng), parseFloat(form.lat)],
        },
        base: parseFloat(form.base) || 100,
        perKg: parseFloat(form.perKg) || 10,
        perHour: parseFloat(form.perHour) || 5,
        userName: form.userName,
        userEmail: form.userEmail,
        userPassword: form.userPassword
      };

      const response = await partnerAPI.createPartner(partnerData);
      setAuthData(response.token, response.user);
      navigate('/partner-dashboard');
    } catch (err) {
      setError(err.message || 'Failed to submit partnership request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        color: "#1a1a1a",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <FadeIn direction="up">
              <div className="bg-white shadow-sm p-4 p-md-5" style={{ borderRadius: '1.75rem', border: '1px solid #e5e7eb' }}>
                <div className="text-center mb-4">
                  <div className="mb-2">
                    <span style={{ fontSize: "3rem" }}>🏨</span>
                  </div>
                  <h2 className="fw-bold mb-2" style={{ color: "#1a1a1a", fontSize: "1.75rem", fontFamily: "'Inter', sans-serif" }}>
                    Become a Hotel Partner
                  </h2>
                  <p className="mb-4" style={{ color: "#6b7280", fontSize: "1rem", lineHeight: "1.6", maxWidth: "500px", margin: "0 auto" }}>
                    Join our network and monetize extra storage space with secure luggage bookings.
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

                <form onSubmit={handleSubmit} className="text-start mt-4">
                  <h5 className="fw-bold mb-3 border-bottom pb-2" style={{ color: '#0d2aabff' }}>1. Account Details</h5>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">YOUR NAME *</label>
                    <input
                      type="text"
                      name="userName"
                      className="form-control form-control-lg shadow-none"
                      placeholder="Full Name"
                      value={form.userName}
                      onChange={handleChange}
                      style={{ borderRadius: "10px", fontSize: "1rem" }}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      name="userEmail"
                      className="form-control form-control-lg shadow-none"
                      placeholder="name@example.com"
                      value={form.userEmail}
                      onChange={handleChange}
                      style={{ borderRadius: "10px", fontSize: "1rem" }}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-bold small text-muted">PASSWORD *</label>
                    <input
                      type="password"
                      name="userPassword"
                      className="form-control form-control-lg shadow-none"
                      placeholder="Create a password (min 6 chars)"
                      value={form.userPassword}
                      onChange={handleChange}
                      minLength={6}
                      style={{ borderRadius: "10px", fontSize: "1rem" }}
                      required
                    />
                  </div>

                  <h5 className="fw-bold mb-3 border-bottom pb-2 mt-5" style={{ color: '#0d2aabff' }}>2. Hotel Details</h5>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">HOTEL NAME *</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-lg shadow-none"
                      placeholder="e.g. Grand Palace Hotel"
                      value={form.name}
                      onChange={handleChange}
                      style={{ borderRadius: "10px", fontSize: "1rem" }}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">ADDRESS *</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control form-control-lg shadow-none"
                      placeholder="Full street address, landmark, city"
                      value={form.address}
                      onChange={handleChange}
                      style={{ borderRadius: "10px", fontSize: "1rem" }}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-muted">LATITUDE *</label>
                      <input
                        type="number"
                        name="lat"
                        className="form-control form-control-lg shadow-none"
                        placeholder="e.g. 28.6139"
                        value={form.lat}
                        onChange={handleChange}
                        step="any"
                        style={{ borderRadius: "10px", fontSize: "1rem" }}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-muted">LONGITUDE *</label>
                      <input
                        type="number"
                        name="lng"
                        className="form-control form-control-lg shadow-none"
                        placeholder="e.g. 77.2090"
                        value={form.lng}
                        onChange={handleChange}
                        step="any"
                        style={{ borderRadius: "10px", fontSize: "1rem" }}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-muted">STORAGE CAPACITY (BAGS) *</label>
                    <input
                      type="number"
                      name="capacity"
                      className="form-control form-control-lg shadow-none"
                      placeholder="How many bags can you store?"
                      value={form.capacity}
                      min={1}
                      step={1}
                      onChange={handleChange}
                      style={{ borderRadius: "10px", fontSize: "1rem" }}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold small text-muted">BASE PRICE (₹)</label>
                      <input
                        type="number"
                        name="base"
                        className="form-control form-control-lg shadow-none"
                        placeholder="100"
                        value={form.base}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        style={{ borderRadius: "10px", fontSize: "1rem" }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold small text-muted">PER KG (₹)</label>
                      <input
                        type="number"
                        name="perKg"
                        className="form-control form-control-lg shadow-none"
                        placeholder="10"
                        value={form.perKg}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        style={{ borderRadius: "10px", fontSize: "1rem" }}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold small text-muted">PER HOUR (₹)</label>
                      <input
                        type="number"
                        name="perHour"
                        className="form-control form-control-lg shadow-none"
                        placeholder="5"
                        value={form.perHour}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        style={{ borderRadius: "10px", fontSize: "1rem" }}
                      />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn w-100 py-3 mt-3 fw-bold btn-lg"
                    disabled={loading}
                    style={{
                      borderRadius: '12px',
                      backgroundColor: '#047857',
                      color: 'white',
                      border: 'none',
                      padding: '0.85rem'
                    }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating Partner Account...
                      </>
                    ) : (
                      'Register & Join Network →'
                    )}
                  </motion.button>
                </form>
                <div className="mt-4 small text-center" style={{ color: "#6b7280" }}>
                  Already have an account? <Link to="/login" style={{ color: '#047857', fontWeight: '600' }}>Login here</Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BecomePartner;
