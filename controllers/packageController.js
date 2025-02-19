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
      imageUrl: `/uploads/${req.file.filename}`,
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
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc  Get a package by ID
// @route GET /api/packages/:id
const getPackageById = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) return res.status(404).json({ error: "Package not found" });

    res.json(package);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc  Update a package
// @route PUT /api/packages/:id
const updatePackage = async (req, res) => {
  try {
    const { title, description, price, duration, features, itinerary } = req.body;
    const updatedData = {
      title,
      description,
      price,
      duration,
      features: JSON.parse(features),
      itinerary: JSON.parse(itinerary),
    };

    if (req.file) {
      updatedData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedPackage = await Package.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedPackage) return res.status(404).json({ error: "Package not found" });

    res.json(updatedPackage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc  Delete a package
// @route DELETE /api/packages/:id
const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) return res.status(404).json({ error: "Package not found" });

    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage };
