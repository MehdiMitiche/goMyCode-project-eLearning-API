const User = require("../../models/User");
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

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) return res.status(401).json({ msg: "wrong password" });
    //Creating The token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 5 }
    );

    return res
      .status(200)
      .json({ msg: "Created SuccessFully", token, data: user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const register = async (req, res) => {
  console.log("ENTRED");
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ msg: "Missing Information !" });

    //CHECKING EXISTING USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(403).json({ msg: "Email already in use" });
    }

    //CREATING THE NEW USER
    const newUser = new User();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    if (phone) newUser.phone = phone;

    //HASHING THE PASSWORD
    const hash = await bcrypt.hash(password, saltRounds);
    newUser.password = hash;

    //SAVING THE NEW USER
    const result = await newUser.save();
    if (!result) return result.status(400).json({ msg: "ERROR" });

    //Creating The token
    const token = jwt.sign(
      {
        userId: result._id,
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
