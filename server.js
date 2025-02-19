require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const availabilityRoutes = require("./routes/availability.js");
const bookingRoutes = require("./routes/bookingRoutes");
// Middleware
app.use(express.json());
app.use(cors());

// Routes

const packageRoutes = require("./routes/packageRoutes");
app.use("/api/packages", packageRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api', bookingRoutes);
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
