const express = require("express");
// Imports the Express framework.

const router = express.Router();
// Creates a new Express router instance to define route endpoints.

const authController = require("../controllers/authController");
// Imports controller functions that handle authentication requests.

const { authenticateToken } = require("../middlewares/authMiddleware");
// Imports the authentication middleware that verifies JWT tokens.

router.post("/register", authController.register);
// Defines a POST endpoint for '/register' that calls the register controller function.

router.post("/login", authController.login);
// Defines a POST endpoint for '/login' that calls the login controller function.

router.post("/logout", authenticateToken, authController.logout);
// Defines a POST endpoint for '/logout'. This endpoint is protected by the authenticateToken middleware,
// ensuring that only authenticated requests can perform a logout.

router.post("/refresh-token", authController.refreshToken);
// Defines a POST endpoint for '/refresh-token' that calls the refreshToken controller function.

module.exports = router;
// Exports the router so it can be mounted in the main server file.
