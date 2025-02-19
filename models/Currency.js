// models/Currency.js

/**
 * Currency Model Class
 * Defines the structure for a supported currency.
 */
class Currency {
  /**
   * Constructs a new Currency instance.
   * @param {Object} data - The currency data.
   * @param {string} data.code - The currency code (e.g., USD, EUR).
   * @param {string} data.name - The full name of the currency.
   * @param {string} [data.symbol] - The symbol of the currency.
   * @param {string} [data.createdAt] - The creation timestamp.
   */
  constructor({ code, name, symbol, createdAt }) {
    this.code = code; // Set the currency code.
    this.name = name; // Set the full name.
    this.symbol = symbol;
    this.createdAt = createdAt || new Date().toISOString(); // Set creation time.
  }

  /**
   * Validates the currency data.
   * @param {Object} data - The currency data to validate.
   * @returns {boolean} - Returns true if valid.
   */
  static validate(data) {
    if (!data.code || typeof data.code !== "string") {
      throw new Error("Invalid or missing 'code'.");
    }
    if (!data.name || typeof data.name !== "string") {
      throw new Error("Invalid or missing 'name'.");
    }
    if (!data.symbol || typeof data.symbol !== "string") {
      throw new Error("Invalid or missing 'symbol'.");
    }
    return true;
  }

  /**
   * Returns a JSON representation of the currency.
   * @returns {Object} - The JSON representation.
   */
  toJSON() {
    return {
      code: this.code,
      name: this.name,
      symbol: this.symbol,
      createdAt: this.createdAt,
    };
  }
}

module.exports = Currency; // Export the Currency class.
