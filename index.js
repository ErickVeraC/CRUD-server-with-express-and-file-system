const express = require("express");
const { init } = require("./utils");
const getStudents = require("./commands/get");
const addStudent = require("./commands/post");
const deleteAllStudents = require("./commands/deleteAll");
const deleteStudent = require("./commands/deleteUnique");

const server = express();

server.use(express.json());

init(); // Inicializamos la base de datos

// Ruta básica para la raíz
server.get("/", (req, res) => {
  res.send("Welcome to the students list!");
});

// Listar a todos los estudiantes con GET
server.get("/students", getStudents);

// Agregar un estudiante con POST
server.post("/students", addStudent);

// Eliminar un estudiante con DELETE
server.delete("/students", deleteStudent);

// Resetear la base de datos con DELETE
server.delete("/students/all", deleteAllStudents);

// Middleware para escuchar el servidor
server.listen(8080, () => {
  console.log("Server is running on port 8080");
});
