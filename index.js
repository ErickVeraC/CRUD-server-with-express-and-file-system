const express = require("express");
const fs = require("fs");

const server = express();

server.use(express.json());

const dbName = "students.json";

// Vamos a revisar si existe el archivo json para guardar los datos, si no crearemos uno con fileSystem
function init() {
  const dbexists = fs.existsSync(dbName);
  if (!dbexists) {
    fs.writeFileSync(dbName, JSON.stringify([]), "utf8");
  }
}

init(); // Inicializamos la base de datos

// Ruta básica para la raíz
server.get("/", (request, response) => {
  response.send("Hello World!");
});

// Listar a todos los estudiantes con GET
server.get("/students", (request, response) => {
  const data = fs.readFileSync(dbName, "utf8");
  const students = JSON.parse(data || "[]");
  const studentNames = students.map((student) => student.name);
  response.status(200).json(studentNames);
});

// Agregar un estudiante con POST
server.post("/students", (request, response) => {
  const data = fs.readFileSync(dbName, "utf8");
  const students = JSON.parse(data || "[]");
  const newStudent = request.body;

  if (!newStudent.name) {
    return response.status(400).json({ error: "Student name is required" });
  }

  students.push(newStudent);
  fs.writeFileSync(dbName, JSON.stringify(students), "utf8");
  console.log(`New student added: ${newStudent.name}`);
  response.status(201).json(newStudent);
});

// Eliminar un estudiante con DELETE
server.delete("/students", (request, response) => {
  const { name } = request.body;
  if (!name) {
    return response.status(400).json({ error: "Student name is required" });
  }

  const data = fs.readFileSync(dbName, "utf8");
  let students = JSON.parse(data || "[]");
  const studentIndex = students.findIndex(
    (student) => student.name.toLowerCase() === name.toLowerCase()
  );

  if (studentIndex === -1) {
    return response.status(404).json({ error: "Student not found" });
  }

  students.splice(studentIndex, 1);
  fs.writeFileSync(dbName, JSON.stringify(students), "utf8");
  console.log(`Student deleted: ${name}`);
  response.status(200).json(students);
});

// Resetear la base de datos con DELETE
server.delete("/students", (request, response) => {
  const students = [];
  fs.writeFileSync(dbName, JSON.stringify(students), "utf8");
  response.status(200).json(students);
});

// Middleware para escuchar el servidor
server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
