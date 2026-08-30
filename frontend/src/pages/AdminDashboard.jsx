import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { adminAPI } from '../api';
import { useAuth } from '../context/AuthContext';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/MotionEffects';

function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [pendingPartners, setPendingPartners] = useState([]);
    const [approvedPartners, setApprovedPartners] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchData();
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statsData, pendingData, approvedData] = await Promise.all([
                adminAPI.getStats(),
                adminAPI.getPendingPartners(),
                adminAPI.getApprovedPartners()
            ]);
            setStats(statsData);
            setPendingPartners(pendingData);
            setApprovedPartners(approvedData);
        } catch (err) {
            setError(err.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (partnerId) => {
        if (!window.confirm('Are you sure you want to approve this partner?')) return;

        try {
            await adminAPI.approvePartner(partnerId);
            fetchData();
        } catch (err) {
            alert(err.message || 'Failed to approve partner');
        }
    };

    const handleReject = async (partnerId) => {
        if (!window.confirm('Are you sure you want to reject and delete this partner request? This action cannot be undone.')) return;

        try {
            await adminAPI.rejectPartner(partnerId);
            fetchData();
        } catch (err) {
            alert(err.message || 'Failed to reject partner');
        }
    };

    if (loading && !stats) {
        return (
            <div className="container py-5 text-center d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid min-vh-100 py-4" style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 50%, #ffffff 100%)",
            color: "#1a1a1a"
        }}>
            <div className="container">
                {/* Header */}
                <FadeIn direction="up">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                        <div>
                            <h2 className="fw-bold" style={{ color: "#1a1a1a", fontFamily: "'Inter', sans-serif" }}>Admin Portal</h2>
                            <p className="text-muted mb-0">System administration and partner approvals</p>
                        </div>
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
                </FadeIn>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="alert alert-danger py-2 px-3 mb-4"
                            style={{ borderRadius: "10px" }}
                            role="alert"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Stats Cards */}
                <StaggerContainer staggerChildren={0.1} className="row g-4 mb-4">
                    <div className="col-md-3">
                        <StaggerItem className="h-100">
                            <HoverCard className="card border-0 shadow-sm h-100 text-white" style={{ background: "linear-gradient(135deg, #0d2aabff 0%, #081b70 100%)", borderRadius: "1.2rem" }}>
                                <div className="card-body p-4">
                                    <h6 className="card-title opacity-75 small fw-bold">TOTAL PARTNERS</h6>
                                    <h2 className="fw-bold mb-0">{stats?.totalPartners || 0}</h2>
                                </div>
                            </HoverCard>
                        </StaggerItem>
                    </div>
                    <div className="col-md-3">
                        <StaggerItem className="h-100">
                            <HoverCard className="card border-0 shadow-sm h-100 text-white" style={{ background: "linear-gradient(135deg, #047857 0%, #065f46 100%)", borderRadius: "1.2rem" }}>
                                <div className="card-body p-4">
                                    <h6 className="card-title opacity-75 small fw-bold">APPROVED PARTNERS</h6>
                                    <h2 className="fw-bold mb-0">{stats?.approvedPartners || 0}</h2>
                                </div>
                            </HoverCard>
                        </StaggerItem>
                    </div>
                    <div className="col-md-3">
                        <StaggerItem className="h-100">
                            <HoverCard className="card border-0 shadow-sm h-100 text-dark bg-warning bg-opacity-25" style={{ borderRadius: "1.2rem", border: "1px solid #fde68a" }}>
                                <div className="card-body p-4">
                                    <h6 className="card-title text-warning text-dark small fw-bold">PENDING APPROVAL</h6>
                                    <h2 className="fw-bold mb-0 text-dark">{stats?.pendingPartners || 0}</h2>
                                </div>
                            </HoverCard>
                        </StaggerItem>
                    </div>
                    <div className="col-md-3">
                        <StaggerItem className="h-100">
                            <HoverCard className="card border-0 shadow-sm h-100 bg-white" style={{ borderRadius: "1.2rem", border: "1px solid #e5e7eb" }}>
                                <div className="card-body p-4">
                                    <h6 className="card-title text-muted small fw-bold">TOTAL REGISTERED USERS</h6>
                                    <h2 className="fw-bold mb-0" style={{ color: "#0d2aabff" }}>{stats?.totalUsers || 0}</h2>
                                </div>
                            </HoverCard>
                        </StaggerItem>
                    </div>
                </StaggerContainer>

                {/* Partner Requests Table */}
                <FadeIn direction="up" delay={0.2}>
                    <div className="card border-0 shadow-sm" style={{ borderRadius: "1.5rem", border: "1px solid #e5e7eb", overflow: "hidden" }}>
                        <div className="card-header bg-white py-3 px-4" style={{ borderBottom: "1px solid #f3f4f6" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 fw-bold">Partner Applications</h5>
                                <div className="d-flex gap-2">
                                    <button
                                        type="button"
                                        className={`btn btn-sm px-3 py-1 fw-semibold`}
                                        onClick={() => setActiveTab('pending')}
                                        style={{
                                            borderRadius: "8px",
                                            backgroundColor: activeTab === 'pending' ? "#d97706" : "#f3f4f6",
                                            color: activeTab === 'pending' ? "white" : "#4b5563",
                                            border: "none"
                                        }}
                                    >
                                        Pending <span className={`badge ms-1 ${activeTab === 'pending' ? 'bg-white text-dark' : 'bg-secondary'}`}>{pendingPartners.length}</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-sm px-3 py-1 fw-semibold`}
                                        onClick={() => setActiveTab('approved')}
                                        style={{
                                            borderRadius: "8px",
                                            backgroundColor: activeTab === 'approved' ? "#047857" : "#f3f4f6",
                                            color: activeTab === 'approved' ? "white" : "#4b5563",
                                            border: "none"
                                        }}
                                    >
                                        Approved <span className={`badge ms-1 ${activeTab === 'approved' ? 'bg-white text-dark' : 'bg-secondary'}`}>{approvedPartners.length}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="px-4 py-3">Partner Name</th>
                                        <th>Address</th>
                                        <th>Contact</th>
                                        <th>Email</th>
                                        <th>Capacity</th>
                                        <th>Pricing</th>
                                        <th>Submitted</th>
                                        {activeTab === 'pending' && <th className="pe-4">Actions</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence mode="wait">
                                        {activeTab === 'pending' ? (
                                            pendingPartners.length > 0 ? (
                                                pendingPartners.map(({ partner, user }) => (
                                                    <motion.tr
                                                        key={partner._id}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        style={{ borderLeft: '3px solid #ffc107' }}
                                                    >
                                                        <td className="px-4 fw-bold">{partner.name}</td>
                                                        <td className="small">{partner.address}</td>
                                                        <td>{user?.name || 'N/A'}</td>
                                                        <td className="small">{user?.email || 'N/A'}</td>
                                                        <td className="fw-semibold">{partner.capacity} bags</td>
                                                        <td>
                                                            <small className="text-muted">
                                                                Base: ₹{partner.base} | Kg: ₹{partner.perKg} | Hr: ₹{partner.perHour}
                                                            </small>
                                                        </td>
                                                        <td className="small">{new Date(partner.createdAt).toLocaleDateString()}</td>
                                                        <td className="pe-4">
                                                            <div className="d-flex gap-2">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    className="btn btn-sm btn-success"
                                                                    onClick={() => handleApprove(partner._id)}
                                                                    style={{ borderRadius: "6px" }}
                                                                >
                                                                    ✓ Approve
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    onClick={() => handleReject(partner._id)}
                                                                    style={{ borderRadius: "6px" }}
                                                                >
                                                                    ✗ Reject
                                                                </motion.button>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="8" className="text-center py-5 text-muted">
                                                        No pending partner applications.
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            approvedPartners.length > 0 ? (
                                                approvedPartners.map(({ partner, user }) => (
                                                    <motion.tr
                                                        key={partner._id}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        style={{ borderLeft: '3px solid #28a745' }}
                                                    >
                                                        <td className="px-4 fw-bold">{partner.name}</td>
                                                        <td className="small">{partner.address}</td>
                                                        <td>{user?.name || 'N/A'}</td>
                                                        <td className="small">{user?.email || 'N/A'}</td>
                                                        <td className="fw-semibold">{partner.capacity} bags</td>
                                                        <td>
                                                            <small className="text-muted">
                                                                Base: ₹{partner.base} | Kg: ₹{partner.perKg} | Hr: ₹{partner.perHour}
                                                            </small>
                                                        </td>
                                                        <td className="small">{new Date(partner.createdAt).toLocaleDateString()}</td>
                                                    </motion.tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="7" className="text-center py-5 text-muted">
                                                        No approved partners in the network yet.
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

export default AdminDashboard;
