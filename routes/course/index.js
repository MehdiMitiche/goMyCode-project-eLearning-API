const express = require("express");
const courseRouter = express.Router();

const courseController = require("../../controllers/course");

courseRouter.get("/", courseController.getAll);
courseRouter.get("/:courseId", courseController.getCourse);
courseRouter.put("/:courseId", courseController.updateCourse);
courseRouter.delete("/:courseId", courseController.deleteCourse);

module.exports = courseRouter;
