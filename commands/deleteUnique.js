const { readDatabase, writeDatabase } = require("../utils");

function deleteStudent(req, res) {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Student name is required" });
  }

  let students = readDatabase();
  const studentIndex = students.findIndex(
    (student) => student.name.toLowerCase() === name.toLowerCase()
  );

  if (studentIndex === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  students.splice(studentIndex, 1);
  writeDatabase(students);
  console.log(`Student deleted: ${name}`);
  res.status(200).json(students);
}

module.exports = deleteStudent;
