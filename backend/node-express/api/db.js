// Why this file exists:
// - Sequelize ORM init (SQLite) + model definition + sync()

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "tasks.db",
  logging: false,
});

// Task model shape (ORM-first)
const Task = sequelize.define("Task", {
  title: DataTypes.STRING,
  done: DataTypes.BOOLEAN,
});

async function initDb() {
  // Auto-create tables from models (cheat-sheet style)
  await sequelize.sync();
}

module.exports = { sequelize, Task, initDb };
