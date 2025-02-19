// services/accountService.js

const accountRepository = require("../repositories/accountRepository");
const Account = require("../models/Account");
const { updateAgeOnGet } = require("../utils/cache");

/**
 * Creates a new bank account.
 * @param {Object} accountData - Data for the new account.
 * @returns {Promise<Object>} - The created account.
 */
async function createAccount(accountData) {
  const accountNumber = await accountRepository.generateUniqueAccountNumber();
  // Validate required fields.
  const updatedActData = { ...accountData, accountNumber };
  Account.validate(updatedActData);
  // Create a new Account instance.
  const account = new Account(updatedActData);
  await accountRepository.createAccount(account);
  return account.toJSON();
}

/**
 * Retrieves all accounts for a given user.
 * @param {string} userId - The user ID.
 * @returns {Promise<Array>} - An array of accounts.
 */
async function getAccountsByUser(userId) {
  return await accountRepository.getAccountsByUser(userId);
}

/**
 * Retrieves details of a specific account.
 * @param {string} accountId - The account ID.
 * @returns {Promise<Object>} - The account details.
 */
async function getAccountDetails(accountId) {
  const accountRecord = await accountRepository.getAccountById(accountId);
  if (!accountRecord || !accountRecord.value) {
    throw { status: 404, message: "Account not found" };
  }
  return accountRecord.value;
}

/**
 * Updates an account.
 * @param {string} accountId - The account ID.
 * @param {Object} updateData - Data to update.
 * @returns {Promise<Object>} - The updated account.
 */
async function updateAccount(accountId, updateData) {
  return await accountRepository.updateAccount(accountId, updateData);
}

/**
 * Closes (deletes) an account.
 * @param {string} accountId - The account ID.
 * @returns {Promise} - Resolves upon deletion.
 */
async function closeAccount(accountId) {
  return await accountRepository.deleteAccount(accountId);
}

module.exports = {
  createAccount,
  getAccountsByUser,
  getAccountDetails,
  updateAccount,
  closeAccount,
};
