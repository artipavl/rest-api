const { HttpError } = require("../../helpers");
const { Contact } = require("../../models").contact;

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  // const result = await Contact.findByIdAndRemove(contactId);
  const result = await Contact.findOneAndRemove({ _id: contactId, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = removeContact;