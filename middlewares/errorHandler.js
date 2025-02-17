function errorHandler(err, req, res, next) {
  console.error("Unhandled error:", err);
  // Logs any unhandled errors to the console for debugging.

  res.status(err.status || 500).json({
    error: err.message || "An unexpected error occurred",
  });
  // Sends an error response. Uses a custom status if provided, otherwise defaults to 500.
}

module.exports = errorHandler;
// Exports the errorHandler middleware so it can be added to the Express application.
