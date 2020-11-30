const mongoose = require("mongoose");
const Course = require("../../models/Course");

const getAll = async (req, res) => {
  try {
    const result = await Course.find();
    if (!result) return res.status(400).json({ message: "ERROR!" });
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: `ERROR internal server!` });
    console.log(err.message);
  }
};

const getCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const result = await Course.findById(courseId);
    if (!result) return res.status(400).json({ message: "COURSE NOT FOUND!" });
    return res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ message: `ERROR internal server!` });
    console.log(err.message);
  }
};

const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const result = await Course.updateOne({ _id: courseId }, req.body);
    if (!result) return res.status(400).json({ message: "UPDATE FAILED" });
    return res.status(200).json({ message: "UPDATE SUCCESSFULL!", result });
  } catch (err) {
    return res.status(500).json({ message: `ERROR internal server!` });
    console.log(err.message);
  }
};

const addNewCourse = async (req, res) => {
  const {
    title,
    subTitle,
    shortDescription,
    longDiscription,
    date,
    imgUrl,
    whatYouWillLearn,
    whatYouWillBuild,
    instructorId,
    chapters,
  } = req.body;
  try {
    if (!title || !instructorId || !chapters || chapters.length === 0)
      return res
        .status(400)
        .json({ message: "INFORMATION MISSING, PLEASE CHECK YOUR REQUEST" });
    const newCourse = new Course();
    newCourse.title = title;
    newCourse.instructorId = mongoose.Types.ObjectId(instructorId);
    newCourse.chapters = chapters;
    if (subTitle) return (newCourse.subTitle = subTitle);
    if (shortDescription)
      return (newCourse.shortDescription = shortDescription);
    if (longDiscription) return (newCourse.longDiscription = longDiscription);
    if (date) return (newCourse.date = date);
    if (imgUrl) return (newCourse.imgUrl = imgUrl);
    if (whatYouWillLearn)
      return (newCourse.whatYouWillLearn = whatYouWillLearn);
    if (whatYouWillBuild)
      return (newCourse.whatYouWillBuild = whatYouWillBuild);
    const result = await newCourse.save();

    if (!result) return res.status(500).json({ message: "Missing Data!" });

    res.status(201).json({ message: "Successfully", result });
  } catch (error) {
    res.status(500).json({ message: `ERROR internal server!` });
    console.log(error.message);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (!courseId) return res.status(400).json({ message: "BAD REQUEST!" });
    const result = await Course.deleteOne({ _id: courseId });
    res.status(200).json({ message: "DELETE SUCCESSFULLY!", result });
  } catch (err) {
    res.status(500).json({ message: "ERROR internal server!" });
    console.log(err.message);
  }
};

module.exports = {
  getAll,
  getCourse,
  updateCourse,
  addNewCourse,
  deleteCourse,
};
