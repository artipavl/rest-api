const { User } = require("../../models").auth;
const { HttpError } = require("../../helpers");

const current = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  res.json({
    email: user.email,
    subscription: user.subscription,
    avatarURL: user.avatarURL,
  });
};

module.exports = current;
