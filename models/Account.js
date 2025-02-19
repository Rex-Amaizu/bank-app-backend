class Account {
  constructor({
    accountNumber,
    userId,
    accountName,
    accountType,
    currency,
    status,
    accountBalance,
    createdAt,
  }) {
    this.accountNumber = accountNumber;
    this.userId = userId;
    this.accountName = accountName;
    this.accountType = accountType;
    this.currency = currency;
    this.status = status || "open";
    this.accountBalance = 0;
    this.createdAt = createdAt || new Date().toISOString();
  }

  static validate(updatedActData) {
    if (
      !updatedActData.accountNumber ||
      typeof updatedActData.accountNumber !== "string"
    ) {
      throw new Error("Account number is required.");
    }
    if (!updatedActData.userId || typeof updatedActData.userId !== "string") {
      throw new Error("User Id is required.");
    }
    if (
      !updatedActData.accountName ||
      typeof updatedActData.accountName !== "string"
    ) {
      throw new Error("Account name is required.");
    }
    if (
      !updatedActData.accountType ||
      typeof updatedActData.accountType !== "string"
    ) {
      throw new Error("Account type is required.");
    }

    if (
      !updatedActData.currency ||
      typeof updatedActData.currency !== "string"
    ) {
      throw new Error("Currency is required.");
    }
    return true;
  }

  toJSON() {
    return {
      accountNumber: this.accountNumber,
      userId: this.userId,
      accountName: this.accountName,
      accountType: this.accountType,
      currency: this.currency,
      status: this.status,
      accountBalance: this.accountBalance,
      createdAt: this.createdAt,
    };
  }
}

module.exports = Account;
