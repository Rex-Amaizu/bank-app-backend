const jwt = require("jsonwebtoken");
// Imports the jsonwebtoken package to verify and decode JWT tokens.

const { jwtAccessSecret } = require("../config/env");
// Imports the JWT access secret from the environment configuration.

const { getDB } = require("../config/db");
// Imports the function to retrieve the Hyperbee database instance.

const blacklistCache = require("../utils/cache");
// Imports the LRU cache instance used to store recently blacklisted tokens.

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // Retrieves the 'Authorization' header from the request.

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
    // If the header is missing, sends a 401 Unauthorized response.
  }

  const token = authHeader.split(" ")[1];
  // Splits the header value (expected to be "Bearer <token>") and extracts the token.

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
    // If the token is missing, sends a 401 Unauthorized response.
  }

  if (blacklistCache.has(token)) {
    return res.status(401).json({ error: "Token is blacklisted" });
    // Checks the in-memory cache to see if the token is blacklisted.
  }

  try {
    const db = getDB();
    // Retrieves the Hyperbee database instance.

    const blacklisted = await db.get("blacklist:" + token);
    // Looks up the token in the persistent store with a key prefixed by "blacklist:".

    if (blacklisted && blacklisted.value && blacklisted.value.blacklisted) {
      blacklistCache.set(token, true);
      // Caches the result to avoid future database lookups.

      return res.status(401).json({ error: "Token is blacklisted" });
      // If the token is found to be blacklisted, sends a 401 Unauthorized response.
    }
  } catch (err) {
    console.error("Error checking token blacklist:", err);
    // Logs the error if something goes wrong while checking the token.

    return res.status(500).json({ error: "Internal server error" });
    // Sends a 500 Internal Server Error response.
  }

  jwt.verify(token, jwtAccessSecret, (err, user) => {
    // Verifies the token using the JWT access secret.
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
      // If verification fails (invalid or expired token), sends a 403 Forbidden response.
    }
    req.user = user;
    // If verification succeeds, attaches the decoded user payload to the request object.

    next();
    // Calls the next middleware function in the Express pipeline.
  });
}

module.exports = {
  authenticateToken,
};
// Exports the authenticateToken middleware for use in routes.
