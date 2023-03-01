const { User } = require("../../models").auth;
const jwt = require("jsonwebtoken");
const { HttpError } = require("../../helpers");

const logout = async (req, res) => {
  const [_, userId] = req.headers.authorization.split(" ");
  console.log(userId);
  const secret = process.env.SECRET;
  const decoded = jwt.verify(userId, secret);

  const result = await User.findOne({
    _id: decoded._id,
    email: decoded.email,
  });
  
  if (!result) {
    throw HttpError(401, "Not authorized");
  }
  res.status(204).json();
};

module.exports = logout;
