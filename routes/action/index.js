const express = require("express");
const actionRouter = express.Router();

const actionController = require("../../controllers/action");

actionRouter.put("/like", actionController.like);
actionRouter.get("/dislike", actionController.dislike);
actionRouter.put("/addFavourite", actionController.addFavourite);
actionRouter.delete("/removeFavourite", actionController.removeFavourite);

module.exports = actionRouter;
