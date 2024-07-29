const { writeDatabase } = require("../utils");

function deleteAllStudents(req, res) {
  writeDatabase([]);
  res.status(200).json([]);
}

module.exports = deleteAllStudents;
