const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const app = express();

app.use(cors());

//CONECTING TO THE DATABSE
mongoose.connect("mongodb://localhost/eLearningDB");
const db = mongoose.connection;
db.once("open", () => console.log("Database connected successfully !"));

//IMPORTING THE ROUTES
const authRouter = require("./routes/authentification");
const userRouter = require("./routes/user");
const instructorRouter = require("./routes/instructor");
const progressionRouter = require("./routes/progression");
const courseRouter = require("./routes/course");
const actionRouter = require("./routes/authentification");
const statisticsRouter = require("./routes/statistic");
const instructorAuthRouter = require("./routes/instructorAuth");

//Import Middelware
const middleware = require("./middleware");

//Body-Parser MiddelWar
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/test", middleware.verifyToken, (req, res) => {
  res.send("API WORKING ...");
});

//USING OUR ROUTERS
app.use("/auth", authRouter);
app.use("/instructorAuth", instructorAuthRouter);

app.use(middleware.verifyToken);

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/aaction", actionRouter);
app.use("/statistics", statisticsRouter);
app.use("/instructor", instructorRouter);
app.use("/progression", progressionRouter);

app.listen(8080, () => console.log("API RUNNING ON PORT 8080"));
