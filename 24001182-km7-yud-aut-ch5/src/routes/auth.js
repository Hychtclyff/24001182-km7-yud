const express = require("express");
const {
  validateRegister,
  validateLogin,
  authorization,
  validateUpdateProfile,
} = require("../middlewares/auth");
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/auth");
const { adminRole, superAdmin, userRole } = require("../constants/auth");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get(
  "/profile",
  authorization(adminRole, superAdmin, userRole),
  getProfile
);
router.put(
  "/profile/:id",
  authorization(superAdmin),
  validateUpdateProfile,
  updateProfile
);

module.exports = router;
