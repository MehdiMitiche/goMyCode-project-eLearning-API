const express = require("express");
const progressionRouter = express.Router();

const progressionController = require("../../controllers/progression");

progressionRouter.put("/:courseId", progressionController.progress);
progressionRouter.get("/:courseId", progressionController.getProgression);
progressionRouter.post("/:courseId", progressionController.start);

module.exports = progressionRouter;
