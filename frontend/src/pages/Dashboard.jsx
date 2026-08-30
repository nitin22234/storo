import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingAPI } from '../api';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/MotionEffects';

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [previousBookings, setPreviousBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!storedUser || !token) {
            navigate('/login');
            return;
        }

        try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
        } catch (err) {
            console.error('Error parsing user data:', err);
            navigate('/login');
            return;
        }

        fetchBookings();
    }, [navigate]);

    const fetchBookings = async () => {
        setLoading(true);
        setError('');
        try {
            const userBookings = await bookingAPI.getUserBookings();
            setBookings(userBookings);

            const currentDate = new Date();
            const upcoming = userBookings.filter(b => new Date(b.endAt) >= currentDate);
            const previous = userBookings.filter(b => new Date(b.endAt) < currentDate);

            setUpcomingBookings(upcoming);
            setPreviousBookings(previous);
        } catch (err) {
            setError(err.message || 'Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
            {/* Background Blob Effects */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
                <motion.div
                    animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        top: "-20%",
                        right: "-10%",
                        width: "700px",
                        height: "700px",
                        background: "radial-gradient(circle, rgba(139, 61, 136, 0.15) 0%, transparent 70%)",
                        borderRadius: "50%",
                        filter: "blur(80px)",
                    }}
                />
                <motion.div
                    animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        bottom: "-15%",
                        left: "-10%",
                        width: "600px",
                        height: "600px",
                        background: "radial-gradient(circle, rgba(4, 120, 87, 0.15) 0%, transparent 70%)",
                        borderRadius: "50%",
                        filter: "blur(80px)",
                    }}
                />
            </div>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                {/* Header Section */}
                <FadeIn direction="up">
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="card shadow-sm border-0 p-4" style={{ borderRadius: '1.5rem', border: '1px solid #e5e7eb' }}>
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                    <div>
                                        <h2 className="fw-bold text-primary mb-1" style={{ color: '#0d2aabff' }}>
                                            Welcome, {user?.name || 'User'}!
                                        </h2>
                                        <p className="text-muted mb-0">{user?.email}</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn btn-outline-danger px-4"
                                        onClick={handleLogout}
                                        style={{ borderRadius: "10px" }}
                                    >
                                        Logout
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Bookings Section with Animated Tabs */}
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow-sm border-0 p-4" style={{ borderRadius: '1.5rem', border: '1px solid #e5e7eb' }}>
                            {/* Tab Headers */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex gap-2 p-1 bg-light rounded-3" style={{ border: "1px solid #e5e7eb" }}>
                                    {[
                                        { id: 'upcoming', label: 'Upcoming Bookings', count: upcomingBookings.length },
                                        { id: 'previous', label: 'Previous Bookings', count: previousBookings.length }
                                    ].map((tab) => {
                                        const isSelected = activeTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                className="btn position-relative px-3 py-2 fw-semibold"
                                                onClick={() => setActiveTab(tab.id)}
                                                style={{
                                                    color: isSelected ? "#ffffff" : "#4b5563",
                                                    backgroundColor: isSelected ? "#0d2aabff" : "transparent",
                                                    borderRadius: "8px",
                                                    border: "none",
                                                    transition: "all 0.2s ease"
                                                }}
                                            >
                                                {tab.label}{' '}
                                                <span className={`badge ms-2 ${isSelected ? 'bg-white text-dark' : 'bg-secondary'}`}>
                                                    {tab.count}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-3 text-muted">Loading your bookings...</p>
                                </div>
                            ) : (
                                <AnimatePresence mode="wait">
                                    {activeTab === 'upcoming' && (
                                        <motion.div
                                            key="upcoming"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            {upcomingBookings.length === 0 ? (
                                                <div className="text-center py-5">
                                                    <span className="display-1 d-block mb-3">📦</span>
                                                    <h5 className="mt-3 text-muted fw-bold">No upcoming bookings</h5>
                                                    <p className="text-muted">Start by booking storage for your luggage!</p>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className="btn btn-primary mt-3 px-4 py-2 fw-semibold"
                                                        onClick={() => navigate('/find-storage')}
                                                        style={{ borderRadius: "10px", background: "#047857", border: "none" }}
                                                    >
                                                        Find Storage
                                                    </motion.button>
                                                </div>
                                            ) : (
                                                <StaggerContainer staggerChildren={0.08} className="row g-4">
                                                    {upcomingBookings.map((booking) => (
                                                        <div className="col-md-6 col-lg-4" key={booking._id}>
                                                            <StaggerItem className="h-100">
                                                                <HoverCard
                                                                    className="card h-100 border-0 shadow-sm"
                                                                    style={{ borderRadius: '1rem', borderLeft: '4px solid #047857', border: '1px solid #e5e7eb' }}
                                                                >
                                                                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                                                                        <div>
                                                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                                                <h6 className="fw-bold mb-0" style={{ color: "#1a1a1a" }}>
                                                                                    {booking.partner?.name || 'Partner'}
                                                                                </h6>
                                                                                <div>
                                                                                    <span className="badge bg-success me-1">Active</span>
                                                                                    <span className={`badge ${booking.paymentStatus === 'paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                                                        {booking.paymentStatus === 'paid' ? 'Paid' : 'Pay Later'}
                                                                                    </span>
                                                                                </div>
                                                                            </div>

                                                                            <p className="text-muted small mb-3">
                                                                                📍 {booking.partner?.address || 'N/A'}
                                                                            </p>

                                                                            <hr style={{ borderColor: "#f3f4f6" }} />

                                                                            <div className="row mb-2">
                                                                                <div className="col-6">
                                                                                    <small className="text-muted">Weight</small>
                                                                                    <p className="mb-1 fw-bold">{booking.weightKg} kg</p>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <small className="text-muted">Total Price</small>
                                                                                    <p className="h5 mb-0 text-success fw-bold">₹{booking.price}</p>
                                                                                </div>
                                                                            </div>

                                                                            <div className="mb-2">
                                                                                <small className="text-muted">Start:</small>{' '}
                                                                                <span className="small fw-medium">{formatDate(booking.startAt)}</span>
                                                                            </div>
                                                                            <div className="mb-2">
                                                                                <small className="text-muted">End:</small>{' '}
                                                                                <span className="small fw-medium">{formatDate(booking.endAt)}</span>
                                                                            </div>
                                                                        </div>

                                                                        <small className="text-muted d-block mt-3 pt-2 border-top">
                                                                            ID: <span className="font-monospace">{booking._id.slice(-8)}</span>
                                                                        </small>
                                                                    </div>
                                                                </HoverCard>
                                                            </StaggerItem>
                                                        </div>
                                                    ))}
                                                </StaggerContainer>
                                            )}
                                        </motion.div>
                                    )}

                                    {activeTab === 'previous' && (
                                        <motion.div
                                            key="previous"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            {previousBookings.length === 0 ? (
                                                <div className="text-center py-5">
                                                    <span className="display-1 d-block mb-3">📋</span>
                                                    <h5 className="mt-3 text-muted fw-bold">No previous bookings</h5>
                                                    <p className="text-muted">Your completed bookings will appear here.</p>
                                                </div>
                                            ) : (
                                                <StaggerContainer staggerChildren={0.08} className="row g-4">
                                                    {previousBookings.map((booking) => (
                                                        <div className="col-md-6 col-lg-4" key={booking._id}>
                                                            <StaggerItem className="h-100">
                                                                <HoverCard
                                                                    className="card h-100 border-0 shadow-sm"
                                                                    style={{ borderRadius: '1rem', borderLeft: '4px solid #6b7280', border: '1px solid #e5e7eb' }}
                                                                >
                                                                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                                                                        <div>
                                                                            <div className="d-flex justify-content-between align-items-start mb-3">
                                                                                <h6 className="fw-bold mb-0">
                                                                                    {booking.partner?.name || 'Partner'}
                                                                                </h6>
                                                                                <div>
                                                                                    <span className="badge bg-secondary me-1">Completed</span>
                                                                                    <span className={`badge ${booking.paymentStatus === 'paid' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                                                        {booking.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                                                                                    </span>
                                                                                </div>
                                                                            </div>

                                                                            <p className="text-muted small mb-3">
                                                                                📍 {booking.partner?.address || 'N/A'}
                                                                            </p>

                                                                            <hr style={{ borderColor: "#f3f4f6" }} />

                                                                            <div className="row mb-2">
                                                                                <div className="col-6">
                                                                                    <small className="text-muted">Weight</small>
                                                                                    <p className="mb-1 fw-bold">{booking.weightKg} kg</p>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <small className="text-muted">Total Price</small>
                                                                                    <p className="h5 mb-0 text-secondary fw-bold">₹{booking.price}</p>
                                                                                </div>
                                                                            </div>

                                                                            <div className="mb-2">
                                                                                <small className="text-muted">Start:</small>{' '}
                                                                                <span className="small fw-medium">{formatDate(booking.startAt)}</span>
                                                                            </div>
                                                                            <div className="mb-2">
                                                                                <small className="text-muted">End:</small>{' '}
                                                                                <span className="small fw-medium">{formatDate(booking.endAt)}</span>
                                                                            </div>
                                                                        </div>

                                                                        <small className="text-muted d-block mt-3 pt-2 border-top">
                                                                            ID: <span className="font-monospace">{booking._id.slice(-8)}</span>
                                                                        </small>
                                                                    </div>
                                                                </HoverCard>
                                                            </StaggerItem>
                                                        </div>
                                                    ))}
                                                </StaggerContainer>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
