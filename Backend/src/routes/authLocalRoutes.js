const router = require("express").Router();
const {
  registerUser,
  loginUser,
} = require("../controller/authLocalController");

// Register (email/password)
router.post("/register", registerUser);

// Login (email/password)
router.post("/login", loginUser);

module.exports = router;
