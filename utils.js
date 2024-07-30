const fs = require("fs");
const { dbName } = require("./constants");

function init() {
  // Con esta función inicializamos la base de datos
  const dbexists = fs.existsSync(dbName);
  if (!dbexists) {
    fs.writeFileSync(dbName, JSON.stringify([]), "utf8");
  }
}

function readDatabase() {
  // Con esta función leemos la base de datos
  const data = fs.readFileSync(dbName, "utf8");
  return JSON.parse(data || "[]");
}

function writeDatabase(data) {
  // Con esta función escribimos en la base de datos
  fs.writeFileSync(dbName, JSON.stringify(data), "utf8");
}

module.exports = { init, readDatabase, writeDatabase };
