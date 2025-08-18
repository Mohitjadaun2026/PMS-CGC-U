const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing   
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token generation

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false  }, // Password field is not returned by default in queries
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
  });
  return token;
};

userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt
  return hashedPassword; // Return the hashed password
};  

const userModel = mongoose.model("user", userSchema);

/* 🔍 Explanation:
✅ mongoose.model("User", userSchema)
This creates a model named "User" based on a schema you defined earlier (probably userSchema).
Think of it like this:
“Hey Mongoose, I want a collection called Users, and it should follow this schema.”

🔁 Behind the scenes:
It will automatically create a MongoDB collection named users (Mongoose pluralizes the name).
The model gives you access to methods like .find(), .create(), .save() for that collection.
*/

module.exports = userModel; // Export the user model