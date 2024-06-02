const models = require("../models");

const User = models.userModel;
const utils = require("../utils");
const { hashPassword, comparePassword } = utils.hash;
const { signUpValidator, logInValidator, emailValidator } = utils.validator;
const { generateToken, verifyToken } = utils.jwt;
const { sendSignUpEmail, sendResetLink } = utils.nodemailer;

// This function is used to register a new user
//signup
const signUp = async (req, res) => {
  try {
    const { error, value } = signUpValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: "Invalid Request" });
    }
    const { email, password, username } = value;
    //Check if a user is already registered in the database
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ error: "User with this email already exists" });
      } else if (existingUser.username === username) {
        return res.status(400).json({ error: "Username already taken" });
      }
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    //replace the plain password with the hash
    value.password = hashedPassword;

    const token = generateToken(value);

    const newUser = await User.create(value);
    if (!newUser) {
      return res.status(400).json({ error: "Sign up failed" });
    }
    sendSignUpEmail(email, token);
    //respond to the front-end with these details
    return res.status(201).json({
      User: {
        email: newUser.email,
        username: newUser.username,
        created_at: newUser.created_at,
      },
      token: token,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//LOGIN
const logIn = async (req, res) => {
  try {
    const { error, value } = logInValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: "Invalid Request" });
    }
    const { email, password } = value;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = generateToken(value);

    return res.status(200).json({
      User: {
        email: user.email,
        username: user.username,
        created_at: user.created_at,
      },
      token: token,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//verify email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(400).json({ error: "Invalid Token" });
    }
    const { email } = decoded;
    const user = await User.findOneAndUpdate(
      { email: email },
      { verifiedEmail: true }
    );
    if (!user) {
      return res.status(400).json({ error: "Invalid Token" });
    }

    return res.status(200).json({ message: "Email Verified" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//forgot password
const forgotPassword = async (req, res) => {
  try {
    const { error, value } = emailValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: "Invalid Request" });
    }
    const { email } = value;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid Email" });
    }
    const token = generateToken(value);
    sendResetLink(email, token);

    return res.status(200).json({ message: "Reset Link Sent" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//reset password
const resetPassword = async (req, res) => {
  try {

    //frontend will send the token in the query and the new password in the body after verifying the password
    //and comfirm password are the same
    const { token } = req.query;
    const { password } = req.body;
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(400).json({ error: "Invalid Token" });
    }
    const passwordHash = await hashPassword(password);
    const { email } = decoded;

    const user = await User.findOneAndUpdate(
      { email },
      { password: passwordHash }
    );
    if (!user) {
      return res.status(400).json({ error: "Invalid Token" });
    }

    return res.status(200).json({ message: "Password Reset Successful" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(err.message);
  }
};

module.exports = {
  signUp,
  logIn,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
