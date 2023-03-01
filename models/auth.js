const mongoose = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  password: Joi.string().required("Set password for user"),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required("Email is required"),
});



const schemas = {
  addSchema,
};

const User = mongoose.model("user", userSchema);

module.exports = { User, schemas };
