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
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole, superAdmin } = require("../constants/auth");
const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole, superAdmin), getManufactures)
  .post(
    authorization(adminRole, superAdmin),
    validateCreateManufacture,
    createManufacture
  );

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole, superAdmin),
    validateGetManufactureById,
    getManufactureById
  )
  .put(
    authorization(adminRole, superAdmin),
    validateUpdateManufacture,
    updateManufacture
  )
  .delete(
    authorization(adminRole, superAdmin),
    validateDeleteManufactureById,
    deleteManufactureById
  );

// router.get("/search", validateGetManufactures, getManufactures);

module.exports = router;
