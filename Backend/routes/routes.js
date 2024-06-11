const router = require("express").Router();
const controllers = require("../controllers");
const middlewares = require("../middleware");

const { signUp, logIn, verifyEmail, forgotPassword, resetPassword } =
  controllers.userAuth;
const { askAdvice } = controllers.askAdvice;
const { authMiddleware } = middlewares.authMiddleware;

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

//Protected Route
router.post("/ask-advice", authMiddleware, askAdvice);

module.exports = router;
