const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { HttpError } = require("../../helpers");


const { User } = require("../../models").auth;

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }

  
  const passwordHesh = await bcrypt.hash(password, SALT_ROUNDS);
  
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: passwordHesh,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = register;
