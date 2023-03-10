const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models").auth;
const { HttpError } = require("../../helpers");

const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const compare = await bcrypt.compare(password, user.password);

  if (!compare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    user: { email: user.email, subscription: user.subscription },
    token,
  });
};

module.exports = login;
