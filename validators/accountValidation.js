const Joi = require("joi");
const { badRequestResponse } = require("../middleware/response");
exports.registerValidation = (req, res, next) => {
  const userSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(8).max(20),
    confirmPassword: Joi.ref("password"),
    role: Joi.string().required(),
  });
  const { error } = userSchema.validate(req.body);
  if (!error) return next();
  const message = error.details.map((e) => e.message);
  return badRequestResponse(res, { message: message });
};
exports.loginValidation = (req, res, next) => {
  const userSchema = Joi.object({
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(8).max(20),
  });
  const { error } = userSchema.validate(req.body);
  if (!error) return next();
  const message = error.details.map((e) => e.message);
  return badRequestResponse(res, { message: message });
};
