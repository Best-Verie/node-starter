const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { RoleEnum } = require("../enum/enums");
// require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *     required:
 *       - firstName
 *       - lastName
 *       - email
 *       - password
 */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "secret");
  return token;
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return await bcrypt.compare(candidatePassword, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

exports.validateData = (data, action) => {
  const schema =
    action === "login"
      ? Joi.object({
          email: Joi.string().min(5).required().email(),
          password: Joi.string().min(5).required(),
        })
      : Joi.object({
          firstName: Joi.string().min(3).required(),
          lastName: Joi.string().min(3).required(),
          email: Joi.string().min(5).required().email(),
          password: Joi.string().min(5).required(),
        });
  return schema.validate(data);
};

const User = mongoose.model("User", userSchema);
module.exports.User = User;
