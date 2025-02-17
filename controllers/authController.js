const authService = require("../services/authService");
// Imports authentication service functions that contain the business logic.

async function register(req, res, next) {
  try {
    const { email, firstName, lastName, role, password } = req.body;
    // Extracts the username and password from the request body.

    if (!email || !firstName || !lastName || !password) {
      return res.status(400).json({ error: "All fields required" });
      // If any field is missing, responds with a 400 Bad Request error.
    }
    const result = await authService.registerUser(
      email,
      firstName,
      lastName,
      password,
      role
    );
    // Calls the registerUser service function to handle user registration.

    res.status(201).json(result);
    // Sends a 201 Created response with the success message.
  } catch (err) {
    next(err);
    // Passes any errors to the global error handler.
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    // Extracts the username and password from the request body.

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
      // Responds with a 400 Bad Request error if either field is missing.
    }
    const tokens = await authService.loginUser(email, password);
    // Calls the loginUser service function to authenticate the user and generate tokens.

    res.status(200).json({ message: "Login successful", ...tokens });
    // Sends a 200 OK response with a success message and the generated tokens.
  } catch (err) {
    next(err);
    // Passes any errors to the global error handler.
  }
}

async function logout(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    // Retrieves the Authorization header from the request.

    const accessToken = authHeader.split(" ")[1];
    // Extracts the access token from the header.

    const { refreshToken } = req.body || {};
    // Optionally extracts the refresh token from the request body if provided.

    const result = await authService.logoutUser(accessToken, refreshToken);
    // Calls the logoutUser service function to blacklist the tokens.

    res.status(200).json(result);
    // Sends a 200 OK response with the logout success message.
  } catch (err) {
    next(err);
    // Passes any errors to the global error handler.
  }
}

async function refreshToken(req, res, next) {
  try {
    const { refreshToken } = req.body;
    // Extracts the refresh token from the request body.

    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is required" });
      // Responds with a 400 Bad Request error if the refresh token is missing.
    }
    const tokens = await authService.refreshAccessToken(refreshToken);
    // Calls the refreshAccessToken service function to generate new tokens.

    res
      .status(200)
      .json({ message: "Token refreshed successfully", ...tokens });
    // Sends a 200 OK response with a success message and the new tokens.
  } catch (err) {
    next(err);
    // Passes any errors to the global error handler.
  }
}

module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
// Exports the controller functions for use in route definitions.
