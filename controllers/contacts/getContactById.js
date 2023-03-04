const { HttpError } = require("../../helpers");
const { Contact } = require("../../models").contact;

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne(
    { _id: contactId, owner },
    "-createdAt -updatedAt"
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getContactById;
