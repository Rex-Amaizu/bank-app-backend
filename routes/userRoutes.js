// routes/userRoutes.js

const express = require("express"); // Import Express.
const router = express.Router(); // Create a new router instance.
const userController = require("../controllers/userController"); // Import user controllers.
const { authenticateToken } = require("../middlewares/authMiddleware"); // Import JWT authentication middleware.
const adminMiddleware = require("../middlewares/adminMiddleware"); // Import admin-check middleware.

// User endpoints (require user specific privileges):
router.get("/users/:userid", authenticateToken, userController.getUser);
router.put("/users/:userid", authenticateToken, userController.updateUser);

// Admin endpoints (require admin privileges):
router.get(
  "/admin/users",
  authenticateToken,
  adminMiddleware,
  userController.getAllUsers
);
router.get(
  "/admin/users/:userid",
  authenticateToken,
  adminMiddleware,
  userController.getUserByAdmin
);
router.delete(
  "/admin/users/:userid",
  authenticateToken,
  adminMiddleware,
  userController.deleteUser
);
router.put(
  "/admin/users/:userid",
  authenticateToken,
  adminMiddleware,
  userController.updateUser
);

module.exports = router; // Export the router.
