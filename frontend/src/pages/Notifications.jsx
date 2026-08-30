import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/MotionEffects';

function Notifications() {
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'booking', title: 'Booking Confirmed', message: 'Your booking at Hotel Taj has been confirmed', time: '2 hours ago', read: false },
        { id: 2, type: 'payment', title: 'Payment Successful', message: 'Payment of ₹299 received successfully', time: '5 hours ago', read: false },
        { id: 3, type: 'reminder', title: 'Pickup Reminder', message: 'Don\'t forget to collect your luggage by 6 PM', time: '1 day ago', read: true },
        { id: 4, type: 'offer', title: 'Special Offer', message: 'Get 20% off on your next booking with coupon STORO20', time: '2 days ago', read: true }
    ]);

    const getIcon = (type) => {
        switch (type) {
            case 'booking': return '📦';
            case 'payment': return '💰';
            case 'reminder': return '⏰';
            case 'offer': return '🎁';
            default: return '🔔';
        }
    };

    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    return (
        <div style={{ backgroundColor: "#ffffff", minHeight: '100vh', paddingTop: '2rem', paddingBottom: '3rem', color: "#1a1a1a", position: "relative", overflow: "hidden" }}>
            <div className="container" style={{ maxWidth: '800px', position: "relative", zIndex: 1 }}>
                <FadeIn direction="up">
                    <div className="text-center mb-5">
                        <motion.span
                            animate={{ rotate: [-10, 10, -10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                            className="d-inline-block mb-2"
                            style={{ fontSize: '3.5rem' }}
                        >
                            🔔
                        </motion.span>
                        <h2 className="fw-bold mb-1" style={{ color: '#1a202c', fontFamily: "'Inter', sans-serif" }}>Notifications</h2>
                        <p style={{ color: '#6b7280' }}>Stay updated with your live bookings and special travel offers</p>
                    </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.1}>
                    <div className="bg-white shadow-sm rounded-4 overflow-hidden border" style={{ borderRadius: "1.5rem" }}>
                        <StaggerContainer staggerChildren={0.08}>
                            {notifications.map((notif, index) => (
                                <StaggerItem key={notif.id}>
                                    <motion.div
                                        whileHover={{ backgroundColor: "#f9fafb" }}
                                        className="p-4"
                                        style={{
                                            borderBottom: index !== notifications.length - 1 ? '1px solid #f3f4f6' : 'none',
                                            backgroundColor: notif.read ? 'white' : '#f0fdf4',
                                            transition: 'background-color 0.2s ease'
                                        }}
                                    >
                                        <div className="d-flex align-items-start">
                                            <motion.div
                                                whileHover={{ scale: 1.2, rotate: 5 }}
                                                className="me-3"
                                                style={{ fontSize: '2rem' }}
                                            >
                                                {getIcon(notif.type)}
                                            </motion.div>
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-start mb-1">
                                                    <h6 className="fw-bold mb-1" style={{ color: '#1a202c' }}>{notif.title}</h6>
                                                    {!notif.read && (
                                                        <span className="badge shadow-sm" style={{ backgroundColor: '#047857', color: 'white', fontSize: '0.75rem', borderRadius: '6px' }}>
                                                            New
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mb-1" style={{ color: '#4a5568', fontSize: '0.95rem' }}>{notif.message}</p>
                                                <small style={{ color: '#9ca3af' }}>{notif.time}</small>
                                            </div>
                                        </div>
                                    </motion.div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </FadeIn>

                <FadeIn direction="up" delay={0.2}>
                    <div className="text-center mt-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn fw-semibold"
                            onClick={handleMarkAllAsRead}
                            style={{
                                color: '#0d2aabff',
                                border: '1px solid #0d2aabff',
                                padding: '0.6rem 2rem',
                                borderRadius: '10px'
                            }}
                        >
                            Mark All as Read
                        </motion.button>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}

export default Notifications;
