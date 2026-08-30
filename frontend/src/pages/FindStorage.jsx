import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { partnerAPI } from '../api';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/MotionEffects';

function FindStorage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchLocation, setSearchLocation] = useState(location.state?.searchQuery || '');
    const [filteredPartners, setFilteredPartners] = useState([]);

    const defaultLocation = { lat: 28.6139, lng: 77.2090 };

    useEffect(() => {
        fetchAllPartners();
    }, []);

    const fetchAllPartners = async () => {
        setLoading(true);
        setError('');
        try {
            const allPartners = await partnerAPI.findNearby(
                defaultLocation.lng,
                defaultLocation.lat,
                500000
            );
            setPartners(allPartners);
            setFilteredPartners(allPartners);

            if (location.state?.searchQuery) {
                filterPartners(allPartners, location.state.searchQuery);
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch partners');
        } finally {
            setLoading(false);
        }
    };

    const filterPartners = (partnersList, searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredPartners(partnersList);
            setError('');
            return;
        }

        const term = searchTerm.toLowerCase();
        const filtered = partnersList.filter(partner => {
            const name = partner.name.toLowerCase();
            const address = partner.address.toLowerCase();
            return name.includes(term) || address.includes(term);
        });

        setFilteredPartners(filtered);

        if (filtered.length === 0) {
            setError(`No partners found for "${searchTerm}"`);
        } else {
            setError('');
        }
    };

    const handleSearch = () => {
        filterPartners(partners, searchLocation);
    };

    const handleBookNow = (partner) => {
        navigate('/booking', { state: { partners: [partner] } });
    };

    return (
        <div
            className="container-fluid py-5"
            style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #ffffff 100%)",
                minHeight: '90vh',
                color: "#1a1a1a",
                position: "relative",
                overflow: "hidden"
            }}
        >
            {/* Background animated blobs */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
                <motion.div
                    animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        top: "-15%",
                        right: "-8%",
                        width: "650px",
                        height: "650px",
                        background: "radial-gradient(circle, rgba(139, 61, 136, 0.15) 0%, transparent 70%)",
                        borderRadius: "50%",
                        filter: "blur(70px)",
                    }}
                />
                <motion.div
                    animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        bottom: "-15%",
                        left: "-8%",
                        width: "600px",
                        height: "600px",
                        background: "radial-gradient(circle, rgba(4, 120, 87, 0.15) 0%, transparent 70%)",
                        borderRadius: "50%",
                        filter: "blur(70px)",
                    }}
                />
            </div>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                {/* Header Section */}
                <FadeIn direction="up">
                    <div className="row mb-5">
                        <div className="col-12 text-center">
                            <h2 className="fw-bold mb-2" style={{ color: "#1a1a1a", fontSize: "2.5rem", fontFamily: "'Inter', sans-serif" }}>
                                Find Storage Partners
                            </h2>
                            <p style={{ color: "#6b7280" }}>Browse all available verified storage locations across India</p>
                        </div>
                    </div>
                </FadeIn>

                {/* Search Section */}
                <FadeIn direction="up" delay={0.1}>
                    <div className="row mb-5">
                        <div className="col-md-8 col-lg-6 mx-auto">
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                className="bg-white shadow-sm border p-3"
                                style={{ borderRadius: '1rem', borderColor: '#e5e7eb' }}
                            >
                                <div className="input-group input-group-lg">
                                    <input
                                        type="text"
                                        className="form-control border-0 shadow-none"
                                        placeholder="Search by city, name or location..."
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        style={{ fontSize: '1rem' }}
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="btn px-4 fw-bold"
                                        onClick={handleSearch}
                                        style={{
                                            background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '0.6rem'
                                        }}
                                    >
                                        Search
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </FadeIn>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="alert alert-warning text-center mx-auto"
                            style={{ maxWidth: '600px', borderRadius: '12px' }}
                            role="alert"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Loading State */}
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-5"
                    >
                        <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted fw-medium">Loading storage partners...</p>
                    </motion.div>
                ) : filteredPartners.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-5"
                    >
                        <span className="display-1 d-block mb-3">📦</span>
                        <h5 className="text-muted fw-bold">No storage partners found</h5>
                        <p className="text-muted">
                            {searchLocation ? 'Try searching for a different city or area name' : 'No storage partners available yet'}
                        </p>
                    </motion.div>
                ) : (
                    <>
                        {/* Results Count */}
                        <FadeIn direction="up">
                            <div className="row mb-4">
                                <div className="col-12">
                                    <p style={{ color: "#6b7280" }} className="fw-medium">
                                        Showing <span className="text-dark fw-bold">{filteredPartners.length}</span> storage partner{filteredPartners.length !== 1 ? 's' : ''}
                                    </p>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Partners Grid */}
                        <StaggerContainer staggerChildren={0.08} className="row g-4">
                            {filteredPartners.map((partner) => (
                                <div className="col-md-6 col-lg-4" key={partner._id}>
                                    <StaggerItem className="h-100">
                                        <HoverCard
                                            className="card h-100 bg-white shadow-sm"
                                            style={{
                                                borderRadius: '1.2rem',
                                                border: '1px solid #e5e7eb',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <div className="card-body p-4 d-flex flex-column justify-content-between">
                                                <div>
                                                    {/* Partner Header */}
                                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                                        <h5 className="fw-bold mb-0" style={{ color: "#1a1a1a" }}>{partner.name}</h5>
                                                        <span
                                                            className="badge shadow-sm"
                                                            style={{ backgroundColor: "#047857", color: "white", borderRadius: "8px", padding: "6px 10px" }}
                                                        >
                                                            ● Available
                                                        </span>
                                                    </div>

                                                    {/* Address */}
                                                    <div className="mb-3">
                                                        <small style={{ color: "#6b7280" }}>📍 Location</small>
                                                        <p className="mb-0 fw-medium" style={{ color: "#1a202c" }}>{partner.address}</p>
                                                    </div>

                                                    <hr style={{ borderColor: "#f3f4f6" }} />

                                                    {/* Capacity & Price */}
                                                    <div className="row mb-3">
                                                        <div className="col-6">
                                                            <small style={{ color: "#6b7280" }}>Capacity</small>
                                                            <p className="mb-0 fw-bold" style={{ color: "#1a202c" }}>{partner.capacity} bags</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <small style={{ color: "#6b7280" }}>Base Price</small>
                                                            <p className="mb-0 fw-bold text-success fs-5">₹{partner.base}<span className="fs-6 text-muted fw-normal">/day</span></p>
                                                        </div>
                                                    </div>

                                                    {/* Additional Details */}
                                                    <div className="mb-4 p-2 rounded-2" style={{ backgroundColor: "#f9fafb" }}>
                                                        <div className="d-flex justify-content-between">
                                                            <span className="small text-muted">Per Kg: <strong className="text-dark">₹{partner.perKg}</strong></span>
                                                            <span className="small text-muted">Per Hour: <strong className="text-dark">₹{partner.perHour}</strong></span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Book Now Button */}
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="btn w-100 fw-bold shadow-sm"
                                                    onClick={() => handleBookNow(partner)}
                                                    style={{
                                                        backgroundColor: '#047857',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '0.8rem',
                                                        borderRadius: '0.75rem'
                                                    }}
                                                >
                                                    Book Now →
                                                </motion.button>
                                            </div>
                                        </HoverCard>
                                    </StaggerItem>
                                </div>
                            ))}
                        </StaggerContainer>
                    </>
                )}
            </div>
        </div>
    );
}

export default FindStorage;
