const mongoose = require("mongoose");

// Schema defines the structure of the document
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // You can add more fields as needed
  email: {
    type: String,
    required: false,
    unique: true,
  },
  verifiedEmail: {
    type: Boolean,
    default: false,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

// 'User' is the name of the collection in the database
const User = mongoose.model("User", userSchema);

module.exports = User;
