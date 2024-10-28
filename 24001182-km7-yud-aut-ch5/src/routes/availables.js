const express = require("express");
const {
  validateGetAvailable,
  validateGetAvailableById,
  validateDeleteAvailableById,
  validateCreateAvailable,
  validateUpdateAvailable,
} = require("../middlewares/availablesValidation");
const {
  getAvailable,
  getAvailableById,
  deleteAvailableById,
  createAvailable,
  updateAvailable,
} = require("../controllers/availablesController");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole, superAdmin } = require("../constants/auth");

const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole, superAdmin), getAvailable)
  .post(
    authorization(adminRole, superAdmin),
    validateCreateAvailable,
    createAvailable
  );

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole, superAdmin),
    validateGetAvailableById,
    getAvailableById
  )
  .put(
    authorization(adminRole, superAdmin),
    validateUpdateAvailable,
    updateAvailable
  )
  .delete(
    authorization(adminRole, superAdmin),
    validateDeleteAvailableById,
    deleteAvailableById
  );

module.exports = router;
