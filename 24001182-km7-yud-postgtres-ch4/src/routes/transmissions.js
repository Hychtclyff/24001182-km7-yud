const express = require("express");
const {
  validateGetTransmissions,
  validateGetTransmissionById,
  validateDeleteTransmissionById,
  validateCreateTransmission,
  validateUpdateTransmission,
} = require("../middlewares/transmissionsValidation"); // Pastikan path ini sesuai dengan lokasi middleware
const {
  getTransmissions,
  getTransmissionById,
  deleteTransmissionById,
  createTransmission,
  updateTransmission,
} = require("../controllers/transmissionsController"); // Pastikan path ini sesuai dengan lokasi controller

const router = express.Router();

router.get("/", getTransmissions);
// router.get("/search", validateGetTransmissions, getTransmissions);
router.post("/", validateCreateTransmission, createTransmission);
router.get("/:id", validateGetTransmissionById, getTransmissionById);
router.put("/:id", validateUpdateTransmission, updateTransmission);
router.delete("/:id", validateDeleteTransmissionById, deleteTransmissionById);

module.exports = router;
