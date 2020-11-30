const User = require("../../models/User.js");
const Course = require("../../models/Course.js");
const Progression = require("../../models/Progression.js");

const getStats = async () => {
  await User.count(
    {},
    (counter = (err, countU) => {
      if (err) return res.send({ msg: "Error" });
      return console.log(countU);
    })
  );

  await Course.count(
    {},
    (counterC = (err, countC) => {
      if (err) return res.send({ msg: "Error" });
      return console.log(countC);
    })
  );
};

module.exports = {
  getStats,
};
