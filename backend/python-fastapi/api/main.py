# Why this file exists:
# - Minimal FastAPI API + minimal ORM usage (working, but simple)

from fastapi import FastAPI, HTTPException
from .db import engine, SessionLocal, Base
from .models import Task
from .rabbit_producer import publish_task_created

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/health")
def health():
    return {"ok": True}

@app.get("/tasks")
def tasks():
    db = SessionLocal()
    rows = db.query(Task).all()
    db.close()
    return [{"id": t.id, "title": t.title, "done": t.done} for t in rows]

@app.post("/tasks")
def create(body: dict):
    title = body.get("title", "untitled")

    db = SessionLocal()
    task = Task(title=title, done=False)
    db.add(task)
    db.commit()
    db.refresh(task)
    db.close()

    publish_task_created(title)
    return {"id": task.id, "title": task.title, "done": task.done}

@app.patch("/tasks/{task_id}/done")
def toggle_done(task_id: int):
    db = SessionLocal()
    task = db.query(Task).get(task_id)
    if not task:
        db.close()
        raise HTTPException(status_code=404, detail="not found")

    task.done = not task.done
    db.commit()
    db.refresh(task)
    db.close()

    return {"id": task.id, "title": task.title, "done": task.done}
