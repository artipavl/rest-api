const express = require("express");
const ctrl = require("../../controllers").contacts;
const { isValidId, validateBody, authorization } = require("../../middlewares");
const { schemas } = require("../../models").contact;

const router = express.Router();

router.get("/", authorization, ctrl.listContacts);

router.get("/:contactId", authorization, isValidId, ctrl.getContactById);

router.post(
  "/",
  authorization,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authorization, isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  authorization,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authorization,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
