const Package = require("../models/Package");

// @desc  Create a new package
// @route POST /api/packages
const createPackage = async (req, res) => {
  try {
    const { title, description, price, duration, features, itinerary } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const newPackage = new Package({
      title,
      description,
      price,
      duration,
      features: JSON.parse(features),
      itinerary: JSON.parse(itinerary),
      imageUrl: req.file.path, // Cloudinary URL
    });

    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPackage };
