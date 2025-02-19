const express = require("express");
const router = express.Router();
// Creates a new Express router instance to define route endpoints.
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authenticateToken, authController.logout);
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
