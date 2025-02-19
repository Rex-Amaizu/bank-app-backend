// routes/exchangeRateRoutes.js

const express = require("express");
const router = express.Router();
const exchangeRateController = require("../controllers/exchangeRateController");
const { authenticateToken } = require("../middlewares/authMiddleware");

// GET /exchange-rates - Retrieve current exchange rates.
router.get("/", authenticateToken, exchangeRateController.getExchangeRates);

module.exports = router;
