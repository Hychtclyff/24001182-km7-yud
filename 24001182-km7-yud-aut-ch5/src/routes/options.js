const express = require("express");
const optionsController = require("../controllers/optionsController");
const optionsValidation = require("../middlewares/optionsValidation");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole, superAdmin } = require("../constants/auth");
const router = express.Router();

router
  .route("/")
  .get(
    authorization(adminRole, userRole, superAdmin),
    optionsValidation.validateGetOptions,
    optionsController.getOptions
  )
  .post(
    authorization(adminRole, superAdmin),
    optionsValidation.validateCreateOptions,
    optionsController.createOptions
  );

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole, superAdmin),
    optionsValidation.validateGetOptionsById,
    optionsController.getOptionsById
  )
  .put(
    authorization(adminRole, superAdmin),
    optionsValidation.validateUpdateOptions,
    optionsController.updateOptions
  )
  .delete(
    authorization(adminRole, superAdmin),
    optionsValidation.validateDeleteOptionsById,
    optionsController.deleteOptionsById
  );

module.exports = router;
