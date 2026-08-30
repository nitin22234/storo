import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer style={{ backgroundColor: "#1a1a1a", paddingTop: "4rem", paddingBottom: "2rem", borderTop: "1px solid #2d2d2d", color: "#e5e5e5" }}>
      <div className="container">
        <div className="row g-5">
          {/* Brand Section */}
          <div className="col-lg-4 col-md-6">
            <motion.h3
              whileHover={{ scale: 1.02 }}
              className="fw-bold mb-3 d-inline-block"
              style={{ color: "#ffffff", fontFamily: "serif" }}
            >
              Storo.
            </motion.h3>
            <p className="mb-4" style={{ lineHeight: "1.6", color: "#b3b3b3" }}>
              The world's most trusted luggage storage network.
              Explore freely, we'll handle the bags.
            </p>
            <div className="d-flex gap-3">
              {/* Social Icons */}
              {[
                {
                  icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
                  label: "Facebook"
                },
                {
                  icon: (
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </>
                  ),
                  label: "Instagram"
                },
                {
                  icon: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />,
                  label: "Twitter"
                }
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  whileHover={{ scale: 1.2, color: "#2acb72", rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  style={{ color: "#b3b3b3", display: "inline-block" }}
                  aria-label={item.label}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {item.icon}
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3" style={{ color: "#ffffff", fontFamily: "serif" }}>Company</h6>
            <ul className="list-unstyled">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about-us" },
                { name: "Services", path: "/services" },
                { name: "Become a Partner", path: "/become-partner" },
              ].map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="mb-2"
                >
                  <Link to={link.path} className="text-decoration-none" style={{ color: "#b3b3b3", transition: "color 0.2s ease" }}>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3" style={{ color: "#ffffff", fontFamily: "serif" }}>Support</h6>
            <ul className="list-unstyled">
              {[
                { name: "Help Center", path: "/support" },
                { name: "Locations", path: "/locations" },
                { name: "Find Storage", path: "/find-storage" },
              ].map((link, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="mb-2"
                >
                  <Link to={link.path} className="text-decoration-none" style={{ color: "#b3b3b3", transition: "color 0.2s ease" }}>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-bold mb-3" style={{ color: "#ffffff", fontFamily: "serif" }}>Stay Updated</h6>
            <p className="small mb-3" style={{ color: "#b3b3b3" }}>Get travel tips and exclusive deals sent straight to your inbox.</p>
            <form className="input-group mb-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="form-control border-end-0 shadow-none"
                placeholder="Enter your email"
                aria-label="Email"
                style={{
                  borderRadius: "0.5rem 0 0 0.5rem",
                  borderColor: "#3d3d3d",
                  backgroundColor: "#2d2d2d",
                  color: "#e5e5e5"
                }}
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="btn"
                type="button"
                style={{ borderRadius: "0 0.5rem 0.5rem 0", backgroundColor: "#047857", color: "white", fontWeight: "600" }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        <hr className="my-5" style={{ borderColor: "#2d2d2d" }} />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="small mb-0" style={{ color: "#b3b3b3" }}>&copy; 2025 Storo Inc. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <span className="small" style={{ color: "#b3b3b3" }}>Made with ❤️ for travelers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
