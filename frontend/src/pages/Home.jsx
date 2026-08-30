import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard, Floating } from '../components/MotionEffects';

// Blurry Background Blobs
const BlurryBg = () => (
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
    <motion.div
      animate={{
        x: [0, 40, -30, 0],
        y: [0, -30, 40, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        top: "-10%",
        right: "-5%",
        width: "550px",
        height: "550px",
        background: "radial-gradient(circle, rgba(139, 61, 136, 0.14) 0%, rgba(139, 61, 136, 0.04) 50%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(60px)",
      }}
    />
    <motion.div
      animate={{
        x: [0, -35, 30, 0],
        y: [0, 40, -25, 0],
        scale: [1, 0.95, 1.12, 1],
      }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        bottom: "-10%",
        left: "-5%",
        width: "550px",
        height: "550px",
        background: "radial-gradient(circle, rgba(4, 120, 87, 0.14) 0%, rgba(4, 120, 87, 0.04) 50%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(60px)",
      }}
    />
  </div>
);

// FAQ Section with smooth Framer Motion accordion
function FAQSection() {
  const faqs = [
    {
      q: "How safe is storing my luggage with Storo?",
      a: "Your bags are stored with pre-verified hotel partners and tagged at drop-off. Every booking comes with insurance for extra peace of mind!"
    },
    {
      q: "What is the cost of using Storo?",
      a: "Storo starts at just ₹99 per bag per day. Pricing varies by city and partner, always shown clearly at booking."
    },
    {
      q: "How do I find my nearest Storo partner?",
      a: "Just type your city or hotel in the search box and see our closest verified storage partners on the map."
    },
    {
      q: "Can I cancel or change my booking?",
      a: "Absolutely! Cancel or modify anytime before check-in—no fees, full flexibility."
    },
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="container my-5 py-4" style={{ maxWidth: "900px", position: "relative", zIndex: 1 }}>
      <FadeIn direction="up">
        <h3 className="fw-bold text-center mb-5" style={{ color: "#1a1a1a", fontFamily: "'Inter', sans-serif" }}>
          Frequently Asked Questions
        </h3>
      </FadeIn>
      <div className="bg-white rounded-4 shadow-sm p-4" style={{ border: "1px solid #e5e7eb" }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`${idx !== faqs.length - 1 ? 'border-bottom' : ''}`}
              style={{ paddingBottom: idx !== faqs.length - 1 ? '1.25rem' : '0', paddingTop: idx !== 0 ? '1.25rem' : '0', borderColor: "#e5e7eb" }}
            >
              <button
                className={`w-100 d-flex align-items-center justify-content-between px-0 py-0 text-start border-0 bg-transparent ${isOpen ? "fw-bold" : "fw-semibold"}`}
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                style={{
                  fontSize: "1.05rem",
                  outline: "none",
                  cursor: "pointer",
                  color: isOpen ? "#0d2aabff" : "#1a1a1a",
                  transition: "color 0.2s ease",
                }}
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="ms-3"
                  style={{
                    fontSize: "1rem",
                    display: "inline-block",
                    color: isOpen ? "#0d2aabff" : "#6b7280",
                  }}
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ fontSize: "0.98rem", lineHeight: "1.65", color: "#6b7280" }}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Reviews Section with Animated Cards
function ReviewsSection() {
  const reviews = [
    {
      name: "Aditi S.",
      city: "Delhi",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      stars: 5,
      text: "Dropped my luggage at 8am, picked up at 10pm. Seamless experience and super friendly team!"
    },
    {
      name: "Rahul P.",
      city: "Bangalore",
      avatar: "https://randomuser.me/api/portraits/men/17.jpg",
      stars: 5,
      text: "Booking took less than a minute. Price is awesome, Storo staff even gave me city tips."
    },
    {
      name: "Yvonne G.",
      city: "Mumbai",
      avatar: "https://randomuser.me/api/portraits/women/52.jpg",
      stars: 4,
      text: "Good insurance included, hotel was clean and safe. Would use Storo again next trip!"
    },
    {
      name: "Arjun T.",
      city: "Goa",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      stars: 5,
      text: "Perfect for tourists! Found a nearby hotel in seconds. No hassle."
    }
  ];

  return (
    <section className="container my-5 py-5 position-relative" style={{ zIndex: 1 }}>
      <FadeIn direction="up">
        <h3 className="fw-bold mb-5 text-center" style={{ color: "#1a202c", fontSize: "2.5rem" }}>
          Real Storo Reviews
        </h3>
      </FadeIn>
      <StaggerContainer staggerChildren={0.12} className="row g-4 justify-content-center">
        {reviews.map((r, i) => (
          <div className="col-md-6 col-xl-3" key={i}>
            <StaggerItem className="h-100">
              <HoverCard
                className="text-center py-4 px-3 h-100 bg-white shadow-sm"
                style={{
                  borderRadius: "1rem",
                  border: "1px solid #e5e7eb",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <div className="mb-3">
                  <motion.img
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    src={r.avatar}
                    alt={r.name}
                    className="rounded-circle shadow-sm"
                    style={{ width: 64, height: 64, objectFit: "cover", border: "3px solid #e5e7eb" }}
                  />
                </div>
                <h6 className="fw-bold mb-1" style={{ color: "#1a202c" }}>
                  {r.name} <span className="fw-normal" style={{ color: "#6b7280", fontSize: "0.9rem" }}>({r.city})</span>
                </h6>
                <div className="mb-3" style={{ color: '#d97706' }}>
                  {"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}
                </div>
                <p className="mb-0 fst-italic" style={{ color: "#4a5568", fontSize: "0.95rem", lineHeight: "1.6" }}>
                  "{r.text}"
                </p>
              </HoverCard>
            </StaggerItem>
          </div>
        ))}
      </StaggerContainer>
    </section>
  );
}

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/find-storage', { state: { searchQuery: searchQuery } });
  };

  const features = [
    {
      icon: "⚡",
      color: "success",
      title: "Quick and Seamless Booking",
      desc: "Book in 2 clicks with no calls, confirmations, or paperwork. Storage made instant."
    },
    {
      icon: "🔒",
      color: "primary",
      title: "Insured and Verified Locations",
      desc: "All Storo partners are vetted hotels; bags are tagged and insured up to ₹10,000 each."
    },
    {
      icon: "🤝",
      color: "warning",
      title: "All-day Support",
      desc: "Friendly live chat and fast email support. We're with you every step of your trip."
    },
    {
      icon: "☕",
      color: "info",
      title: "Trusted by Major Hotels",
      desc: "From Marriott to Lemon Tree, our partners ensure hospitality and trust."
    }
  ];

  return (
    <div style={{
      background: "#ffffff",
      position: "relative",
      minHeight: "100vh",
      overflow: "hidden",
      color: "#1a1a1a"
    }}>
      <BlurryBg />

      {/* Modern Hero Section */}
      <section
        className="container py-5 d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "75vh", position: "relative", zIndex: 1 }}
      >
        <div
          className="text-center"
          style={{
            maxWidth: "900px",
            padding: "2rem 1.5rem",
            zIndex: 2
          }}
        >
          {/* Floating Hero Badge */}
          <FadeIn direction="down" delay={0.1}>
            <Floating duration={4} distance={6} className="d-inline-block mb-3">
              <span
                className="badge px-3 py-2 shadow-sm rounded-pill fw-medium d-inline-flex align-items-center gap-2"
                style={{
                  backgroundColor: "rgba(139, 61, 136, 0.1)",
                  color: "#8b3d88",
                  border: "1px solid rgba(139, 61, 136, 0.2)",
                  fontSize: "0.9rem",
                }}
              >
                <span>🧳</span> #1 Luggage Storage Network in India
              </span>
            </Floating>
          </FadeIn>

          {/* Main Heading with Stagger Word Effect */}
          <FadeIn direction="up" delay={0.2}>
            <h1
              className="fw-bold mb-4"
              style={{
                color: "#1a1a1a",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                fontFamily: "'Inter', sans-serif",
                maxWidth: "900px",
                margin: "0 auto"
              }}
            >
              Store your bags.{" "}
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{
                  background: "linear-gradient(90deg, #8b3d88, #047857, #8b3d88)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontStyle: "italic",
                  fontWeight: "700"
                }}
              >
                Roam freely
              </motion.span>{" "}
              with Storo
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn direction="up" delay={0.3}>
            <p
              className="lead mb-4"
              style={{
                maxWidth: "650px",
                margin: "0 auto 2.5rem",
                color: "#6b7280",
                fontSize: "1.25rem",
                lineHeight: "1.7",
                fontWeight: "400"
              }}
            >
              Secure luggage storage instantly at{" "}
              <span className="fw-semibold" style={{ color: "#047857" }}>verified partner hotels</span>.
              <br />
              No stress, no hassle—just safe, simple drop-off.
            </p>
          </FadeIn>

          {/* Animated Search Form */}
          <FadeIn direction="up" delay={0.4}>
            <form className="mb-4" onSubmit={handleSearch}>
              <div className="d-flex justify-content-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{ maxWidth: "520px", width: "100%" }}
                >
                  <div
                    className="input-group input-group-lg shadow-lg"
                    style={{
                      borderRadius: "1rem",
                      overflow: "hidden",
                      border: "2px solid rgba(4, 120, 87, 0.2)",
                      transition: "border-color 0.3s ease",
                    }}
                  >
                    <input
                      className="form-control border-0 py-3 px-4 shadow-none"
                      type="text"
                      placeholder="Search by city or hotel name..."
                      style={{
                        background: "white",
                        fontSize: "1.05rem",
                      }}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className="btn btn-success px-4 fw-bold"
                      type="submit"
                      style={{
                        fontSize: "1.05rem",
                        background: "linear-gradient(135deg, #047857 0%, #065f46 100%)",
                        border: "none",
                      }}
                    >
                      Search
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </form>
          </FadeIn>

          {/* Trust Badges with Stagger Bounce */}
          <FadeIn direction="up" delay={0.5}>
            <div className="d-flex justify-content-center gap-3 mb-3 flex-wrap">
              <motion.span
                whileHover={{ scale: 1.06, y: -2 }}
                className="badge fs-6 px-4 py-2 shadow-sm"
                style={{ borderRadius: "0.8rem", backgroundColor: "#047857", color: "white", cursor: "default" }}
              >
                <span role="img" aria-label="shield">🛡️</span> ₹10,000 Insurance
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.06, y: -2 }}
                className="badge fs-6 px-4 py-2 shadow-sm"
                style={{ borderRadius: "0.8rem", backgroundColor: "#047857", color: "white", cursor: "default" }}
              >
                <span role="img" aria-label="calendar">📅</span> Free Cancel
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.06, y: -2 }}
                className="badge fs-6 px-4 py-2 shadow-sm"
                style={{ borderRadius: "0.8rem", backgroundColor: "#047857", color: "white", cursor: "default" }}
              >
                <span role="img" aria-label="clock">⚡</span> Instant Booking
              </motion.span>
            </div>
          </FadeIn>

          {/* Trust Text */}
          <FadeIn direction="up" delay={0.6}>
            <p className="mt-4 mb-0" style={{ color: "#4a5568" }}>
              <strong>Trusted by 150+ leading hotels</strong> · Rated 4.9 worldwide
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Partner Logos Bar with hover transitions */}
      <section className="container pb-2 text-center my-4 position-relative" style={{ zIndex: 1 }}>
        <FadeIn direction="up">
          <span className="small fw-bold text-uppercase mb-1 d-block" style={{ color: "#6b7280", letterSpacing: "1px" }}>
            as featured by
          </span>
          <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap mt-4">
            {["sheraton", "ibis", "marriott", "raffles", "lemontree", "taj"].map((logo, idx) => (
              <motion.div
                key={logo}
                whileHover={{ scale: 1.12, filter: "grayscale(0%)" }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 0.85, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={`assets/logos/${logo}.png`}
                  alt={`${logo} Hotels`}
                  style={{ height: 52, objectFit: "contain", filter: "grayscale(30%)" }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Why Choose Storo with Hover Cards */}
      <section className="container my-5 py-5 position-relative" style={{ zIndex: 1 }}>
        <FadeIn direction="up">
          <h2 className="fw-bold text-center mb-5 display-5" style={{ letterSpacing: "-1px", color: "#1a202c" }}>
            Why choose <span style={{ color: "#047857" }}>Storo?</span>
          </h2>
        </FadeIn>
        <StaggerContainer staggerChildren={0.12} className="row g-4 justify-content-center">
          {features.map((f, idx) => (
            <div className="col-md-6 col-lg-3" key={idx}>
              <StaggerItem className="h-100">
                <HoverCard
                  className="text-center p-4 h-100 bg-white shadow-sm"
                  style={{ borderRadius: "1.2rem", border: "1px solid #e5e7eb" }}
                >
                  <motion.div
                    whileHover={{ scale: 1.25, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                    className={`mb-3 fs-1 text-${f.color}`}
                  >
                    <span role="img" aria-label={f.title}>{f.icon}</span>
                  </motion.div>
                  <div className="fw-bold fs-5 mb-3" style={{ color: "#1a202c" }}>{f.title}</div>
                  <div style={{ color: "#4a5568", fontSize: "0.95rem", lineHeight: "1.6" }}>{f.desc}</div>
                </HoverCard>
              </StaggerItem>
            </div>
          ))}
        </StaggerContainer>
      </section>

      {/* How it works with Stagger Step Cards */}
      <section className="container my-5 py-5 position-relative" style={{ zIndex: 1 }}>
        <FadeIn direction="up">
          <h3 className="fw-bold text-center mb-5" style={{ color: "#1a202c", fontSize: "2.5rem" }}>
            How it works
          </h3>
        </FadeIn>
        <FadeIn direction="up" delay={0.15}>
          <div className="bg-white shadow-sm p-5 rounded-4" style={{ border: "1px solid #e5e7eb" }}>
            <StaggerContainer staggerChildren={0.15} className="row g-5 text-center align-items-stretch">
              <div className="col-md-4">
                <StaggerItem>
                  <motion.div whileHover={{ scale: 1.05 }} className="p-3">
                    <span className="display-4 mb-3 d-inline-block" style={{ color: "#047857" }}>🗺️</span>
                    <h5 className="fw-bold mb-3" style={{ color: "#1a202c" }}>1. Book Nearby</h5>
                    <p style={{ color: "#4a5568", lineHeight: "1.6" }}>Pick your trusted Storo spot with real-time inventory.</p>
                  </motion.div>
                </StaggerItem>
              </div>
              <div className="col-md-4">
                <StaggerItem>
                  <motion.div whileHover={{ scale: 1.05 }} className="p-3">
                    <span className="display-4 mb-3 d-inline-block" style={{ color: "#d97706" }}>📦</span>
                    <h5 className="fw-bold mb-3" style={{ color: "#1a202c" }}>2. Check-in Bags</h5>
                    <p style={{ color: "#4a5568", lineHeight: "1.6" }}>Show your reservation code and hand off. Storo's insurance starts here!</p>
                  </motion.div>
                </StaggerItem>
              </div>
              <div className="col-md-4">
                <StaggerItem>
                  <motion.div whileHover={{ scale: 1.05 }} className="p-3">
                    <span className="display-4 mb-3 d-inline-block" style={{ color: "#1e3a8a" }}>🥳</span>
                    <h5 className="fw-bold mb-3" style={{ color: "#1a202c" }}>3. Explore & Collect</h5>
                    <p style={{ color: "#4a5568", lineHeight: "1.6" }}>Get notified, return anytime, and hit the road light and free!</p>
                  </motion.div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </FadeIn>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Reviews Section */}
      <ReviewsSection />
    </div>
  );
}

export default Home;
