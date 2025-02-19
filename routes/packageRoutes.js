const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage } = require("../controllers/packageController");

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Package Routes
router.post("/", upload.single("image"), createPackage);
router.get("/", getAllPackages);
router.get("/:id", getPackageById);
router.put("/:id", upload.single("image"), updatePackage);
router.delete("/:id", deletePackage);

module.exports = router;
