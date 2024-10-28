const express = require("express");
const {
  validateGetTypes, // Mengubah validasi menjadi validateGetTypes
  validateGetTypeById, // Mengubah validasi menjadi validateGetTypeById
  validateDeleteTypeById, // Mengubah validasi menjadi validateDeleteTypeById
  validateCreateType, // Mengubah validasi menjadi validateCreateType
  validateUpdateType, // Mengubah validasi menjadi validateUpdateType
} = require("../middlewares/typesValidatiion"); // Mengubah dari manufacture ke type
const {
  getTypes, // Mengubah dari getManufactures menjadi getTypes
  getTypeById, // Mengubah dari getManufactureById menjadi getTypeById
  deleteTypeById, // Mengubah dari deleteManufactureById menjadi deleteTypeById
  createType, // Mengubah dari createManufacture menjadi createType
  updateType, // Mengubah dari updateManufacture menjadi updateType
} = require("../controllers/typesController"); // Mengubah dari manufactures ke types

const router = express.Router();

router.get("/", getTypes); // Mengubah dari getManufactures menjadi getTypes
// router.get("/search", validateGetTypes, getTypes); // Mengubah dari validateGetManufactures menjadi validateGetTypes
router.post("/", validateCreateType, createType); // Mengubah dari validateCreateManufacture menjadi validateCreateType
// router.get("/:id", validateGetTypeById, getTypeById); // Mengubah dari validateGetManufactureById menjadi validateGetTypeById
router.put("/:id", validateUpdateType, updateType); // Mengubah dari validateUpdateManufacture menjadi validateUpdateType
router.delete("/:id", validateDeleteTypeById, deleteTypeById); // Mengubah dari validateDeleteManufactureById menjadi validateDeleteTypeById

module.exports = router;
