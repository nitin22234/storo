import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // State to manage the User Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // State to manage the Mobile Hamburger Menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Scroll detection for dynamic shadow/blur
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    navigate('/');
  };

  const closeMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-us" },
    { name: "Services", path: "/services" },
    { name: "Find Storage", path: "/find-storage" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="navbar navbar-expand-lg sticky-top"
      style={{
        backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.92)" : "#ffffff",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(229, 231, 235, 0.8)" : "1px solid #e5e7eb",
        padding: isScrolled ? "0.75rem 0" : "1rem 0",
        boxShadow: isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.08)" : "0 2px 10px rgba(0, 0, 0, 0.03)",
        transition: "all 0.3s ease",
        zIndex: 1050,
      }}
    >
      <div className="container">
        {/* Brand with subtle bounce on hover */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <Link
            className="navbar-brand d-flex align-items-center fw-bold"
            to="/"
            style={{ color: "#0d2aabff", fontSize: "1.5rem", letterSpacing: "-0.5px" }}
            onClick={closeMenus}
          >
            <motion.img
              src="https://res.cloudinary.com/dw1mz6arj/image/upload/v1764066614/luggage_irht4g.png"
              alt="Storo Logo"
              style={{ width: '30px', height: '30px', marginRight: '8px' }}
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            Storo
          </Link>
        </motion.div>

        {/* Mobile Toggle Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </motion.button>

        {/* Mobile Menu Collapse */}
        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="mainNavbar">

          {/* Main nav links - Centered with animated active pill */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4 position-relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path} className="nav-item position-relative">
                  <Link
                    className="nav-link fw-semibold px-2"
                    to={link.path}
                    onClick={closeMenus}
                    style={{
                      color: isActive ? "#0d2aabff" : "#1a1a1a",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {link.name}
                  </Link>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavUnderline"
                      className="d-none d-lg-block position-absolute"
                      style={{
                        bottom: "-2px",
                        left: "10%",
                        right: "10%",
                        height: "3px",
                        backgroundColor: "#0d2aabff",
                        borderRadius: "4px",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Auth area - Right aligned */}
          <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center gap-3">
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' ? (
                  <li className="nav-item">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Link to="/admin-dashboard" className="nav-link fw-bold" onClick={closeMenus} style={{ color: "#1a1a1a" }}>
                        Admin Dashboard
                      </Link>
                    </motion.div>
                  </li>
                ) : (
                  <li className="nav-item">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Link to="/dashboard" className="nav-link fw-bold" onClick={closeMenus} style={{ color: "#1a1a1a" }}>
                        Dashboard
                      </Link>
                    </motion.div>
                  </li>
                )}

                {/* User Dropdown with Spring animation */}
                <li className="nav-item dropdown position-relative">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    className={`btn nav-link dropdown-toggle fw-bold border-0 bg-transparent d-flex align-items-center gap-2 ${isDropdownOpen ? 'show' : ''}`}
                    id="userDropdown"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(!isDropdownOpen);
                    }}
                    aria-expanded={isDropdownOpen}
                    style={{ color: "#1a1a1a", cursor: "pointer" }}
                  >
                    <span className="badge rounded-circle p-2" style={{ backgroundColor: "#e0e7ff", color: "#0d2aabff", width: "28px", height: "28px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      {(user?.name || user?.email || 'U')[0].toUpperCase()}
                    </span>
                    <span>{user?.name || user?.email || 'User'}</span>
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="dropdown-menu border-0 shadow-lg show d-block"
                        aria-labelledby="userDropdown"
                        style={{
                          right: 0,
                          left: 'auto',
                          minWidth: '220px',
                          borderRadius: "14px",
                          marginTop: "8px",
                          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.12)",
                          overflow: "hidden",
                        }}
                      >
                        <li>
                          <Link className="dropdown-item py-2 px-3 fw-medium" to="/profile" onClick={closeMenus}>
                            👤 Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item py-2 px-3 fw-medium" to="/support" onClick={closeMenus}>
                            💬 Support
                          </Link>
                        </li>
                        <li><hr className="dropdown-divider my-1" /></li>
                        <li>
                          <button className="dropdown-item py-2 px-3 text-danger fw-semibold" onClick={handleLogout}>
                            <img src="/logout.png" alt="Logout" style={{ width: '18px', height: '18px', marginRight: '8px' }} />
                            Logout
                          </button>
                        </li>
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Link
                      to="/login"
                      className="btn fw-bold px-4 py-2"
                      onClick={closeMenus}
                      style={{
                        color: "#1a1a1a",
                        border: "2px solid #1a1a1a",
                        borderRadius: "50px",
                        backgroundColor: "transparent",
                        display: "inline-block",
                      }}
                    >
                      Log in
                    </Link>
                  </motion.div>
                </li>
                <li className="nav-item">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -1, boxShadow: "0 6px 20px rgba(139, 61, 136, 0.35)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{ borderRadius: "50px" }}
                  >
                    <Link
                      to="/become-partner"
                      className="btn fw-bold px-4 py-2"
                      onClick={closeMenus}
                      style={{
                        backgroundColor: "#8b3d88",
                        color: "white",
                        border: "none",
                        borderRadius: "50px",
                        display: "inline-block",
                      }}
                    >
                      Become a Partner
                    </Link>
                  </motion.div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;