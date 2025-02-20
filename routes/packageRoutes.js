const express = require("express");
const upload = require("../config/multerConfig");
const { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage } = require("../controllers/packageController");

const router = express.Router();

// Route to create a package with an image upload
router.post("/", upload.single("image"), createPackage);

// Other routes
router.get("/", getAllPackages);
router.get("/:id", getPackageById);
router.put("/:id", upload.single("image"), updatePackage);
router.delete("/:id", deletePackage);

module.exports = router;
