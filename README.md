# Below is a list of all the dependencies used in the project along with the command to install them.

Dependencies
express
A minimal and flexible Node.js web application framework.

hypercore
Provides an append-only log, which serves as the underlying data structure for distributed storage.

hyperbee
A key–value store built on top of hypercore.

hyperswarm
Handles peer-to-peer discovery and replication.

jsonwebtoken
For creating and verifying JSON Web Tokens (JWT) used in authentication.

bcryptjs
For securely hashing and comparing user passwords.

dotenv
Loads environment variables from a .env file into process.env for secure configuration.

lru-cache
An in-memory Least Recently Used cache for optimizing token blacklist lookups.

Each file is organized in a modular fashion following best practices:

Configuration:
config/env.js loads environment variables, and config/db.js sets up the Hypercore/Hyperbee and Hyperswarm for distributed data storage.

Utilities:
utils/cache.js sets up an LRU cache to reduce repeated database lookups for blacklisted tokens.

Middlewares:
middlewares/authMiddleware.js and middlewares/errorHandler.js handle token authentication and global error handling, respectively.

Repositories:
repositories/userRepository.js and repositories/tokenRepository.js provide functions to interact with the database.

Services:
services/authService.js contains the business logic for user registration, login, logout, and token refresh.

Controllers & Routes:
controllers/authController.js and routes/authRoutes.js connect HTTP requests with the service functions.

Application Entry:
server.js initializes the database, configures middleware and routes, and starts the Express server.
