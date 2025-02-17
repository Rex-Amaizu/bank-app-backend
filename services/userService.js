// services/userService.js

const userRepository = require("../repositories/userRepository"); // Import user repository.
const User = require("../models/User"); // Import the User model if needed for validation.

async function getAllUsers() {
  return await userRepository.getAllUsers(); // Delegate to the repository.
}

async function getUserDetails(userId) {
  const userRecord = await userRepository.getUserByUsername(userId);
  if (!userRecord) {
    throw { status: 404, message: "User not found" };
  }

  return userRecord; // Return the found user.
}

async function updateUser(userId, updateData) {
  // You might add further validation here.
  return await userRepository.updateUser(userId, updateData);
}

async function deleteUser(userId) {
  return await userRepository.deleteUser(userId);
}

module.exports = {
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
};
