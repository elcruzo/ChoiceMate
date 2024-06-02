const jwt = require("jsonwebtoken");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


// Generate a JWT token
function generateToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
}

// Verify a JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    // Handle token verification error
    console.error("Token verification failed:", error.message);
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
