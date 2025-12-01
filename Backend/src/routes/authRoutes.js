const router = require("express").Router();
const passport = require("passport");
const { googleCallback } = require("../controller/authController");

// Step 1 — send user to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2 — Google returns here
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback
);

module.exports = router;
