// Why this file exists:
// - Minimal Express routes + minimal ORM usage (working, but simple)

const express = require("express");
const { Task, initDb } = require("./db");
const { publishTaskCreated } = require("./rabbitProducer");

const app = express();
app.use(express.json());

// Init DB once (auto-create tables)
initDb();

app.get("/health", (req, res) => res.json({ ok: true }));

app.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const title = (req.body && req.body.title) || "untitled";
  const task = await Task.create({ title, done: false });

  await publishTaskCreated(title);
  res.status(201).json(task);
});

app.patch("/tasks/:id/done", async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: "not found" });

  task.done = !task.done;
  await task.save();
  res.json(task);
});

app.listen(5101, () => console.log("Listening on :5101"));
