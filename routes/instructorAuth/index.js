const express = require("express");
const instructorAuthRouter = express.Router();

const instructorAuthController = require("../../controllers/instructorAuth");

instructorAuthRouter.post("/login", instructorAuthController.login);
instructorAuthRouter.post("/register", instructorAuthController.register);

module.exports = instructorAuthRouter;
