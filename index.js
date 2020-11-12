const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

//CONECTING TO THE DATABSE
mongoose.connect("mongodb://localhost/eLearningDB");
const db = mongoose.connection;
db.once("open", () => console.log("Database connected successfully !"));

//IMPORTING THE ROUTES
const authRouter = require("./routes/authentification");

//Import Middelware
const middleware = require("./middleware");

//Body-Parser MiddelWar
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/test", middleware.verifyToken, (req, res) => {
  res.send("API WORKING ...");
});

//USING OUR ROUTERS
app.use("/authentification", authRouter);

app.listen(8080, () => console.log("API RUNNING ON PORT 8080"));
