// models/User.js

/**
 * User Model Class
 * Defines the structure and validation for a user object.
 */
class User {
  /**
   * Constructs a new User instance.
   * @param {Object} data - The user data.
   * @param {string} data.email - The username.
   * @param {string} data.firstName - The username.
   * @param {string} data.lastName - The username.
   * @param {string} data.password - The hashed password.
   * @param {string} [data.role] - The role of the user (e.g., "user" or "admin").
   * @param {string} [data.createdAt] - The creation timestamp (optional).
   */
  constructor({ email, firstName, lastName, password, role, createdAt }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.role = role || "user";
    this.createdAt = createdAt || new Date().toISOString();
  }

  /**
   * Validates the user data.
   * Throws an error if any required field is missing or invalid.
   * @param {Object} userData - The user data to validate.
   * @returns {boolean} - Returns true if valid.
   */
  static validate(userData) {
    if (!userData.email || typeof userData.email !== "string") {
      throw new Error("Invalid or missing 'email'.");
    }
    if (!userData.firstName || typeof userData.firstName !== "string") {
      throw new Error("Invalid or missing 'first name'.");
    }
    if (!userData.lastName || typeof userData.lastName !== "string") {
      throw new Error("Invalid or missing 'last name'.");
    }
    if (!userData.password || typeof userData.password !== "string") {
      throw new Error("Invalid or missing 'password'.");
    }
    return true;
  }

  /**
   * Returns a plain JSON representation of the User.
   * Useful when storing the data in Hyperbee.
   * @returns {Object} - The JSON representation of the user.
   */
  toJSON() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      role: this.role || "user",
      createdAt: this.createdAt,
    };
  }
}

module.exports = User;
