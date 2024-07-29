const { readDatabase, writeDatabase } = require("../utils");

function addStudent(req, res) {
  const students = readDatabase();
  const newStudent = req.body;

  if (!newStudent.name) {
    return res.status(400).json({ error: "Student name is required" });
  }

  students.push(newStudent);
  writeDatabase(students);
  console.log(`New student added: ${newStudent.name}`);
  res.status(201).json(newStudent);
}

module.exports = addStudent;
