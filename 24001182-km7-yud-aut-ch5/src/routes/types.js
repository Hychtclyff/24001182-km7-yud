const express = require("express");
const {
  validateGetTypes,
  validateGetTypeById,
  validateDeleteTypeById,
  validateCreateType,
  validateUpdateType,
} = require("../middlewares/typesValidatiion");
const {
  getTypes,
  getTypeById,
  deleteTypeById,
  createType,
  updateType,
} = require("../controllers/typesController");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole, superAdmin } = require("../constants/auth");
const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole, superAdmin), getTypes)
  .post(authorization(adminRole, superAdmin), validateCreateType, createType);

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole, superAdmin),
    validateGetTypeById,
    getTypeById
  )
  .put(authorization(adminRole, superAdmin), validateUpdateType, updateType)
  .delete(
    authorization(adminRole, superAdmin),
    validateDeleteTypeById,
    deleteTypeById
  );

module.exports = router;
