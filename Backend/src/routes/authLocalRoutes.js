const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logoutUser
} = require("../controller/authLocalController");

// Register (email/password)
router.post("/register", registerUser);

// Login (email/password)
router.post("/login", loginUser);
// Unified Logout
router.post("/logout", logoutUser);

module.exports = router;
