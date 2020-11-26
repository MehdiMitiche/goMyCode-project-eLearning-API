const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;

dotenv.config();

const login = async (req, res) => {
  res.send("Work in progress ...");
};

const register = async (req, res) => {
  res.send("Work in progress ...");
};

module.exports = {
  login,
  register,
};
