const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: "string",
    required: "first name is required",
  },
  lastName: {
    type: "string",
    required: "last name is required",
  },
  email: {
    type: "string",
    required: "Email is required",
  },
  phone: {
    type: "string",
    required: "Phone is required",
  },
  password: {
    type: "string",
  },
  courses: [
    {
      courseId: mongoose.Schema.Types.ObjectId,
      pregression: Number,
    },
  ],
  likedCourses: [mongoose.Schema.Types.ObjectId],
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
