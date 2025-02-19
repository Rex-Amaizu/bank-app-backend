// controllers/accountController.js

const accountService = require("../services/accountService");
const userService = require("../services/userService");

/**
 * Creates a new bank account for the authenticated user.
 */
async function createAccount(req, res, next) {
  try {
    // Use req.user (populated by auth middleware) as the owner.
    const userId = req.user.email; // or req.user.id based on your token structure.
    const user = await userService.getUserDetails(userId);

    const accountName = user.value.firstName + " " + user.value.lastName;
    const accountData = { ...req.body, userId, accountName }; // Merge userId into the request body.
    const account = await accountService.createAccount(accountData);
    res.status(201).json({ message: "Account created successfully", account });
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves all accounts for the authenticated user.
 */
async function getAccounts(req, res, next) {
  try {
    const userId = req.user.email;
    const accounts = await accountService.getAccountsByUser(userId);
    res.status(200).json(accounts);
  } catch (error) {
    next(error);
  }
}

/**
 * Retrieves details of a specific account.
 */
async function getAccount(req, res, next) {
  try {
    const accountId = req.params.accountid;
    const account = await accountService.getAccountDetails(accountId);
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
}

/**
 * Updates account details.
 */
async function updateAccount(req, res, next) {
  try {
    const accountId = req.params.accountid;
    const updatedAccount = await accountService.updateAccount(
      accountId,
      req.body
    );
    res.status(200).json({
      message: "Account updated successfully",
      account: updatedAccount,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Closes (deletes) an account.
 */
async function closeAccount(req, res, next) {
  try {
    const accountId = req.params.accountid;
    await accountService.closeAccount(accountId);
    res.status(200).json({ message: "Account closed successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  closeAccount,
};
