const router = require("express").Router();
const passport = require("passport");
const { googleCallback } = require("../controller/authController.js");

// STEP 1 — Redirect to Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// STEP 2 — Google redirects back here
router.get("/google/callback",passport.authenticate("google", { failureRedirect: "/login" }), googleCallback );

module.exports = router;
