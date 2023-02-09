const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.string().min(5).max(30),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await getContactById(contactId);
    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const { error } = schema.validate({ name, email, phone });
    if (error) {
      error.status = 400;
      throw error;
    }
    const body = { name, email, phone };
    const data = await addContact(body);
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await removeContact(contactId);
    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const { error } = schema.validate({ name, email, phone });
    if (error) {
      error.status = 400;
      throw error;
    }
    const body = { name, email, phone };
    const data = await updateContact(contactId, body);
    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
