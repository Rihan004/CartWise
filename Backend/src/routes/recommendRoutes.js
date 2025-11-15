const express = require("express");
const { getRecommendations } = require("../controller/recommendController");

const router = express.Router();

router.post("/", getRecommendations);

module.exports = router;
