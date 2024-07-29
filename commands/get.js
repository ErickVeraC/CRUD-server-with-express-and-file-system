const { readDatabase } = require("../utils");

function getStudents(req, res) {
  const students = readDatabase();
  const studentNames = students.map((student) => student.name);
  res.status(200).json(studentNames);
}

module.exports = getStudents;
