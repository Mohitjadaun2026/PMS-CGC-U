const express = require("express"); // Import Express framework
const router = express.Router(); // Create a new router instance
const { body } = require("express-validator"); // Import validation middleware from express-validator
const userController = require("../controllers/userControllers"); // Import the user controller
const authMiddleware = require("../middlewares/authMiddleware"); // Import the authentication middleware

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 2 })
      .withMessage("Username must be at least 2 characters long"),
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser // Use the registerUser controller for this route
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Must be a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.loginUser // Use the loginUser controller for this route
);

router.get(
  "/profile",
  authMiddleware.authUser,
  userController.getUserProfile // Use the getUserProfile controller for this route
);

router.get("/logout", authMiddleware.authUser, userController.logoutUser);

module.exports = router; // Export the router for use in other files
