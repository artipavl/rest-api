const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");

const { User } = require("../models/auth");

const SECRET_KEY = process.env.SECRET_KEY;

const authorization = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    next(HttpError(401, "Not authorized"));
  }

  try {
    const { _id, email } = jwt.verify(token, SECRET_KEY);

    const user = await User.findOne({
      _id,
      email,
    });

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authorization;
