const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const {
  jwtAccessSecret,
  jwtRefreshSecret,
  accessTokenExpiry,
  refreshTokenExpiry,
  bcryptSaltRounds,
} = require("../config/env");
const {
  createUser,
  getUserByUsername,
} = require("../repositories/userRepository");
const { blacklistToken } = require("../repositories/tokenRepository");
const blacklistCache = require("../utils/cache");
// const { createAccount } = require("./accountService");
// Imports the in-memory cache to optimize blacklist lookups.

// Helper function to generate both access and refresh tokens for a given payload.
function generateTokens(payload) {
  const accessToken = jwt.sign(payload, jwtAccessSecret, {
    expiresIn: accessTokenExpiry,
  });
  // Signs the payload with the access secret to create an access token with a specific expiration.

  const refreshToken = jwt.sign(payload, jwtRefreshSecret, {
    expiresIn: refreshTokenExpiry,
  });
  // Signs the payload with the refresh secret to create a refresh token with a longer expiration.

  return { accessToken, refreshToken };
  // Returns an object containing both tokens.
}

async function registerUser(email, firstName, lastName, password, role) {
  const existingUser = await getUserByUsername(email);
  // Checks if a user with the given username already exists.

  if (existingUser && existingUser.value) {
    throw { status: 409, message: "User already exists" };
    // Throws an error with status 409 (Conflict) if the user already exists.
  }

  const hashedPassword = await bcrypt.hash(password, bcryptSaltRounds);
  // Hashes the plain-text password using bcrypt with the specified number of salt rounds.

  const userData = {
    email,
    firstName,
    lastName,
    password: hashedPassword,
    role,
    createdAt: new Date().toISOString(),
  };
  // Constructs the user object with the username, hashed password, and a creation timestamp.

  User.validate(userData);
  const user = new User(userData);
  await createUser(user);
  // Stores the new user in the database.

  return { message: "User registered successfully" };
  // Returns a success message.
}

async function loginUser(email, password) {
  const userRecord = await getUserByUsername(email);
  // Retrieves the user record by username.

  if (!userRecord || !userRecord.value) {
    throw { status: 401, message: "Invalid credentials" };
    // Throws a 401 error if no user is found.
  }
  const user = userRecord.value;
  // Extracts the user data.

  const match = await bcrypt.compare(password, user.password);
  // Compares the provided password with the stored hashed password.

  if (!match) {
    throw { status: 401, message: "Invalid credentials" };
    // Throws a 401 error if the password does not match.
  }

  return generateTokens({ email });
  // Generates and returns access and refresh tokens if the credentials are valid.
}

async function logoutUser(accessToken, refreshToken) {
  await blacklistToken(accessToken);
  // Blacklists the access token persistently.

  blacklistCache.set(accessToken, true);
  // Caches the access token as blacklisted.

  if (refreshToken) {
    await blacklistToken(refreshToken);
    // If a refresh token is provided, blacklist it as well.

    blacklistCache.set(refreshToken, true);
    // Cache the refresh token as blacklisted.
  }
  return { message: "Logout successful" };
  // Returns a logout success message.
}

async function refreshAccessToken(refreshToken) {
  if (blacklistCache.has(refreshToken)) {
    throw { status: 401, message: "Refresh token is blacklisted" };
    // Checks if the refresh token is in the in-memory blacklist. If so, throws a 401 error.
  }

  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, jwtRefreshSecret, async (err, user) => {
      // Verifies the refresh token using the refresh secret.
      if (err) {
        return reject({
          status: 403,
          message: "Invalid or expired refresh token",
        });
        // Rejects the promise if the token is invalid or expired.
      }
      await blacklistToken(refreshToken);
      // Immediately blacklists the used refresh token to prevent reuse.

      blacklistCache.set(refreshToken, true);
      // Caches the refresh token as blacklisted.

      const tokens = generateTokens({ email: user.email });
      // Generates a new set of tokens using the username from the decoded token.

      resolve(tokens);
      // Resolves the promise with the new tokens.
    });
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
};
// Exports the authentication service functions to be used by the controllers.
