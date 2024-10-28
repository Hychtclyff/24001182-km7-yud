const express = require("express");
const {
  validateGetSpecs,
  validateGetSpecById,
  validateDeleteSpecById,
  validateCreateSpec,
  validateUpdateSpec,
} = require("../middlewares/specsValidation");
const {
  getSpecs,
  getSpecById,
  deleteSpecById,
  createSpec,
  updateSpec,
} = require("../controllers/specsControllers");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole, superAdmin } = require("../constants/auth");
const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(
    authorization(adminRole, userRole, superAdmin),
    validateGetSpecs,
    getSpecs
  )
  .post(authorization(adminRole, superAdmin), validateCreateSpec, createSpec);

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole, superAdmin),
    validateGetSpecById,
    getSpecById
  )
  .put(authorization(adminRole, superAdmin), validateUpdateSpec, updateSpec)
  .delete(
    authorization(adminRole, superAdmin),
    validateDeleteSpecById,
    deleteSpecById
  );

module.exports = router;
