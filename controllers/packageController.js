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

// @desc  Get all packages
// @route GET /api/packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc  Get a single package by id
// @route GET /api/packages/:id
const getPackageById = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json(pkg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc  Update a package
// @route PUT /api/packages/:id
const updatePackage = async (req, res) => {
  try {
    const { title, description, price, duration, features, itinerary } = req.body;

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = price;
    if (duration !== undefined) updates.duration = duration;
    if (features !== undefined) updates.features = JSON.parse(features);
    if (itinerary !== undefined) updates.itinerary = JSON.parse(itinerary);
    if (req.file) updates.imageUrl = req.file.path; // new Cloudinary URL

    const pkg = await Package.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json(pkg);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc  Delete a package
// @route DELETE /api/packages/:id
const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.status(200).json({ message: "Package deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
