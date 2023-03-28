const { HttpError, sendEmail } = require("../../helpers");
const { User } = require("../../models").auth;

const { BASE_URL } = process.env;

const verify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw HttpError(404, "Not found");
  }

  if (user.verify) {
    throw HttpError(404, "Verification has already been passed");
  }

  await sendEmail({
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
  });

  res.json({
    message: "Verification email sent",
  });
};

module.exports = verify;
