const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models").auth;
const { HttpError } = require("../../helpers");

const login = async (req, res) => {
  const result = await User.findOne({
    email: req.body.email,
  });

  if (!result) {
    throw HttpError(401, "Email or password is wrong");
  }

  const compare = await bcrypt.compare(req.body.password, result.password);

  if (!compare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const user = {
    email: result.email,
    subscription: result.subscription,
  };

  const payload = {
    _id: result._id,
    email: result.email,
  };

  const secret = process.env.SECRET;

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });

  res.json({ user, token });
};

module.exports = login;
