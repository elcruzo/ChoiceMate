const utils = require("../utils");
const { verifyToken } = utils.jwt;


// Middleware to verify the token
// The Token is sent in the header of the request
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(403).json({ error: "UNAUTHORIZED" });
  }
  try {
    //verify the token
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "INVALID TOKEN" });
  }
};

module.exports = { authMiddleware };
