const express = require("express");
const {
  validateGetTransmissions,
  validateGetTransmissionById,
  validateDeleteTransmissionById,
  validateCreateTransmission,
  validateUpdateTransmission,
} = require("../middlewares/transmissionsValidation");
const {
  getTransmissions,
  getTransmissionById,
  deleteTransmissionById,
  createTransmission,
  updateTransmission,
} = require("../controllers/transmissionsController");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole, superAdmin } = require("../constants/auth");
const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole, superAdmin), getTransmissions)
  .post(
    authorization(adminRole, superAdmin),
    validateCreateTransmission,
    createTransmission
  );

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole, superAdmin),
    validateGetTransmissionById,
    getTransmissionById
  )
  .put(
    authorization(adminRole, superAdmin),
    validateUpdateTransmission,
    updateTransmission
  )
  .delete(
    authorization(adminRole, superAdmin),
    validateDeleteTransmissionById,
    deleteTransmissionById
  );

module.exports = router;
