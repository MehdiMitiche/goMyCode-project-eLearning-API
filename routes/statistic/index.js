const express = require("express");
const statisticsRouter = express.Router();

const statisticsController = require("../../controllers/statistics");

statisticsRouter.get("/", statisticsController.getStats);

module.exports = statisticsRouter;
