// controllers/userController.js
const userService = require("../services/userService"); // Import the user service.

async function getAllUsers(req, res, next) {
  try {
    const users = await userService.getAllUsers(); // Retrieve all users.
    res.status(200).json(users); // Respond with the list of users.
  } catch (error) {
    next(error); // Pass errors to the global error handler.
  }
}

async function getUser(req, res, next) {
  try {
    const userId = req.params.userid; // Get the userid from the URL parameter.
    const user = await userService.getUserDetails(userId); // Retrieve the user details.
    res.status(200).json(user); // Respond with the user data.
  } catch (error) {
    next(error); // Pass errors to the global error handler.
  }
}

async function getUserByAdmin(req, res, next) {
  try {
    const userId = req.params.userid; // Extract userid from URL.
    const user = await userService.getUserDetails(userId); // Retrieve the user details.
    res.status(200).json(user); // Respond with the user data.
  } catch (error) {
    next(error); // Pass errors to the global error handler.
  }
}

async function updateUser(req, res, next) {
  try {
    const userId = req.params.userid; // Extract userid from URL.
    const updateData = req.body; // Extract update data from the request body.
    const updatedUser = await userService.updateUser(userId, updateData); // Update the user.
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    next(error); // Pass errors to the error handler.
  }
}

async function deleteUser(req, res, next) {
  try {
    const userId = req.params.userid; // Extract userid from URL.
    const isDeleted = await userService.deleteUser(userId); // Attempt deletion.

    if (isDeleted) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(400).json({ message: "Invalid user key: failed" });
    }
  } catch (error) {
    next(error); // Pass errors to the error handler.
  }
}

module.exports = {
  getAllUsers,
  getUser,
  getUserByAdmin,
  updateUser,
  deleteUser,
};
