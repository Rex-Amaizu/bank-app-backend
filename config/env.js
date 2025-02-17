const dotenv = require("dotenv");
// Imports the 'dotenv' package, which loads environment variables from a .env file into process.env.

dotenv.config();
// Executes the configuration function. This loads the .env file's variables into process.env.

module.exports = {
  port: process.env.PORT || 3000,
  // Exports the server port. If no PORT variable is set in the environment, defaults to 3000.

  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  // Exports the secret key used to sign and verify JWT access tokens.

  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  // Exports the secret key used to sign and verify JWT refresh tokens.

  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || "15m",
  // Exports the expiration time for access tokens. Defaults to 15 minutes if not set.

  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  // Exports the expiration time for refresh tokens. Defaults to 7 days if not set.

  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,
  // Exports the number of salt rounds to use with bcrypt. Converts the environment variable to an integer or defaults to 10.

  hypercoreDataPath: process.env.HYPERCORE_DATA_PATH || "./data/feed",
  // Exports the file system path where hypercore data is stored. Defaults to './data/feed'.
};
