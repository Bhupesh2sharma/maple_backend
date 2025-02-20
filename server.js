require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db"); // Import connectDB function
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const availabilityRoutes = require("./routes/availability.js");
const bookingRoutes = require("./routes/bookingRoutes");

// 🛠 Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

const allowedOrigins = [
    "http://localhost:3000",
    "https://maple-t-t.vercel.app",
    "https://maple-admin-ncu7.vercel.app"
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
};

app.use(cors(corsOptions));

// Routes
const packageRoutes = require("./routes/packageRoutes");
app.use("/api/packages", packageRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api", bookingRoutes);

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
