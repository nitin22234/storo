import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supportAPI } from '../api';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/MotionEffects';

function Support() {
    const [formData, setFormData] = useState({
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            setMessage({ type: '', text: '' });

            await supportAPI.createTicket(formData.subject, formData.message);

            setMessage({
                type: 'success',
                text: 'Support request submitted successfully! We\'ll get back to you soon.'
            });

            setFormData({ subject: '', message: '' });

            setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 5000);
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setSubmitting(false);
        }
    };

    const faqs = [
        { q: 'How do I cancel my booking?', a: 'You can cancel your booking from the My Bookings page anytime before check-in.' },
        { q: 'What if I lose my luggage tag?', a: 'Contact our support team immediately with your booking ID for assistance.' },
        { q: 'Can I extend my storage time?', a: 'Yes, you can extend your storage time by contacting the partner hotel directly.' }
    ];

    return (
        <div style={{ backgroundColor: "#ffffff", minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem', color: "#1a1a1a", position: "relative", overflow: "hidden" }}>
            <div className="container" style={{ maxWidth: '900px', position: "relative", zIndex: 1 }}>
                <FadeIn direction="up">
                    <div className="text-center mb-5">
                        <motion.span
                            animate={{ y: [-4, 4, -4] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="d-inline-block mb-2"
                            style={{ fontSize: '3.5rem' }}
                        >
                            💬
                        </motion.span>
                        <h2 className="fw-bold mb-2" style={{ color: '#1a1a1a', fontFamily: "'Inter', sans-serif" }}>Support Center</h2>
                        <p style={{ color: '#6b7280' }}>We're here to help you 24/7 across India</p>
                    </div>
                </FadeIn>

                <StaggerContainer staggerChildren={0.12} className="row g-4 mb-5">
                    <div className="col-md-4">
                        <StaggerItem className="h-100">
                            <HoverCard className="bg-white shadow-sm p-4 rounded-4 text-center h-100 border">
                                <div className="mb-3" style={{ fontSize: '2.5rem' }}>📧</div>
                                <h5 className="fw-bold mb-2" style={{ color: '#1a202c' }}>Email</h5>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>support@storo.com</p>
                            </HoverCard>
                        </StaggerItem>
                    </div>
                    <div className="col-md-4">
                        <StaggerItem className="h-100">
                            <HoverCard className="bg-white shadow-sm p-4 rounded-4 text-center h-100 border">
                                <div className="mb-3" style={{ fontSize: '2.5rem' }}>📞</div>
                                <h5 className="fw-bold mb-2" style={{ color: '#1a202c' }}>Phone</h5>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>+91 1800-XXX-XXXX</p>
                            </HoverCard>
                        </StaggerItem>
                    </div>
                    <div className="col-md-4">
                        <StaggerItem className="h-100">
                            <HoverCard className="bg-white shadow-sm p-4 rounded-4 text-center h-100 border">
                                <div className="mb-3" style={{ fontSize: '2.5rem' }}>💬</div>
                                <h5 className="fw-bold mb-2" style={{ color: '#1a202c' }}>Live Chat</h5>
                                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Available 24/7</p>
                            </HoverCard>
                        </StaggerItem>
                    </div>
                </StaggerContainer>

                {/* Contact Form */}
                <FadeIn direction="up" delay={0.2}>
                    <div className="bg-white shadow-sm p-4 p-md-5 rounded-4 mb-5 border">
                        <h4 className="fw-bold mb-4" style={{ color: '#1a202c' }}>Send us a message</h4>

                        <AnimatePresence>
                            {message.text && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} mb-4`}
                                    role="alert"
                                    style={{ borderRadius: "10px" }}
                                >
                                    {message.text}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label fw-bold" style={{ color: '#1a202c' }}>Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    className="form-control form-control-lg shadow-none"
                                    placeholder="What can we help you with?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    style={{ borderColor: '#e5e7eb', borderRadius: "10px", fontSize: "1rem" }}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-bold" style={{ color: '#1a202c' }}>Message</label>
                                <textarea
                                    name="message"
                                    className="form-control form-control-lg shadow-none"
                                    rows="5"
                                    placeholder="Describe your issue or question..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    style={{ borderColor: '#e5e7eb', borderRadius: "10px", fontSize: "1rem" }}
                                />
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="btn w-100 py-3 fw-bold"
                                disabled={submitting}
                                style={{
                                    background: 'linear-gradient(135deg, #0d2aabff 0%, #081b70 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '0.75rem'
                                }}
                            >
                                {submitting ? 'Sending...' : 'Send Message →'}
                            </motion.button>
                        </form>
                    </div>
                </FadeIn>

                {/* Quick FAQs */}
                <FadeIn direction="up" delay={0.3}>
                    <div className="bg-white shadow-sm p-4 rounded-4 border">
                        <h4 className="fw-bold mb-4" style={{ color: '#1a202c' }}>Quick Answers</h4>
                        {faqs.map((faq, index) => (
                            <div key={index} className="mb-3 pb-3 border-bottom">
                                <h6 className="fw-bold" style={{ color: '#1a202c' }}>{faq.q}</h6>
                                <p style={{ color: '#4a5568', marginBottom: 0, fontSize: "0.95rem" }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}

export default Support;
