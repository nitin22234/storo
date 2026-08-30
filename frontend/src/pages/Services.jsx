import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/MotionEffects';

function Services() {
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
          <div className="text-center mb-5">
            <span className="text-primary fw-bold text-uppercase tracking-wider" style={{ color: "#0d2aabff", letterSpacing: "1px" }}>
              What we offer
            </span>
            <h2 className="display-4 fw-bold mt-2 mb-4" style={{ color: "#1a1a1a", fontFamily: "'Inter', sans-serif" }}>
              Our Services
            </h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              More than just storage. We provide a complete ecosystem for hassle-free, lightweight travel.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer staggerChildren={0.15} className="row g-4 justify-content-center">
          {/* Service 1 */}
          <div className="col-md-4">
            <StaggerItem className="h-100">
              <HoverCard className="card h-100 border-0 shadow-sm" style={{ borderRadius: "1.5rem", border: "1px solid #e5e7eb" }}>
                <div className="card-body p-5 text-center d-flex flex-column justify-content-between">
                  <div>
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.15 }}
                      className="mb-4 d-inline-block p-3 rounded-circle"
                      style={{ backgroundColor: "rgba(13, 42, 171, 0.1)" }}
                    >
                      <span className="fs-1">🧳</span>
                    </motion.div>
                    <h3 className="h4 fw-bold mb-3" style={{ color: "#1a1a1a" }}>Luggage Storage</h3>
                    <p className="text-secondary mb-4">
                      Secure, hourly or daily storage at verified partner hotels.
                      Includes insurance, tamper-proof seals, and 24/7 support.
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/find-storage"
                      className="btn rounded-pill px-4 fw-bold w-100"
                      style={{
                        border: "2px solid #0d2aabff",
                        color: "#0d2aabff",
                        backgroundColor: "transparent",
                        transition: "all 0.2s ease"
                      }}
                    >
                      Book Storage →
                    </Link>
                  </motion.div>
                </div>
              </HoverCard>
            </StaggerItem>
          </div>

          {/* Service 2 */}
          <div className="col-md-4">
            <StaggerItem className="h-100">
              <HoverCard className="card h-100 border-0 shadow-sm" style={{ borderRadius: "1.5rem", border: "1px solid #e5e7eb" }}>
                <div className="card-body p-5 text-center d-flex flex-column justify-content-between">
                  <div>
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.15 }}
                      className="mb-4 d-inline-block p-3 rounded-circle"
                      style={{ backgroundColor: "rgba(4, 120, 87, 0.1)" }}
                    >
                      <span className="fs-1">🏨</span>
                    </motion.div>
                    <h3 className="h4 fw-bold mb-3" style={{ color: "#1a1a1a" }}>Partner Network</h3>
                    <p className="text-secondary mb-4">
                      For hotels and shops: Monetize your extra space.
                      Join our network to earn revenue and attract new customer footfall.
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/become-partner"
                      className="btn rounded-pill px-4 fw-bold w-100"
                      style={{
                        border: "2px solid #047857",
                        color: "#047857",
                        backgroundColor: "transparent",
                        transition: "all 0.2s ease"
                      }}
                    >
                      Become a Partner →
                    </Link>
                  </motion.div>
                </div>
              </HoverCard>
            </StaggerItem>
          </div>

          {/* Service 3 */}
          <div className="col-md-4">
            <StaggerItem className="h-100">
              <HoverCard className="card h-100 border-0 shadow-sm" style={{ borderRadius: "1.5rem", border: "1px solid #e5e7eb" }}>
                <div className="card-body p-5 text-center d-flex flex-column justify-content-between">
                  <div>
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.15 }}
                      className="mb-4 d-inline-block p-3 rounded-circle"
                      style={{ backgroundColor: "rgba(139, 61, 136, 0.1)" }}
                    >
                      <span className="fs-1">🗺️</span>
                    </motion.div>
                    <h3 className="h4 fw-bold mb-3" style={{ color: "#1a1a1a" }}>City Guides</h3>
                    <p className="text-secondary mb-4">
                      Discover the best tourist spots near your storage location.
                      Curated recommendations for food, sights, and transit.
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/cities"
                      className="btn rounded-pill px-4 fw-bold w-100"
                      style={{
                        border: "2px solid #8b3d88",
                        color: "#8b3d88",
                        backgroundColor: "transparent",
                        transition: "all 0.2s ease"
                      }}
                    >
                      Explore Cities →
                    </Link>
                  </motion.div>
                </div>
              </HoverCard>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>
    </div>
  );
}

export default Services;
