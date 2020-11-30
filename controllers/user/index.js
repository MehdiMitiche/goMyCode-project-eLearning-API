const User = require("../../models/User");
const mongoose = require("mongoose");
const { updateOne, deleteOne } = require("../../models/User");

const getAll = async (req, res) => {
  try {
    const result = await User.find();
    if (!result) return res.status(400).json({ message: "BAD REQUEST ERROR!" });
    return res.status(200).json({ message: "Success", result });
  } catch (err) {
    res.status(500).json({ message: "INTERNAL ERROR SERVER!" });
    console.log(err.message);
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "ERROR ID!" });
    const result = await User.findById(userId);
    return res.status(200).json({ message: "Success", result });
  } catch (err) {
    res.status(500).json({ message: "INTERNAL ERROR SERVER!" });
    console.log(err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "ERROR ID!" });
    const result = await User.updateOne({ _id: userId }, req.body);
    !result
      ? res.status(400).json({ message: "UPDATE Failed" })
      : res.status(200).json({ message: "UPDATE Successfully", result });
  } catch (err) {
    res.status(500).json({ message: "INTERNAL ERROR SERVER!" });
    console.log(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "ERROR ID!" });
    const result = await User.deleteOne({ _id: userId });
    if (!result) return res.status(400).json({ message: "DELETE ERROR!" });
    return res.status(200).json({ message: "DELETE SUCCESSFULLY!", result });
  } catch (e) {
    res.status(500).json({ message: "INTERNAL ERROR SERVER!" });
    console.log(e);
  }
};

module.exports = {
  getAll,
  getUser,
  updateUser,
  deleteUser,
};
