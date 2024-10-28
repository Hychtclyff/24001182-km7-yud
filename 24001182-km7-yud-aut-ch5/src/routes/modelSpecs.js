const express = require("express");
const {
  validateGetModelSpecs,
  validateGetModelSpecsById,
  validateDeleteModelSpecsById,
  validateCreateModelSpecs,
  validateUpdateModelSpecs,
} = require("../middlewares/modelSpecsValidation");
const {
  getModelSpecs,
  getModelSpecsById,
  deleteModelSpecsById,
  createModelSpecs,
  updateModelSpecs,
} = require("../controllers/modelSpecsController");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole, superAdmin } = require("../constants/auth");
const router = express.Router();

router
  .route("/")
  .get(
    authorization(adminRole, userRole, superAdmin),
    validateGetModelSpecs,
    getModelSpecs
  )
  .post(
    authorization(adminRole, superAdmin),
    validateCreateModelSpecs,
    createModelSpecs
  );

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole, superAdmin),
    validateGetModelSpecsById,
    getModelSpecsById
  )
  .put(
    authorization(adminRole, superAdmin),
    validateUpdateModelSpecs,
    updateModelSpecs
  )
  .delete(
    authorization(adminRole, superAdmin),
    validateDeleteModelSpecsById,
    deleteModelSpecsById
  );

module.exports = router;
