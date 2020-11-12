const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    const verified = await jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    req.userId = verified.userId;
    if (verified) next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: err.message });
  }
};

module.exports = {
  verifyToken,
};
