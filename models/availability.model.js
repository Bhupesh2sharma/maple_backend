const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true }, // Store available dates
    isAvailable: { type: Boolean, default: true }, // Toggle manually
});

module.exports = mongoose.model('Availability', AvailabilitySchema);
