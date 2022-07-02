const mongoose = require("mongoose");
const Joi = require("joi");

/**
 * @swagger
 * definitions:
 *  Employee:
 *   properties:
 *    name:
 *     type: string
 *    email:
 *     type: string
 *    address:
 *     type: string
 *   required:
 *    - name
 *    - email
 *    - address
 */
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

exports.validateData = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(5).required().email(),
    address: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};

const Employee = mongoose.model("Employee", employeeSchema);
module.exports.Employee = Employee;
