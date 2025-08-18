const userModel = require("../models/user.model"); // Import the user model
const userService = require("../services/user.service"); // Import the user service
const { validationResult } = require("express-validator"); // Import validation result handler
const blackListTokenModel = require("../models/blacklistToken.model"); // Import the blacklist token model

module.exports.registerUser = async ( req, res, next ) => {
    const error = validationResult(req); // Get validation errors from the request  
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() }); // If there are validation errors, return them
    }

    const { username, email, password } = req.body; // Destructure the request body to get user details

    const isUserExists = await userModel.findOne({ email }); // Check if a user with the given email already exists
    if (isUserExists) {
        return res.status(400).json({ message: "User already exists" }); // If user exists, return 400
    }

    const hashedPassword = await userModel.hashPassword(password); // Hash the password using the service

    const user = await userService.createUser({
        username,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken(); // Generate an authentication token for the user
    
    res.status(201).json({ token, user }); // Respond with the token and a 201 status code
}

module.exports.loginUser = async (req, res, next) => {
    const error = validationResult(req); // Get validation errors from the request
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() }); // If there are validation errors, return them
    }

    const { email, password } = req.body; // Destructure the request body to get login details

    const user = await userModel.findOne({ email }).select("+password"); // Find the user by email and include the password field in the result
    if (!user) {
        return res.status(401).json({ message: "Invalid Email and Password" }); // If user not found, return 401
    }

    const isMatch = await user.comparePassword(password); // Compare the provided password with the stored hashed password
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid Email and Password" }); // If password is invalid, return 401
    }

    const token = user.generateAuthToken(); // Generate an authentication token for the user
    res.cookie ("token", token); // Set the token as a cookie    

    res.status(200).json({ token, user }); // Respond with the token and a 200 status code
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user); // Respond with the user profile information attached to the request object
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie("token"); // Clear the authentication token cookie

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Get the token from cookies or headers

    await blackListTokenModel.create({ token }); // Add the token to the blacklist
    
    res.status(200).json({ message: "Logged out successfully" }); // Respond with a success message
}