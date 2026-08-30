import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { paymentAPI, bookingAPI } from '../api';

function PaymentModal({ booking, onPaymentSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = async () => {
    if (!window.Razorpay) {
      setError('Razorpay SDK not loaded. Please refresh the page.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const order = await paymentAPI.createOrder(booking._id, booking.price);
      const razorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        setError('Razorpay key not configured. Please add REACT_APP_RAZORPAY_KEY_ID to your .env file.');
        setLoading(false);
        return;
      }

      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'Storo',
        description: `Booking #${booking._id}`,
        order_id: order.id,
        handler: async function (response) {
          setLoading(true);
          setError('');

          try {
            const verification = await paymentAPI.verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              booking._id
            );

            if (verification.ok) {
              const transactionDetails = {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                bookingId: booking._id,
                amount: booking.price,
              };

              setLoading(false);
              onPaymentSuccess(transactionDetails);
            } else {
              setLoading(false);
              setError('Payment verification failed');
              try {
                await bookingAPI.deleteBooking(booking._id);
              } catch (err) {
                console.error('Failed to delete booking:', err);
              }
            }
          } catch (err) {
            setLoading(false);
            setError(err.message || 'Payment verification failed');
            try {
              await bookingAPI.deleteBooking(booking._id);
            } catch (deleteErr) {
              console.error('Failed to delete booking:', deleteErr);
            }
          }
        },
        prefill: {
          name: 'User',
          email: 'user@example.com',
        },
        theme: {
          color: '#171717',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setError('');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to initiate payment');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 1060,
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <motion.div
          initial={{ scale: 0.92, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 10, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="modal-content shadow-2xl"
          style={{
            borderRadius: '1.5rem',
            border: '1px solid #e5e7eb',
            backgroundColor: '#fff',
            overflow: 'hidden',
          }}
        >
          <div className="modal-header px-4 py-3" style={{ borderBottom: '1px solid #f3f4f6' }}>
            <h5 className="modal-title fw-bold" style={{ color: '#171717', fontFamily: 'serif' }}>Payment Required</h5>
            <button
              type="button"
              className="btn-close shadow-none"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
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

            <div className="mb-3 p-3 rounded-3" style={{ backgroundColor: "#f9fafb", border: "1px solid #f3f4f6" }}>
              <h6 className="fw-bold mb-2">Booking Summary</h6>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted small">Booking ID</span>
                <span className="fw-semibold font-monospace small">{booking._id?.slice(-10)}</span>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted small">Amount</span>
                <span className="fw-bold text-success">₹{booking.price}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted small">Status</span>
                <span className="badge bg-warning text-dark">{booking.status}</span>
              </div>
            </div>

            <div className="alert alert-info py-2 px-3 mb-0" style={{ borderRadius: "10px" }}>
              <small>
                Please complete the payment to confirm your booking. You will be redirected to
                Razorpay secure payment gateway.
              </small>
            </div>
          </div>
          <div className="modal-footer px-4 py-3 border-0 bg-light">
            <button
              type="button"
              className="btn btn-outline-secondary px-3 py-2"
              onClick={onClose}
              disabled={loading}
              style={{ borderRadius: "10px" }}
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="btn btn-primary px-4 py-2 fw-semibold"
              onClick={handlePayment}
              disabled={loading}
              style={{
                borderRadius: "10px",
                background: "linear-gradient(135deg, #0d2aabff 0%, #081b70 100%)",
                border: "none"
              }}
            >
              {loading ? 'Processing...' : `Pay ₹${booking.price}`}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default PaymentModal;
