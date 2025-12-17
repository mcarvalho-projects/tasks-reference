# Why this file exists:
# - Minimal Flask API + minimal ORM usage (working, but simple)

from flask import Flask, request, jsonify
from db import engine, SessionLocal, Base
from models import Task
from rabbit_producer import publish_task_created

app = Flask(__name__)

# Auto-create tables from models (cheat-sheet style)
Base.metadata.create_all(bind=engine)

@app.get("/health")
def health():
    return jsonify(ok=True)

@app.get("/tasks")
def tasks():
    db = SessionLocal()
    rows = db.query(Task).all()
    db.close()
    return jsonify([{"id": t.id, "title": t.title, "done": t.done} for t in rows])

@app.post("/tasks")
def create():
    data = request.get_json(silent=True) or {}
    title = data.get("title", "untitled")

    db = SessionLocal()
    task = Task(title=title, done=False)
    db.add(task)
    db.commit()
    db.refresh(task)
    db.close()

    publish_task_created(title)
    return jsonify({"id": task.id, "title": task.title, "done": task.done}), 201

@app.patch("/tasks/<int:task_id>/done")
def toggle_done(task_id: int):
    db = SessionLocal()
    task = db.query(Task).get(task_id)
    if not task:
        db.close()
        return jsonify({"error": "not found"}), 404

    task.done = not task.done
    db.commit()
    db.refresh(task)
    db.close()

    return jsonify({"id": task.id, "title": task.title, "done": task.done})

if __name__ == "__main__":
    app.run(port=5101, debug=True)
