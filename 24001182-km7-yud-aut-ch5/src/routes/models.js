const express = require("express");
const {
  validateGetModels,
  validateGetModelById,
  validateDeleteModelById,
  validateCreateModel,
  validateUpdateModel,
} = require("../middlewares/modelsValidation");
const {
  getModels,
  getModelById,
  deleteModelById,
  createModel,
  updateModel,
} = require("../controllers/modelsControllers");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole, superAdmin } = require("../constants/auth");
const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(
    authorization(adminRole, userRole, superAdmin),
    validateGetModels,
    getModels
  )
  .post(authorization(adminRole, superAdmin), validateCreateModel, createModel);

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole, superAdmin),
    validateGetModelById,
    getModelById
  )
  .put(authorization(adminRole, superAdmin), validateUpdateModel, updateModel)
  .delete(
    authorization(adminRole, superAdmin),
    validateDeleteModelById,
    deleteModelById
  );

module.exports = router;
