// repositories/exchangeRateRepository.js

/**
 * Dummy function to simulate fetching current exchange rates.
 * In a production system, this might call an external API.
 * @returns {Promise<Object>} - An object containing exchange rate data.
 */
async function getExchangeRates() {
  // Simulated exchange rate data.
  const rates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    NGN: 380,
  };
  return rates;
}

module.exports = {
  getExchangeRates,
};
