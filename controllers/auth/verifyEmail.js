const { HttpError } = require("../../helpers");
const { User } = require("../../models").auth;

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const result = await User.findOne({ verificationToken });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  await User.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: "",
      verify: true,
    }
  );

  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
