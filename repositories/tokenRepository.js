const { getDB } = require("../config/db");
// Imports the function to retrieve the Hyperbee database instance.

async function blacklistToken(token) {
  const db = getDB();
  // Retrieves the database instance.

  return await db.put("blacklist:" + token, {
    blacklisted: true,
    timestamp: new Date().toISOString(),
  });
  // Stores the token in the database under a key prefixed with "blacklist:".
  // Marks the token as blacklisted and records the current timestamp.
}

async function isTokenBlacklisted(token) {
  const db = getDB();
  // Retrieves the database instance.

  const result = await db.get("blacklist:" + token);
  // Checks the database for a blacklisted token entry.

  return result && result.value && result.value.blacklisted;
  // Returns true if the token is blacklisted; otherwise, false.
}

module.exports = {
  blacklistToken,
  isTokenBlacklisted,
};
// Exports functions to add to and check the token blacklist.
