const express = require("express");
const fs = require("node:fs");

const server = express();

server.use(express.json());

let dbName = "students.json";

// Vamos a revisar si existe el archivo json para guardar los datos, si no crearemos uno con fileSystem
function init() {
  const dbexists = fs.existsSync(dbName);
  if (!dbexists) {
    fs.writeFileSync(dbName, JSON.stringify([]), "utf8");
  }
}
