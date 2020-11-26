const express = require("express");
const progressionRouter = express.Router();

const progressionController = require("../../controllers/progression");

progressionRouter.put("/progress", progressionController.progress);
progressionRouter.get("/:courseId", progressionController.getProgression);
progressionRouter.post("/start", progressionController.start);

module.exports = progressionRouter;
