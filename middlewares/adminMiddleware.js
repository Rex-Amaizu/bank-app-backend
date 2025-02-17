// middlewares/adminMiddleware.js

const { getUserByUsername } = require("../repositories/userRepository");
// Import the user repository function to query the database.

const adminMiddleware = async (req, res, next) => {
  try {
    // Ensure req.user exists (set by the authentication middleware).
    if (!req.user || !req.user.email) {
      return res.status(403).json({ error: "Admin privileges required." });
    }

    // Query the database to get the latest user details.
    const userRecord = await getUserByUsername(req.user.email);

    // If no user is found or the user record does not have the expected structure.
    if (!userRecord || !userRecord.value) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the retrieved user's role is 'admin'.
    if (userRecord.value.role !== "admin") {
      return res.status(403).json({ error: "Admin privileges required." });
    }

    // Optionally, update req.user with the latest details.
    req.user = userRecord.value;

    next(); // User is admin, continue to the next middleware.
  } catch (error) {
    console.error("Error in admin middleware:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = adminMiddleware;
