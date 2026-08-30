import React, { useState, useEffect } from 'react';
import { partnerAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/MotionEffects';

function PartnerDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [upcomingBookings, setUpcomingBookings] = useState([]);
    const [previousBookings, setPreviousBookings] = useState([]);
    const [activeTab, setActiveTab] = useState('upcoming');
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('month');
    const [customDate, setCustomDate] = useState({ start: '', end: '' });

    useEffect(() => {
        if (user && user.role !== 'partner') {
            navigate('/dashboard');
            return;
        }
        fetchData();
    }, [filter, customDate.end]);

    const fetchData = async () => {
        try {
            setLoading(true);
            let startDate, endDate;

            if (filter === 'custom' && customDate.start && customDate.end) {
                startDate = customDate.start;
                endDate = customDate.end;
            }

            const [statsData, bookingsData] = await Promise.all([
                partnerAPI.getStats(startDate, endDate),
                partnerAPI.getBookings(filter, startDate, endDate)
            ]);

            setStats(statsData);
            setBookings(bookingsData);

            const currentDate = new Date();
            const upcoming = bookingsData.filter(b => new Date(b.endAt) >= currentDate);
            const previous = bookingsData.filter(b => new Date(b.endAt) < currentDate);

            setUpcomingBookings(upcoming);
            setPreviousBookings(previous);
        } catch (error) {
            console.error('Error fetching partner data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        if (newFilter !== 'custom') {
            setCustomDate({ start: '', end: '' });
        }
    };

    if (loading && !stats) {
        return (
            <div className="container py-5 text-center d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
                <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid min-vh-100 py-4" style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #ffffff 100%)",
            color: "#1a1a1a",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Background Blob */}
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
            </div>

            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                {/* Header */}
                <FadeIn direction="up">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                        <div>
                            <h2 className="fw-bold" style={{ color: "#1a1a1a", fontFamily: "'Inter', sans-serif" }}>
                                Partner Dashboard
                            </h2>
                            <p className="text-muted mb-0" style={{ color: "#6b7280" }}>Welcome back, {user?.name}</p>
                        </div>
                        <div className="d-flex gap-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-outline-danger px-4"
                                onClick={() => { logout(); navigate('/login'); }}
                                style={{ borderRadius: "10px" }}
                            >
                                Logout
                            </motion.button>
                        </div>
                    </div>
                </FadeIn>

                {/* Filters */}
                <FadeIn direction="up" delay={0.1}>
                    <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "1rem", border: "1px solid #e5e7eb" }}>
                        <div className="card-body p-3">
                            <div className="d-flex flex-wrap gap-2 align-items-center">
                                <span className="fw-bold me-2 small text-muted">TIMEFRAME:</span>
                                {['day', 'week', 'month', 'year'].map((f) => (
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        key={f}
                                        className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline-secondary'}`}
                                        onClick={() => handleFilterChange(f)}
                                        style={{
                                            borderRadius: "8px",
                                            backgroundColor: filter === f ? "#0d2aabff" : "transparent",
                                            borderColor: filter === f ? "#0d2aabff" : "#d1d5db"
                                        }}
                                    >
                                        Last {f.charAt(0).toUpperCase() + f.slice(1)}
                                    </motion.button>
                                ))}
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className={`btn btn-sm ${filter === 'custom' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                    onClick={() => handleFilterChange('custom')}
                                    style={{
                                        borderRadius: "8px",
                                        backgroundColor: filter === 'custom' ? "#0d2aabff" : "transparent",
                                        borderColor: filter === 'custom' ? "#0d2aabff" : "#d1d5db"
                                    }}
                                >
                                    Custom Date
                                </motion.button>

                                {filter === 'custom' && (
                                    <div className="d-flex gap-2 ms-2 align-items-center">
                                        <input
                                            type="date"
                                            className="form-control form-control-sm"
                                            value={customDate.start}
                                            onChange={(e) => setCustomDate({ ...customDate, start: e.target.value })}
                                        />
                                        <span className="align-self-center">-</span>
                                        <input
                                            type="date"
                                            className="form-control form-control-sm"
                                            value={customDate.end}
                                            onChange={(e) => setCustomDate({ ...customDate, end: e.target.value })}
                                        />
                                        <button className="btn btn-sm btn-primary" onClick={fetchData}>Apply</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Stats Cards */}
                <StaggerContainer staggerChildren={0.1} className="row g-4 mb-4">
                    <div className="col-md-3">
                        <StaggerItem className="h-100">
                            <HoverCard className="card border-0 shadow-sm h-100 text-white" style={{ background: "linear-gradient(135deg, #0d2aabff 0%, #081b70 100%)", borderRadius: "1.2rem" }}>
                                <div className="card-body p-4">
                                    <h6 className="card-title opacity-75 small fw-bold">TOTAL EARNINGS</h6>
                                    <h2 className="fw-bold mb-0">₹{stats?.totalEarnings?.toLocaleString() || 0}</h2>
                                </div>
                            </HoverCard>
                        </StaggerItem>
                    </div>
                    <div className="col-md-3">
                        <StaggerItem className="h-100">
                            <HoverCard className="card border-0 shadow-sm h-100 text-white" style={{ background: "linear-gradient(135deg, #047857 0%, #065f46 100%)", borderRadius: "1.2rem" }}>
                                <div className="card-body p-4">
                                    <h6 className="card-title opacity-75 small fw-bold">TOTAL BOOKINGS</h6>
                                    <h2 className="fw-bold mb-0">{stats?.totalBookings || 0}</h2>
                                </div>
                            </HoverCard>
                        </StaggerItem>
                    </div>
                    <div className="col-md-3">
                        <StaggerItem className="h-100">
                            <HoverCard className="card border-0 shadow-sm h-100 bg-white" style={{ borderRadius: "1.2rem", border: "1px solid #e5e7eb" }}>
                                <div className="card-body p-4">
                                    <h6 className="card-title text-muted small fw-bold">PAID BOOKINGS</h6>
                                    <h2 className="fw-bold mb-0 text-success">{stats?.paidBookings || 0}</h2>
                                </div>
                            </HoverCard>
                        </StaggerItem>
                    </div>
                    <div className="col-md-3">
                        <StaggerItem className="h-100">
                            <HoverCard className="card border-0 shadow-sm h-100 bg-white" style={{ borderRadius: "1.2rem", border: "1px solid #e5e7eb" }}>
                                <div className="card-body p-4">
                                    <h6 className="card-title text-muted small fw-bold">AVG. BOOKING VALUE</h6>
                                    <h2 className="fw-bold mb-0" style={{ color: "#0d2aabff" }}>₹{Math.round(stats?.averageBookingValue || 0)}</h2>
                                </div>
                            </HoverCard>
                        </StaggerItem>
                    </div>
                </StaggerContainer>

                {/* Bookings Table with Tabs */}
                <FadeIn direction="up" delay={0.2}>
                    <div className="card border-0 shadow-sm" style={{ borderRadius: "1.5rem", border: "1px solid #e5e7eb", overflow: "hidden" }}>
                        <div className="card-header bg-white py-3 px-4" style={{ borderBottom: "1px solid #f3f4f6" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold" style={{ color: "#1a1a1a" }}>Customer Bookings</h5>
                                <div className="d-flex gap-2">
                                    <button
                                        type="button"
                                        className={`btn btn-sm px-3 py-1 fw-semibold`}
                                        onClick={() => setActiveTab('upcoming')}
                                        style={{
                                            borderRadius: "8px",
                                            backgroundColor: activeTab === 'upcoming' ? "#0d2aabff" : "#f3f4f6",
                                            color: activeTab === 'upcoming' ? "white" : "#4b5563",
                                            border: "none"
                                        }}
                                    >
                                        Upcoming <span className={`badge ms-1 ${activeTab === 'upcoming' ? 'bg-white text-dark' : 'bg-secondary'}`}>{upcomingBookings.length}</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-sm px-3 py-1 fw-semibold`}
                                        onClick={() => setActiveTab('previous')}
                                        style={{
                                            borderRadius: "8px",
                                            backgroundColor: activeTab === 'previous' ? "#0d2aabff" : "#f3f4f6",
                                            color: activeTab === 'previous' ? "white" : "#4b5563",
                                            border: "none"
                                        }}
                                    >
                                        Previous <span className={`badge ms-1 ${activeTab === 'previous' ? 'bg-white text-dark' : 'bg-secondary'}`}>{previousBookings.length}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="px-4 py-3">Booking ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Duration</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th className="pe-4">Payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence mode="wait">
                                        {activeTab === 'upcoming' ? (
                                            upcomingBookings.length > 0 ? (
                                                upcomingBookings.map((booking) => (
                                                    <motion.tr
                                                        key={booking._id}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        style={{ borderLeft: '3px solid #047857' }}
                                                    >
                                                        <td className="px-4"><span className="badge bg-light text-dark border font-monospace">#{booking._id.slice(-6).toUpperCase()}</span></td>
                                                        <td>
                                                            <div className="fw-bold">{booking.user?.name || 'Guest'}</div>
                                                            <div className="small text-muted">{booking.user?.phone || 'N/A'}</div>
                                                        </td>
                                                        <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                                                        <td className="small">
                                                            {new Date(booking.startAt).toLocaleDateString()} - {new Date(booking.endAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="fw-bold text-success">₹{booking.price}</td>
                                                        <td>
                                                            <span className="badge bg-success">ACTIVE</span>
                                                        </td>
                                                        <td className="pe-4">
                                                            <span className={`badge bg-${booking.paymentStatus === 'paid' ? 'success' : 'warning text-dark'}`}>
                                                                {booking.paymentStatus === 'paid' ? 'PAID' : 'PENDING'}
                                                            </span>
                                                        </td>
                                                    </motion.tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center py-5 text-muted">
                                                        No upcoming bookings found for this timeframe.
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            previousBookings.length > 0 ? (
                                                previousBookings.map((booking) => (
                                                    <motion.tr
                                                        key={booking._id}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        style={{ borderLeft: '3px solid #6b7280' }}
                                                    >
                                                        <td className="px-4"><span className="badge bg-light text-dark border font-monospace">#{booking._id.slice(-6).toUpperCase()}</span></td>
                                                        <td>
                                                            <div className="fw-bold">{booking.user?.name || 'Guest'}</div>
                                                            <div className="small text-muted">{booking.user?.phone || 'N/A'}</div>
                                                        </td>
                                                        <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                                                        <td className="small">
                                                            {new Date(booking.startAt).toLocaleDateString()} - {new Date(booking.endAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="fw-bold text-secondary">₹{booking.price}</td>
                                                        <td>
                                                            <span className="badge bg-secondary">COMPLETED</span>
                                                        </td>
                                                        <td className="pe-4">
                                                            <span className={`badge bg-${booking.paymentStatus === 'paid' ? 'success' : 'warning text-dark'}`}>
                                                                {booking.paymentStatus === 'paid' ? 'PAID' : 'PENDING'}
                                                            </span>
                                                        </td>
                                                    </motion.tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center py-5 text-muted">
                                                        No previous bookings found for this timeframe.
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}

export default PartnerDashboard;
