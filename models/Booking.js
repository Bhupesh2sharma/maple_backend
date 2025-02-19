const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  package: { type: String, required: true },
  date: { type: Date, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  cardName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
