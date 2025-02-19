// repositories/currencyRepository.js

const { getDB } = require("../config/db"); // Get the database instance.
const Currency = require("../models/Currency"); // Import the Currency model.

/**
 * Creates a new currency.
 * @param {Currency|Object} currencyData - A Currency instance or a plain object.
 * @returns {Promise} - Resolves when the currency is stored.
 */
async function createCurrency(currencyData) {
  const db = getDB();
  const currency =
    currencyData instanceof Currency ? currencyData.toJSON() : currencyData;
  // Store under "currency:{code}"
  return await db.put("currency:" + currency.code, currency);
}

/**
 * Retrieves a currency by its code.
 * @param {string} code - The currency code.
 * @returns {Promise<Object>} - The currency record.
 */
async function getCurrencyByCode(code) {
  const db = getDB();
  return await db.get("currency:" + code);
}

/**
 * Retrieves all currencies.
 * @returns {Promise<Array>} - An array of all currencies.
 */
async function getAllCurrencies() {
  const db = getDB();
  const currencies = [];
  return new Promise((resolve, reject) => {
    const stream = db.createReadStream({
      gte: "currency:",
      lt: "currency:~",
    });
    stream.on("data", (data) => currencies.push(data.value));
    stream.on("end", () => resolve(currencies));
    stream.on("error", (err) => reject(err));
  });
}

/**
 * Updates a currency.
 * @param {string} code - The currency code.
 * @param {Object} updateData - Data to update.
 * @returns {Promise<Object>} - The updated currency.
 */
async function updateCurrency(code, updateData) {
  const db = getDB();
  const currencyRecord = await db.get("currency:" + code);
  if (!currencyRecord || !currencyRecord.value) {
    throw new Error("Currency not found");
  }
  const updatedCurrency = { ...currencyRecord.value, ...updateData };
  await db.put("currency:" + code, updatedCurrency);
  return updatedCurrency;
}

/**
 * Deletes a currency.
 * @param {string} code - The currency code.
 * @returns {Promise} - Resolves when deletion is complete.
 */
async function deleteCurrency(code) {
  const db = getDB();
  return await db.del("currency:" + code);
}

module.exports = {
  createCurrency,
  getCurrencyByCode,
  getAllCurrencies,
  updateCurrency,
  deleteCurrency,
};
