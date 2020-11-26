const express = require("express");
const instructorRouter = express.Router();

const instructorController = require("../../controllers/instructor");

instructorRouter.get("/", instructorController.getAll);
instructorRouter.get("/:instructorId", instructorController.getInstructor);
instructorRouter.put("/:instructorId", instructorController.updateInstructor);
instructorRouter.delete(
  "/:instructorId",
  instructorController.deleteInstructor
);

module.exports = instructorRouter;
