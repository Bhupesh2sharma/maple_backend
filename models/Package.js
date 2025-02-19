const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  features: { type: [String], required: true },
  itinerary: { type: [String], required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Package", PackageSchema);
