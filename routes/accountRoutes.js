// routes/accountRoutes.js

const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const { authenticateToken } = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

// User endpoints:
// POST /accounts - Create a new bank account.
router.post("/accounts", authenticateToken, accountController.createAccount);
// GET /accounts - Retrieve all accounts for the authenticated user.
router.get("/accounts", authenticateToken, accountController.getAccounts);
// GET /accounts/:accountid - Retrieve details of a specific account.
router.get(
  "/accounts/:accountid",
  authenticateToken,
  accountController.getAccount
);
// PUT /accounts/:accountid - Update account details.
router.put(
  "/accounts/:accountid",
  authenticateToken,
  accountController.updateAccount
);
// DELETE /accounts/:accountid - Close an account.
router.delete(
  "/accounts/:accountid",
  authenticateToken,
  accountController.closeAccount
);

// Admin endpoints for accounts:
// GET /admin/accounts - Get all accounts.
router.get(
  "/admin/accounts",
  authenticateToken,
  adminMiddleware,
  async (req, res, next) => {
    try {
      const accountRepository = require("../repositories/accountRepository");
      const accounts = await accountRepository.getAllAccounts();
      res.status(200).json(accounts);
    } catch (error) {
      next(error);
    }
  }
);
// PUT /admin/accounts/:accountid - Admin update of account details.
router.put(
  "/admin/accounts/:accountid",
  authenticateToken,
  adminMiddleware,
  accountController.updateAccount
);
// DELETE /admin/accounts/:accountid - Admin close of an account.
router.delete(
  "/admin/accounts/:accountid",
  authenticateToken,
  adminMiddleware,
  accountController.closeAccount
);

module.exports = router;
