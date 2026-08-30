import React from 'react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/MotionEffects';

function PaymentBilling() {
    const transactions = [
        { id: 'TXN001', date: '2024-01-15', amount: 299, status: 'Completed', method: 'UPI' },
        { id: 'TXN002', date: '2024-01-10', amount: 450, status: 'Completed', method: 'Card' },
        { id: 'TXN003', date: '2024-01-05', amount: 199, status: 'Completed', method: 'UPI' }
    ];

    return (
        <div style={{ backgroundColor: "#ffffff", minHeight: '100vh', paddingTop: '2rem', paddingBottom: '3rem', color: "#1a1a1a", position: "relative", overflow: "hidden" }}>
            <div className="container" style={{ maxWidth: '900px', position: "relative", zIndex: 1 }}>
                <FadeIn direction="up">
                    <div className="text-center mb-5">
                        <motion.span
                            animate={{ y: [-4, 4, -4] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="d-inline-block mb-2"
                            style={{ fontSize: '3.5rem' }}
                        >
                            💳
                        </motion.span>
                        <h2 className="fw-bold mb-1" style={{ color: '#1a202c', fontFamily: "'Inter', sans-serif" }}>Payment & Billing</h2>
                        <p style={{ color: '#6b7280' }}>View your transaction history and payment invoices</p>
                    </div>
                </FadeIn>

                {/* Transaction History */}
                <FadeIn direction="up" delay={0.1}>
                    <div className="bg-white shadow-sm p-4 rounded-4 mb-4 border" style={{ borderRadius: "1.5rem" }}>
                        <h5 className="fw-bold mb-4" style={{ color: '#1a202c' }}>Transaction History</h5>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead>
                                    <tr className="bg-light">
                                        <th style={{ color: '#6b7280', fontWeight: '600' }}>Transaction ID</th>
                                        <th style={{ color: '#6b7280', fontWeight: '600' }}>Date</th>
                                        <th style={{ color: '#6b7280', fontWeight: '600' }}>Amount</th>
                                        <th style={{ color: '#6b7280', fontWeight: '600' }}>Method</th>
                                        <th style={{ color: '#6b7280', fontWeight: '600' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((txn) => (
                                        <motion.tr
                                            key={txn.id}
                                            whileHover={{ backgroundColor: "#f9fafb" }}
                                        >
                                            <td className="font-monospace fw-semibold" style={{ color: '#0d2aabff' }}>{txn.id}</td>
                                            <td style={{ color: '#4a5568' }}>{txn.date}</td>
                                            <td className="fw-bold text-success">₹{txn.amount}</td>
                                            <td style={{ color: '#4a5568' }}>{txn.method}</td>
                                            <td>
                                                <span className="badge" style={{ backgroundColor: '#047857', color: 'white', borderRadius: "6px" }}>
                                                    {txn.status}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </FadeIn>

                {/* Payment Methods */}
                <FadeIn direction="up" delay={0.2}>
                    <div className="bg-white shadow-sm p-4 rounded-4 border" style={{ borderRadius: "1.5rem" }}>
                        <h5 className="fw-bold mb-3" style={{ color: '#1a202c' }}>Saved Payment Methods</h5>
                        <p style={{ color: '#6b7280' }}>Razorpay secures all transactions with end-to-end 256-bit encryption. UPI, Cards & NetBanking are supported.</p>
                        <div className="d-flex align-items-center gap-3 mt-3">
                            <span className="badge p-2 bg-light text-dark border">UPI Apps</span>
                            <span className="badge p-2 bg-light text-dark border">Debit / Credit Cards</span>
                            <span className="badge p-2 bg-light text-dark border">Net Banking</span>
                            <span className="badge p-2 bg-light text-dark border">Wallets</span>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}

export default PaymentBilling;
