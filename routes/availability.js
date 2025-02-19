const express = require("express");
const Availability = require('../models/availability.model.js');

const router = express.Router();

// Set Availability (Admin Only)
router.post('/set', async (req, res) => {
    const { date, isAvailable } = req.body;
    try {
        const existingDate = await Availability.findOne({ date });
        if (existingDate) {
            existingDate.isAvailable = isAvailable;
            await existingDate.save();
        } else {
            await Availability.create({ date, isAvailable });
        }
        res.json({ success: true, message: "Availability updated." });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get Available Dates (For Frontend Booking)
router.get('/available-dates', async (req, res) => {
    try {
        const availableDates = await Availability.find({ isAvailable: true }).select('date');
        res.json({ success: true, dates: availableDates.map(d => d.date) });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
