const express = require("express");
// Imports the Express framework.

const { initDB } = require("./config/db");
// Imports the database initialization function.

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");
const currencyRoutes = require("./routes/currencyRoutes");
const exchangeRateRoutes = require("./routes/exchangeRateRoutes");

const errorHandler = require("./middlewares/errorHandler");
// Imports the global error handler middleware.

const { port } = require("./config/env");
// Imports the port configuration from the environment settings.

const app = express();
// Creates an instance of the Express application.

app.use(express.json());
// Registers built-in middleware to parse incoming JSON request bodies.

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", accountRoutes);
app.use("/api/", currencyRoutes);
app.use("/api/exchange-rates", exchangeRateRoutes);
// Mounts the authentication routes at the 'api/auth' path.
// Any request to '/auth/...' will be handled by the authRoutes router.

app.use(errorHandler);
// Registers the global error handler middleware to catch unhandled errors.

initDB()
  // Initializes the Hyperbee database and joins the Hyperswarm.
  .then(() => {
    app.listen(port, () => {
      console.log(`Bank application backend running on port ${port}`);
      // Starts the server listening on the specified port and logs a confirmation message.
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    // Logs an error if the database initialization fails.

    process.exit(1);
    // Exits the process with a failure status code.
  });
