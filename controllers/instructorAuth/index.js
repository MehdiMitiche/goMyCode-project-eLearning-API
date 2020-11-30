const instructor = require("../../models/Instructor");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const saltRounds = 10;

dotenv.config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Missing Information !" });

    const Instructor = await instructor.findOne({ email });
    if (!Instructor)
      return res.status(404).json({ msg: "Instructor not found !" });

    const compare = await bcrypt.compare(password, Instructor.password);

    if (!compare) return res.status(401).json({ msg: "Password Error !" });
    const token = jwt.sign(
      {
        userId: Instructor._id,
        email: Instructor.email,
        firstName: Instructor.firstName,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 5 }
    );

    return res.status(200).json({ msg: "Logged SuccessFully", token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      address,
      description,
      speciality,
      experience,
    } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ msg: "Missing Information !" });
    console.log("1");
    const existingInstructor = await instructor.findOne({ email });

    if (existingInstructor) {
      return res.status(403).json({ msg: "Email already in use" });
    }
    console.log("2");
    const newInstructor = new instructor();
    newInstructor.firstName = firstName;
    newInstructor.lastName = lastName;
    newInstructor.email = email;
    if (phone) newInstructor.phone = phone;
    if (address) newInstructor.address = address;
    if (description) newInstructor.description = description;
    if (experience) newInstructor.experience = experience;
    if (speciality) newInstructor.speciality = speciality;
    console.log("3");
    //HASHING THE PASSWORD
    const hash = await bcrypt.hash(password, saltRounds);
    newInstructor.password = hash;
    console.log("4");
    //SAVING THE NEW USER
    const result = await newInstructor.save();
    if (!result) return result.status(400).json({ msg: "ERROR" });
    console.log("5");
    //Creating The token
    const token = jwt.sign(
      {
        instructorId: result._id,
        email: result.email,
        firstName: result.firstName,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 5 }
    );
    return res
      .status(201)
      .json({ msg: "Created SuccessFully", token, data: result });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  login,
  register,
};
