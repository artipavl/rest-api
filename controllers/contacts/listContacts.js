const { Contact } = require("../../models").contact;

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite = null } = req.query;
  const skip = (page - 1) * limit;

  // тут я ігнорую favorite якщо він прийшов пустий (помилуку при некоректному значенні поверне "схема")
  // const query = favorite !== null ? { owner, favorite } : { owner };

  // тут я ігнорую ісі неправельні записи у favorite (якщо не false або true то повертаю усі контакти)
  const query =
    favorite === "false" || favorite === "true"
      ? { owner, favorite }
      : { owner };
  
  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  });
  res.json(result);
};

module.exports = listContacts;
