// repositories/accountRepository.js

const { getDB } = require("../config/db"); // Get the Hyperbee database instance.
const Account = require("../models/Account"); // Import the Account model.

/**
 * Creates a new account in the database.
 * @param {Account|Object} accountData - A new Account instance or a plain object.
 * @returns {Promise} - Resolves when the account is stored.
 */
async function createAccount(accountData) {
  const db = getDB(); // Retrieve the Hyperbee instance.
  // If accountData is an instance of Account, convert it to JSON.
  const account =
    accountData instanceof Account ? accountData.toJSON() : accountData;
  // Store the account under a key prefixed with "account:".
  return await db.put("account:" + account.accountNumber, account);
}

async function generateUniqueAccountNumber() {
  const db = getDB();
  while (true) {
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
    const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    const accountNumber = `${timestamp}${randomPart}`; // 10-digit account number

    const existingAccount = await db.get(`account:${accountNumber}`);
    if (!existingAccount) {
      return accountNumber;
    }
  }
}
/**
 * Retrieves an account by accountId.
 * @param {string} accountId - The account ID.
 * @returns {Promise<Object>} - The account record.
 */
async function getAccountById(accountId) {
  const db = getDB();
  return await db.get("account:" + accountId);
}

/**
 * Retrieves all accounts for a given user.
 * @param {string} userId - The user's ID.
 * @returns {Promise<Array>} - An array of accounts.
 */
async function getAccountsByUser(userId) {
  const db = getDB();
  const accounts = [];
  // Create a read stream for keys starting with "account:".
  return new Promise((resolve, reject) => {
    const stream = db.createReadStream({
      gte: "account:",
      lt: "account:~",
    });
    stream.on("data", (data) => {
      // Push only accounts matching the userId.
      if (data.value.userId === userId) {
        accounts.push(data.value);
      }
    });
    stream.on("end", () => resolve(accounts));
    stream.on("error", (err) => reject(err));
  });
}

/**
 * Retrieves all accounts (for admin use).
 * @returns {Promise<Array>} - An array of all account objects.
 */
async function getAllAccounts() {
  const db = getDB();
  const accounts = [];
  return new Promise((resolve, reject) => {
    const stream = db.createReadStream({
      gte: "account:",
      lt: "account:~",
    });
    stream.on("data", (data) => accounts.push(data.value));
    stream.on("end", () => resolve(accounts));
    stream.on("error", (err) => reject(err));
  });
}

/**
 * Updates an account.
 * @param {string} accountId - The account ID.
 * @param {Object} updateData - Data to update.
 * @returns {Promise<Object>} - The updated account.
 */
async function updateAccount(accountId, updateData) {
  const db = getDB();
  const accountRecord = await db.get("account:" + accountId);
  if (!accountRecord || !accountRecord.value) {
    throw new Error("Account not found");
  }
  // Merge updateData with the existing account.
  const updatedAccount = { ...accountRecord.value, ...updateData };
  await db.put("account:" + accountId, updatedAccount);
  return updatedAccount;
}

/**
 * Deletes (closes) an account.
 * @param {string} accountId - The account ID.
 * @returns {Promise} - Resolves when deletion is complete.
 */
async function deleteAccount(accountId) {
  const db = getDB();
  return await db.del("account:" + accountId);
}

module.exports = {
  createAccount,
  getAccountById,
  getAccountsByUser,
  getAllAccounts,
  updateAccount,
  deleteAccount,
  generateUniqueAccountNumber,
};
