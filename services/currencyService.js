// services/currencyService.js

const currencyRepository = require("../repositories/currencyRepository");
const Currency = require("../models/Currency");

/**
 * Creates a new currency.
 * @param {Object} currencyData - Data for the new currency.
 * @returns {Promise<Object>} - The created currency.
 */
async function createCurrency(currencyData) {
  Currency.validate(currencyData);
  const currency = new Currency(currencyData);
  await currencyRepository.createCurrency(currency);
  return currency.toJSON();
}

/**
 * Retrieves all supported currencies.
 * @returns {Promise<Array>} - An array of currencies.
 */
async function getAllCurrencies() {
  return await currencyRepository.getAllCurrencies();
}

/**
 * Updates a currency.
 * @param {string} code - The currency code.
 * @param {Object} updateData - Data to update.
 * @returns {Promise<Object>} - The updated currency.
 */
async function updateCurrency(code, updateData) {
  return await currencyRepository.updateCurrency(code, updateData);
}

/**
 * Deletes a currency.
 * @param {string} code - The currency code.
 * @returns {Promise} - Resolves upon deletion.
 */
async function deleteCurrency(code) {
  return await currencyRepository.deleteCurrency(code);
}

module.exports = {
  createCurrency,
  getAllCurrencies,
  updateCurrency,
  deleteCurrency,
};
