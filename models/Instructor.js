const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  firstName: {
    type: String,
    required: "first name is required",
  },
  lastName: {
    type: String,
    required: "last name is required",
  },
  email: {
    type: String,
    required: "Email is required",
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
    required: "Email is required",
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
  experience: {
    type: String,
  },
  speciality: {
    type: String,
  },
});

const Instructor = mongoose.model("instructor", instructorSchema);
module.exports = Instructor;
