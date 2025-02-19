// routes/currencyRoutes.js

const express = require("express");
const router = express.Router();
const currencyController = require("../controllers/currencyController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// Admin endpoints for currencies:
// POST /admin/currencies - Create a new currency.
router.post(
  "/admin/currencies",
  authenticateToken,
  adminMiddleware,
  currencyController.createCurrency
);
// PUT /admin/currencies - Update a currency.
router.put(
  "/admin/currencies",
  authenticateToken,
  adminMiddleware,
  currencyController.updateCurrency
);
// DELETE /admin/currencies - Delete a currency.
router.delete(
  "/admin/currencies",
  authenticateToken,
  adminMiddleware,
  currencyController.deleteCurrency
);

// Public endpoint for authenticated users:
// GET /currencies - Get a list of supported currencies.
router.get("/currencies", authenticateToken, currencyController.getCurrencies);

module.exports = router;
