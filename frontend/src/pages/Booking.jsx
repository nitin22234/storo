import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { bookingAPI } from '../api';
import PaymentModal from '../components/PaymentModal';
import PaymentSuccessModal from '../components/PaymentSuccessModal';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/MotionEffects';

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingForm, setBookingForm] = useState({
    weightKg: '',
    startAt: '',
    endAt: '',
  });
  const [bookingCreated, setBookingCreated] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    if (location.state?.partners && location.state.partners.length > 0) {
      setSelectedPartner(location.state.partners[0]);
    } else {
      navigate('/find-storage');
    }
  }, [location.state, navigate]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPartner) {
      setError('No partner selected');
      return;
    }

    if (!bookingForm.weightKg || !bookingForm.startAt || !bookingForm.endAt) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const booking = await bookingAPI.createBooking(
        selectedPartner._id,
        parseFloat(bookingForm.weightKg),
        new Date(bookingForm.startAt).toISOString(),
        new Date(bookingForm.endAt).toISOString(),
        'pay-now'
      );
      setBookingCreated(booking);
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value,
    });
  };

  if (!selectedPartner) {
    return (
      <div className="container-fluid py-5 d-flex align-items-center justify-content-center" style={{ minHeight: '90vh' }}>
        <div className="text-center">
          <div className="spinner-border text-success" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#ffffff",
        minHeight: '90vh',
        color: "#1a1a1a",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <FadeIn direction="up">
              <div className="text-center mb-5">
                <h2 className="fw-bold" style={{ color: "#0d2aabff", fontFamily: "'Inter', sans-serif" }}>
                  Complete Your Booking
                </h2>
                <p className="text-muted">Fill in the details below to reserve your secure storage spot</p>
              </div>
            </FadeIn>

            <StaggerContainer staggerChildren={0.15} className="row g-4">
              {/* Partner Details Card */}
              <div className="col-md-5">
                <StaggerItem className="h-100">
                  <HoverCard className="card border-0 shadow-sm h-100" style={{ borderRadius: '1.5rem', border: '1px solid #e5e7eb' }}>
                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="fw-bold mb-0" style={{ color: '#0d2aabff' }}>Selected Hotel</h5>
                          <span className="badge" style={{ backgroundColor: "#047857", color: "white" }}>Verified</span>
                        </div>

                        <div className="mb-3">
                          <h5 className="fw-bold mb-1" style={{ color: "#1a1a1a" }}>{selectedPartner.name}</h5>
                          <p className="text-muted mb-0 small">
                            📍 {selectedPartner.address}
                          </p>
                        </div>

                        <hr style={{ borderColor: "#f3f4f6" }} />

                        <div className="row mb-3">
                          <div className="col-6">
                            <small className="text-muted">Capacity</small>
                            <p className="fw-bold mb-0">{selectedPartner.capacity} bags</p>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Base Price</small>
                            <p className="fw-bold text-success mb-0 fs-5">₹{selectedPartner.base}/day</p>
                          </div>
                        </div>

                        <div className="mb-3 p-3 rounded-3" style={{ backgroundColor: "#f9fafb" }}>
                          <small className="text-muted fw-bold d-block mb-1">Rates Breakdown</small>
                          <div className="d-flex justify-content-between">
                            <span className="small">Extra Per Kg: <strong>₹{selectedPartner.perKg}</strong></span>
                            <span className="small">Extra Per Hour: <strong>₹{selectedPartner.perHour}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="alert alert-info mb-0 py-2 px-3" style={{ borderRadius: "10px" }}>
                        <small>
                          🛡️ Your luggage is insured up to ₹10,000 with 24/7 security.
                        </small>
                      </div>
                    </div>
                  </HoverCard>
                </StaggerItem>
              </div>

              {/* Booking Form Card */}
              <div className="col-md-7">
                <StaggerItem className="h-100">
                  <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '1.5rem', border: '1px solid #e5e7eb' }}>
                    <div className="card-body p-4">
                      <h5 className="fw-bold mb-4" style={{ color: '#0d2aabff' }}>Booking Details</h5>

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

                      <form onSubmit={handleBookingSubmit}>
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Estimated Weight (kg)</label>
                          <input
                            type="number"
                            className="form-control form-control-lg shadow-none"
                            name="weightKg"
                            value={bookingForm.weightKg}
                            onChange={handleInputChange}
                            placeholder="Enter total weight in kg (e.g. 5)"
                            min="1"
                            step="0.1"
                            style={{ borderRadius: "10px", fontSize: "1rem" }}
                            required
                          />
                          <small className="text-muted">Rate adjusted based on luggage weight</small>
                        </div>

                        <div className="mb-3">
                          <label className="form-label fw-semibold">Check-in Date & Time</label>
                          <input
                            type="datetime-local"
                            className="form-control form-control-lg shadow-none"
                            name="startAt"
                            value={bookingForm.startAt}
                            onChange={handleInputChange}
                            style={{ borderRadius: "10px", fontSize: "1rem" }}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label className="form-label fw-semibold">Check-out Date & Time</label>
                          <input
                            type="datetime-local"
                            className="form-control form-control-lg shadow-none"
                            name="endAt"
                            value={bookingForm.endAt}
                            onChange={handleInputChange}
                            style={{ borderRadius: "10px", fontSize: "1rem" }}
                            required
                          />
                        </div>

                        <div className="d-grid gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="btn btn-primary btn-lg fw-bold"
                            disabled={loading}
                            style={{
                              borderRadius: "12px",
                              background: "linear-gradient(135deg, #0d2aabff 0%, #081b70 100%)",
                              border: "none",
                              padding: "0.85rem"
                            }}
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Processing...
                              </>
                            ) : (
                              'Proceed to Payment →'
                            )}
                          </motion.button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary py-2"
                            onClick={() => navigate('/find-storage')}
                            style={{ borderRadius: "12px" }}
                          >
                            Choose Different Hotel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </StaggerItem>
              </div>
            </StaggerContainer>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {bookingCreated && !paymentSuccess && (
        <PaymentModal
          booking={bookingCreated}
          onPaymentSuccess={(details) => {
            setTransactionDetails(details);
            setPaymentSuccess(true);
            setBookingCreated(null);
          }}
          onClose={async () => {
            try {
              await bookingAPI.deleteBooking(bookingCreated._id);
            } catch (err) {
              console.error('Failed to delete booking:', err);
            }
            setBookingCreated(null);
          }}
        />
      )}

      {/* Payment Success Modal */}
      {paymentSuccess && transactionDetails && (
        <PaymentSuccessModal
          transactionDetails={transactionDetails}
          onClose={() => {
            setPaymentSuccess(false);
            setTransactionDetails(null);
          }}
        />
      )}
    </div>
  );
}

export default Booking;
