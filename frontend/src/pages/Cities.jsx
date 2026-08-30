import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { partnerAPI } from '../api';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/MotionEffects';

function Cities() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cities = [
    { name: "Delhi", emoji: "🕌", gradient: "linear-gradient(135deg,#FFD6E0,#F3A183)", coordinates: { lat: 28.6139, lng: 77.2090 } },
    { name: "Mumbai", emoji: "🌴", gradient: "linear-gradient(135deg,#B2FEFA,#0ED2F7)", coordinates: { lat: 19.0760, lng: 72.8777 } },
    { name: "Bangalore", emoji: "🌳", gradient: "linear-gradient(135deg,#A1FFCE,#FAFFD1)", coordinates: { lat: 12.9716, lng: 77.5946 } },
    { name: "Goa", emoji: "🏖️", gradient: "linear-gradient(135deg,#FBC2EB,#A6C1EE)", coordinates: { lat: 15.2993, lng: 74.1240 } },
    { name: "Chennai", emoji: "🌅", gradient: "linear-gradient(135deg,#FDFFB6,#5BCEFA)", coordinates: { lat: 13.0827, lng: 80.2707 } },
    { name: "Kolkata", emoji: "🦚", gradient: "linear-gradient(135deg,#7DE2FC,#B9B6E5)", coordinates: { lat: 22.5726, lng: 88.3639 } },
    { name: "Jaipur", emoji: "🏰", gradient: "linear-gradient(135deg,#FFDEE9,#B5FFFC)", coordinates: { lat: 26.9124, lng: 75.7873 } },
    { name: "Hyderabad", emoji: "🌇", gradient: "linear-gradient(135deg,#D9AFD9,#97D9E1)", coordinates: { lat: 17.3850, lng: 78.4867 } }
  ];

  const handleViewPartners = async (city) => {
    setLoading(true);
    setError('');

    try {
      const partners = await partnerAPI.findNearby(
        city.coordinates.lng,
        city.coordinates.lat,
        10000
      );

      if (partners.length > 0) {
        navigate('/booking', { state: { city: city.name, partners } });
      } else {
        setError(`No partners found in ${city.name} at the moment.`);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch partners');
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
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <FadeIn direction="up">
          <div className="text-center mb-5">
            <span className="badge px-3 py-2 rounded-pill mb-2" style={{ backgroundColor: "#e0e7ff", color: "#0d2aabff", fontWeight: "600" }}>
              Pan-India Coverage
            </span>
            <h2 className="fw-bold display-6" style={{ color: "#1a1a1a", fontFamily: "'Inter', sans-serif" }}>
              Where You Can Find Us
            </h2>
            <p className="text-muted">Instant luggage storage across major transit hubs in India</p>
          </div>
        </FadeIn>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="alert alert-warning alert-dismissible fade show text-center mx-auto"
              style={{ maxWidth: '600px', borderRadius: '12px' }}
              role="alert"
            >
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError('')}
                aria-label="Close"
              ></button>
            </motion.div>
          )}
        </AnimatePresence>

        <StaggerContainer staggerChildren={0.08} className="row g-4">
          {cities.map(c => (
            <div className="col-md-6 col-lg-3" key={c.name}>
              <StaggerItem className="h-100">
                <HoverCard
                  className="card h-100 text-center shadow-sm border p-4 bg-white"
                  style={{
                    borderRadius: "20px",
                    border: "1px solid #e5e7eb"
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="d-flex align-items-center justify-content-center mb-3 mx-auto"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: c.gradient,
                      boxShadow: "0 4px 15px rgba(0,0,0,0.12)"
                    }}
                  >
                    <span className="fs-1">{c.emoji}</span>
                  </motion.div>
                  <h5 className="fw-bold mb-3">{c.name}</h5>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewPartners(c)}
                    className="btn btn-outline-primary btn-sm rounded-pill px-3 py-2 fw-semibold w-100"
                    disabled={loading}
                    style={{ borderColor: "#0d2aabff", color: "#0d2aabff" }}
                  >
                    {loading ? 'Loading...' : 'View Partners →'}
                  </motion.button>
                </HoverCard>
              </StaggerItem>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}

export default Cities;
