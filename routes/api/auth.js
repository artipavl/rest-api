const express = require("express");
const ctrl = require("../../controllers").auth;
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models").auth;

const router = express.Router();

router.post("/register", validateBody(schemas.addSchema), ctrl.register);

router.get("/login", ctrl.login);

// додати валідатор
router.post("/logout", ctrl.logout);

module.exports = router;
