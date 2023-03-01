const bcrypt = require("bcryptjs");

const { User } = require("../../models").auth;

const register = async (req, res) => {
  const { email, password } = req.body;

  const salt = Number(process.env.SALT_ROUNDS);

  const passwordHesh = await bcrypt.hash(password, salt);

  const result = await User.create({ email, password: passwordHesh });

  const user = {
    email: result.email,
    subscription: result.subscription,
  };
  
  res.status(201).json({ user });
};

module.exports = register;
