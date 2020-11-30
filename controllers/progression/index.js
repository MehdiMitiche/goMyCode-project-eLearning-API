const Progression = require("../../models/Progression");
const Course = require("../../models/Course");
const mongoose = require("mongoose");

const getProgression = async (req, res) => {
  try {
    const resultIDuser = req.userId || "569ed8269353e9f4c51617aa";
    const { courseId } = req.params;
    if (!resultIDuser || !courseId)
      return res.status(400).json({ message: " err" });
    const progresscours = await Progression.findOne({
      courseId: courseId,
      userId: resultIDuser,
    });
    if (!progresscours) return res.status(400).json({ message: " err" });
    return res.status(200).json(progresscours);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR !" });
  }
};

const progress = async (req, res) => {
  try {
    const userid = req.userId;
    const { courseId } = req.params;
    if (!courseId) return res.status(400).json({ message: " err" });
    const chapterlength = await Course.findById(courseId);
    const chapterlengthprog = await Progression.find({ courseId, userid });
    if (!chapterlength || !chapterlengthprog)
      return res.status(400).json({ message: "err" });
    const lengthcours = chapterlength.Chapters.length;
    const lengthprogress = chapterlengthprog.chapterNumber;
    if (!lengthprogress <= lengthcours - 1)
      return res.status(400).json({ message: "err" });
    const result = await Progression.updateOne(
      { courseId: courseId, userid: userid },
      { chapterNumber: chapterlengthprog.chapterNumber + 1 }
    );
    if (!result) return res.status(400).json({ msg: "ERROR" });
    return res.status(200).json({ result });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR !" });
  }
};

const start = async (req, res) => {
  //POST : ON AJOUTE UN NOUVEAU OBJET DANS LA COLLECTION PROGRESSION
  try {
    const resultIDuser = req.userId || "569ed8269353e9f4c51617aa";
    const { courseId } = req.params;
    if (!resultIDuser || !courseId)
      return res.status(400).json({ message: " err" });
    const progresscours = await progression.findById(courseId);
    if (!progresscours)
      return res.status(400).json({ msg: "pas de cours existant  !" });
    const newprogress = new Progression();
    newprogress.userId = mongoose.Types.ObjectId(resultIDuser);
    newprogress.courseId = mongoose.Types.ObjectId(courseId);
    const result = await newprogress.save();
    if (!result) return result.status(400).json({ msg: "ERROR" });
    return res.status(201).json({ message: " avec succés " });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "INTERNAL SERVER ERROR !" });
  }
};
module.exports = {
  getProgression,
  progress,
  start,
};

module.exports = {
  getProgression,
  progress,
  start,
};
