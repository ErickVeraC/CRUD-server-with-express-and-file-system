const fs = require("fs");
const { dbName } = require("./constants");

function init() {
  const dbexists = fs.existsSync(dbName);
  if (!dbexists) {
    fs.writeFileSync(dbName, JSON.stringify([]), "utf8");
  }
}

function readDatabase() {
  const data = fs.readFileSync(dbName, "utf8");
  return JSON.parse(data || "[]");
}

function writeDatabase(data) {
  fs.writeFileSync(dbName, JSON.stringify(data), "utf8");
}

module.exports = { init, readDatabase, writeDatabase };
