const express = require("express");
const ctrl = require("../../controllers").auth;
const { validateBody, authorization } = require("../../middlewares");
const { schemas } = require("../../models").auth;

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authorization, ctrl.current);

router.post("/logout", authorization, ctrl.logout);

router.patch("/", authorization, ctrl.updateSubscription);

module.exports = router;