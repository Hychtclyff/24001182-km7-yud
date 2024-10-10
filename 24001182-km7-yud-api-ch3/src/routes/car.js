const express = require("express");
const {
  validateGetCars,
  validateGetCarById,
    validateDeleteCarById,
  validateCreateCar,
    validateUpdateCar,
} = require("../middlewares/cars");
const {
  getCars,
   getCarById,
    deleteCarById,
  createCar,
    updateCar,
} = require("../controllers/cars");

const router = express.Router();

router.get("/search", validateGetCars, getCars);
router.get("/", getCars);
router.post("/create", validateCreateCar, createCar);
router.get("/:id", validateGetCarById, getCarById);
router.put("/:id", validateUpdateCar, updateCar);
router.delete("/:id", validateDeleteCarById, deleteCarById);

module.exports = router;
