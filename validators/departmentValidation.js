const Joi = require("joi");
const { badRequestResponse } = require("../middleware/response");
exports.departmentValidation = (req, res, next) => {
  const departmentSchema = Joi.object({
    departmentName: Joi.string().required(),
    categoryName: Joi.string().required(),
    location: Joi.string().required(),
    salary: Joi.number().required(),
    employeeID: Joi.string().required(),
  });
  const { error } = departmentSchema.validate(req.body);
  if (!error) return next();
  const message = error.details.map((e) => e.message);
  return badRequestResponse(res, { message: message });
};
