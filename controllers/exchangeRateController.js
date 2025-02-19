// controllers/exchangeRateController.js

const exchangeRateService = require("../services/exchangeRateService");

/**
 * Retrieves current exchange rates.
 */
async function getExchangeRates(req, res, next) {
  try {
    const rates = await exchangeRateService.getExchangeRates();
    res.status(200).json(rates);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getExchangeRates,
};
