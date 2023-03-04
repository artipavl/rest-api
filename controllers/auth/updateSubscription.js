const { HttpError } = require("../../helpers");
const { User } = require("../../models/auth");

const subscriptionTypes = ["starter", "pro", "business"];

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.query;

  const validSubscription = subscription.toLowerCase().trim();

  // можливо includes зайвий бо "схема" і так повертає помилку
  if (!validSubscription || !subscriptionTypes.includes(validSubscription)) {
    throw HttpError(400, "Must be a valid subscription");
  }

  const user = await User.findByIdAndUpdate(
    _id,
    {
      subscription: validSubscription,
    },
    {
      new: true,
    }
  );

  res.json({
    user: { email: user.email, subscription: user.subscription },
  });
};

module.exports = updateSubscription;
