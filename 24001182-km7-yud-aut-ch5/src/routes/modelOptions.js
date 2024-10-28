const express = require("express");
const {
  validateGetModelOptions,
  validateGetModelOptionsById,
  validateDeleteModelOptionsById,
  validateCreateModelOptions,
  validateUpdateModelOptions,
} = require("../middlewares/modelOptionsValidation");
const {
  getModelOptions,
  getModelOptionsById,
  deleteModelOptionsById,
  createModelOptions,
  updateModelOptions,
} = require("../controllers/modelOptionsController");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole, superAdmin } = require("../constants/auth");
const router = express.Router();

router
  .route("/")
  .get(
    authorization(adminRole, userRole, superAdmin),
    validateGetModelOptions,
    getModelOptions
  )
  .post(
    authorization(adminRole, superAdmin),
    validateCreateModelOptions,
    createModelOptions
  );

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole, superAdmin),
    validateGetModelOptionsById,
    getModelOptionsById
  )
  .put(
    authorization(adminRole, superAdmin),
    validateUpdateModelOptions,
    updateModelOptions
  )
  .delete(
    authorization(adminRole, superAdmin),
    validateDeleteModelOptionsById,
    deleteModelOptionsById
  );

module.exports = router;
