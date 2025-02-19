// services/exchangeRateService.js

const exchangeRateRepository = require("../repositories/exchangeRateRepository");

/**
 * Retrieves current exchange rates.
 * @returns {Promise<Object>} - An object with exchange rates.
 */
async function getExchangeRates() {
  return await exchangeRateRepository.getExchangeRates();
}

module.exports = {
  getExchangeRates,
};
