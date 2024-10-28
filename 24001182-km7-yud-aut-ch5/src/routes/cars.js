const express = require("express");
const carsController = require("../controllers/carsController");
const carsValidation = require("../middlewares/carsValidation");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole, superAdmin } = require("../constants/auth");
const router = express.Router();

router
  .route("/")
  .get(
    authorization(adminRole, userRole, superAdmin),
    carsValidation.validateGetCars,
    carsController.getCars
  )
  .post(
    authorization(adminRole, superAdmin),
    carsValidation.validateCreateCar,
    carsController.createCar
  );
router
  .route("/:id")
  .get(
    authorization(adminRole, userRole, superAdmin),
    carsValidation.validateGetCarById,
    carsController.getCarById
  )
  .put(
    authorization(adminRole, superAdmin),
    carsValidation.validateUpdateCarById,
    carsController.updateCarById
  )
  .delete(
    authorization(adminRole, superAdmin),
    carsValidation.validateDeleteCarById,
    carsController.deleteCarById
  );

module.exports = router;
