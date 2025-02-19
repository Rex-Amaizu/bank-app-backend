const { getDB } = require("../config/db");
// Imports the function to retrieve the Hyperbee database instance.
const User = require("../models/User");

async function getUserByUsername(email) {
  const db = getDB();
  // Retrieves the database instance.

  const userRecord = await db.get("user:" + email);

  if (!userRecord) {
    return null; // Return null if no user is found.
  }

  return {
    key: "user:" + email,
    ...userRecord,
  };
  // Looks up and returns a user object stored under a key that prefixes the email with "user:".
}

async function createUser(userData) {
  const db = getDB();
  // Retrieves the database instance.

  // If userData is an instance of User, convert it to a plain JSON object.
  const user = userData instanceof User ? userData.toJSON() : userData;

  return await db.put("user:" + userData.email, user);
  // Stores the user data in the database using a key that starts with "user:" followed by the email.
}

async function getAllUsers() {
  const db = getDB(); // Get the Hyperbee instance.
  const users = []; // Array to hold user objects.
  // Create a read stream for keys that start with "user:".
  return new Promise((resolve, reject) => {
    const stream = db.createReadStream({
      gte: "user:", // Greater than or equal to "user:"
      lt: "user:~", // Less than "user:~" (ensures only keys starting with "user:" are returned)
    });
    // On receiving a data chunk, push the user value to the array.
    stream.on("data", (data) => {
      users.push({ key: data.key, ...data.value });
    });
    // On end, resolve the promise with the array of users.
    stream.on("end", () => resolve(users));
    // On error, reject the promise.
    stream.on("error", (err) => reject(err));
  });
}

async function updateUser(userId, updateData) {
  const db = getDB(); // Get the Hyperbee instance.
  // Retrieve the current user record.
  const userRecord = await db.get("user:" + userId);
  if (!userRecord || !userRecord.value) {
    throw new Error("User not found"); // Throw an error if the user does not exist.
  }
  // Merge the updateData with the existing user data.
  const updatedUser = { ...userRecord.value, ...updateData };
  // Store the updated user data.
  await db.put("user:" + userId, updatedUser);
  return updatedUser; // Return the updated user.
}

async function deleteUser(userId) {
  const db = getDB(); // Get the Hyperbee instance.
  const existingUser = await db.get("user:" + userId);
  if (!existingUser) {
    return false; // User does not exist, return failure.
  }

  await db.del("user:" + userId); // Delete the user.
  return true; //
}

module.exports = {
  getUserByUsername,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
// Exports the functions so they can be used by the service layer.
