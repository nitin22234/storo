import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function PaymentSuccessModal({ transactionDetails, onClose }) {
  const navigate = useNavigate();

  const handleViewDashboard = () => {
    navigate('/dashboard');
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 1060,
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <motion.div
          initial={{ scale: 0.85, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 15, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 22 }}
          className="modal-content shadow-2xl"
          style={{ borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid #e5e7eb' }}
        >
          {/* Animated Success Header */}
          <div
            className="modal-header border-0 text-white text-center d-block py-4 position-relative"
            style={{
              background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)'
            }}
          >
            <div className="d-flex justify-content-center mb-3">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.15 }}
                className="rounded-circle bg-white d-flex align-items-center justify-content-center shadow-lg"
                style={{ width: '80px', height: '80px' }}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  style={{ fontSize: '2.5rem' }}
                >
                  ✅
                </motion.span>
              </motion.div>
            </div>
            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="modal-title fw-bold mb-2"
              style={{ fontFamily: 'serif' }}
            >
              Payment Successful!
            </motion.h4>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.3 }}
              className="mb-0"
            >
              Your luggage storage booking is confirmed
            </motion.p>
          </div>

          {/* Transaction Details */}
          <div className="modal-body p-4">
            <div className="mb-4">
              <h6 className="fw-bold mb-3" style={{ color: '#171717', fontFamily: 'serif' }}>
                Transaction Summary
              </h6>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="card mb-3 shadow-sm"
                style={{ backgroundColor: '#fffbf0', border: '1px solid #fed7aa', borderRadius: '1rem' }}
              >
                <div className="card-body p-3">
                  <div className="row mb-2">
                    <div className="col-6">
                      <small className="text-muted">Payment ID</small>
                    </div>
                    <div className="col-6 text-end">
                      <small className="fw-semibold font-monospace">
                        {transactionDetails.paymentId?.slice(-12) || 'N/A'}
                      </small>
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-6">
                      <small className="text-muted">Order ID</small>
                    </div>
                    <div className="col-6 text-end">
                      <small className="fw-semibold font-monospace">
                        {transactionDetails.orderId?.slice(-12) || 'N/A'}
                      </small>
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-6">
                      <small className="text-muted">Booking ID</small>
                    </div>
                    <div className="col-6 text-end">
                      <small className="fw-semibold font-monospace">
                        {transactionDetails.bookingId?.slice(-12) || 'N/A'}
                      </small>
                    </div>
                  </div>

                  <hr className="my-2" />

                  <div className="row">
                    <div className="col-6">
                      <small className="text-muted fw-bold">Amount Paid</small>
                    </div>
                    <div className="col-6 text-end">
                      <span className="fw-bold text-success fs-5">
                        ₹{transactionDetails.amount || '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="alert alert-info mb-0 py-2 px-3" style={{ borderRadius: '10px' }}>
                <small>
                  📧 A confirmation email has been sent to your registered email address.
                </small>
              </div>
            </div>

            <div className="alert alert-success border-0 mb-0 py-2 px-3" style={{ borderRadius: '10px' }}>
              <div className="d-flex align-items-center">
                <span className="fs-4 me-3">🛡️</span>
                <div>
                  <small className="fw-semibold d-block">Your luggage is insured</small>
                  <small className="text-muted">Coverage up to ₹10,000 included</small>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-footer border-0 pt-0 pb-4 px-4 d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary flex-fill py-2"
              onClick={onClose}
              style={{ borderRadius: '10px' }}
            >
              Close
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="btn btn-primary flex-fill fw-semibold py-2"
              onClick={handleViewDashboard}
              style={{
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #047857 0%, #065f46 100%)',
                border: 'none'
              }}
            >
              View Dashboard
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PaymentSuccessModal;
