const express = require("express");
const ctrl = require("../../controllers").auth;
const { validateBody, authorization, upload } = require("../../middlewares");
const { schemas } = require("../../models").auth;

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post("/verify", validateBody(schemas.verifySchema), ctrl.verify);

router.get("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authorization, ctrl.current);

router.post("/logout", authorization, ctrl.logout);

router.patch("/", authorization, ctrl.updateSubscription);

router.patch(
  "/avatars",
  authorization,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
