const express = require("express");
const {
  validateGetManufactures,
  validateGetManufactureById,
  validateDeleteManufactureById,
  validateCreateManufacture,
  validateUpdateManufacture,
} = require("../middlewares/manufacturesValidation");
const {
  getManufactures,
  getManufactureById,
  deleteManufactureById,
  createManufacture,
  updateManufacture,
} = require("../controllers/manufacturesController");

const router = express.Router();

router.get("/", getManufactures);
// router.get("/search", validateGetManufactures, getManufactures);
router.post("/", validateCreateManufacture, createManufacture);
router.get("/:id", validateGetManufactureById, getManufactureById);
router.put("/:id", validateUpdateManufacture, updateManufacture);
router.delete("/:id", validateDeleteManufactureById, deleteManufactureById);

module.exports = router;
