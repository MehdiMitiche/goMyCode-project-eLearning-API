const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: "title is required",
  },
  subTitle: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  longDiscription: {
    type: String,
  },
  date: {
    type: Date,
    required: "date is required",
  },
  imgUrl: {
    type: String,
  },
  whatYouWillLearn: {
    type: String,
  },
  whatYouWillBuild: {
    type: String,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  Chapters: [
    {
      title: String,
      mainIdeas: String,
      content: String,
    },
  ],
});

const Course = mongoose.model("course", courseSchema);
module.exports = Course;
