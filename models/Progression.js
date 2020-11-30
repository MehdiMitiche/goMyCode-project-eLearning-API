const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const progressionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: "userId is required",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: "courseID is  required",
  },
  status: {
    type: Number,
    default: 0,
  },
  chapterNumber: {
    type: Number,
    default: 0,
  },
});

const Progression = mongoose.model("progression", progressionSchema);
module.exports = Progression;
