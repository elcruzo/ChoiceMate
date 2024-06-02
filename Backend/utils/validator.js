const Joi = require("joi");

const signUpValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
});

const logInValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const emailValidator = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  signUpValidator,
  logInValidator,
  emailValidator,
};
