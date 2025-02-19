// controllers/currencyController.js

const currencyService = require("../services/currencyService");

/**
 * Creates a new supported currency (admin only).
 */
async function createCurrency(req, res, next) {
  try {
    const currency = await currencyService.createCurrency(req.body);
    res
      .status(201)
      .json({ message: "Currency created successfully", currency });
  } catch (error) {
    next(error);
  }
}

/**
 * Updates an existing currency (admin only).
 */
async function updateCurrency(req, res, next) {
  try {
    // Assume the currency code is provided in req.body.
    const { code } = req.body;
    const updatedCurrency = await currencyService.updateCurrency(
      code,
      req.body
    );
    res
      .status(200)
      .json({
        message: "Currency updated successfully",
        currency: updatedCurrency,
      });
  } catch (error) {
    next(error);
  }
}

/**
 * Deletes a currency (admin only).
 */
async function deleteCurrency(req, res, next) {
  try {
    // Assume the currency code is provided in req.body.
    const { code } = req.body;
    await currencyService.deleteCurrency(code);
    res.status(200).json({ message: "Currency deleted successfully" });
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves all supported currencies.
 */
async function getCurrencies(req, res, next) {
  try {
    const currencies = await currencyService.getAllCurrencies();
    res.status(200).json(currencies);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createCurrency,
  updateCurrency,
  deleteCurrency,
  getCurrencies,
};
