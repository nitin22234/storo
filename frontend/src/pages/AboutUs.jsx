import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/MotionEffects';

function AboutUs() {
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
        <FadeIn direction="up">
          <div className="row justify-content-center align-items-center mb-5">
            <div className="col-lg-8 text-center">
              <span className="badge px-3 py-2 rounded-pill mb-3" style={{ backgroundColor: "#e0e7ff", color: "#0d2aabff", fontWeight: "600" }}>
                Our Mission
              </span>
              <h1 className="display-4 fw-bold mb-4" style={{ color: "#1a1a1a", fontFamily: "'Inter', sans-serif" }}>
                Reimagining Travel Freedom
              </h1>
              <p className="lead text-secondary mb-4" style={{ fontSize: "1.25rem", lineHeight: "1.8" }}>
                Storo is building India's largest network of secure, on-demand luggage storage.
                We partner with trusted hotels to give travelers the freedom to explore without the baggage.
              </p>
            </div>
          </div>
        </FadeIn>

        <StaggerContainer staggerChildren={0.15} className="row g-5 mb-5">
          <div className="col-md-4 text-center">
            <StaggerItem className="h-100">
              <HoverCard className="p-4 h-100 bg-white shadow-sm rounded-4 border">
                <div className="fs-1 mb-3">🛡️</div>
                <h3 className="fw-bold mb-3" style={{ color: "#1a202c" }}>Safety First</h3>
                <p className="text-muted">Every partner is vetted, and every bag is insured up to ₹10,000. Security is our obsession.</p>
              </HoverCard>
            </StaggerItem>
          </div>
          <div className="col-md-4 text-center">
            <StaggerItem className="h-100">
              <HoverCard className="p-4 h-100 bg-white shadow-sm rounded-4 border">
                <div className="fs-1 mb-3">⚡</div>
                <h3 className="fw-bold mb-3" style={{ color: "#1a202c" }}>Instant Booking</h3>
                <p className="text-muted">No calls, no forms. Book in 2 clicks and get instant directions to your storage spot.</p>
              </HoverCard>
            </StaggerItem>
          </div>
          <div className="col-md-4 text-center">
            <StaggerItem className="h-100">
              <HoverCard className="p-4 h-100 bg-white shadow-sm rounded-4 border">
                <div className="fs-1 mb-3">🤝</div>
                <h3 className="fw-bold mb-3" style={{ color: "#1a202c" }}>Local Partners</h3>
                <p className="text-muted">We support local businesses and hotels by connecting them with global travelers.</p>
              </HoverCard>
            </StaggerItem>
          </div>
        </StaggerContainer>

        <FadeIn direction="up" delay={0.3}>
          <div className="text-center mt-5">
            <h3 className="fw-bold mb-4">Ready to lighten your load?</h3>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="d-inline-block"
            >
              <Link
                to="/find-storage"
                className="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-pill shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #0d2aabff 0%, #081b70 100%)",
                  border: "none"
                }}
              >
                Find Storage Nearby →
              </Link>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export default AboutUs;
