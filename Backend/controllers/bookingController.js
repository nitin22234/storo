const Booking = require("../models/Booking");
const Partner = require("../models/Partner");
const User = require("../models/User");
const { calcPrice } = require("../utils/prIceCalc");

exports.createBooking = async (req, res) => {
  try {
    const { partnerId, weightKg, startAt, endAt, paymentMethod } = req.body;
    console.log("reached line 8");
    const partner = await Partner.findById(partnerId);
    if (!partner) return res.status(400).json({ error: "Partner not found" });

    const price = calcPrice(partner, weightKg, startAt, endAt);
    console.log("calculated price", price);
    // Set status based on payment method
    const bookingStatus = paymentMethod === 'pay-later' ? 'booked' : 'pending';
    const paymentStatus = paymentMethod === 'pay-later' ? 'pending' : 'pending';

    const booking = await Booking.create({
      user: req.user.id,
      partner: partnerId,
      weightKg,
      startAt,
      endAt,
      price,
      status: bookingStatus,
      paymentStatus: paymentStatus
    });
    console.log("booking created", booking)

    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    // Return ALL bookings (both past and future) for the user
    // Frontend will separate them into upcoming and previous
    const bookings = await Booking.find({
      user: req.user.id,
      status: { $in: ['booked', 'collected'] }
    })
      .populate('partner', 'name address')
      .sort({ createdAt: -1 });
    res.json(bookings);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;// booking id from url
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
    res.json(booking);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    // Verify the booking belongs to the user
    const booking = await Booking.findOne({ _id: bookingId, user: req.user.id });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await Booking.findByIdAndDelete(bookingId);
    res.json({ message: 'Booking deleted successfully' });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};
