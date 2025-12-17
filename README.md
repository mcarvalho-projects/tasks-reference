# Tasks – Multi‑Language Boilerplate Reference

This repository is a **simple boilerplate reference**, not a real application.

It shows **the same tiny “Tasks” project** implemented in **multiple programming languages and frameworks**, so you can quickly understand:

- how each stack is structured
- which files exist
- what responsibility each file has

This is meant for **orientation and comparison**, not for production use.

---

## What This Repository Is

This project is a **side‑by‑side reference**.

Every backend implements the **same small API** using a different language or framework.
The goal is to help you answer questions like:

- “How does this look in Spring vs .NET?”
- “Where does the controller live in NestJS?”
- “What is the minimal ORM setup in Flask or FastAPI?”

You should be able to skim any folder in **under one minute**.

---

## What This Repository Is Not

- Not a production-ready application
- Not a best-practices guide
- Not a tutorial
- Not a complete example

Details are intentionally simplified.

---

## Shared Concept (Same Everywhere)

### API

All backends expose the same endpoints:

GET    /health  
GET    /tasks  
POST   /tasks  
PATCH  /tasks/{id}/done  

### Data Model

Task  
- id  
- title  
- done  

### Messaging

When a task is created:
- a message is published to RabbitMQ queue `task.created`
- a consumer prints:

NOTIFICATION: Task created

---

## Repository Structure

```
tasks-cheat-reference/
├── backend/
│   ├── csharp-minimal/
│   ├── csharp-mvc/
│   ├── java-spring/
│   ├── python-flask/
│   ├── python-fastapi/
│   ├── node-express/
│   └── nestjs/
├── frontend/
│   ├── react/
│   └── angular/
└── rabbitmq/
    └── README.txt
```

---

## Backends

Each backend folder represents **one language / framework**.

Each contains:

- README.txt  
  Explains setup and what that backend demonstrates

- api/  
  Minimal HTTP API, ORM setup, and RabbitMQ producer

- consumer/  
  Minimal RabbitMQ consumer that prints a notification

All backends:
- use an ORM
- auto-create tables from models
- keep logic intentionally small
- expose the same API shape

---

## Frontends

Two minimal frontends are included to show how the API is consumed.

### React (Vite)
- Single file: App.jsx
- Uses fetch
- Shows state, form, list, toggle done, and a simple toast

### Angular
- app.component.ts
- app.component.html
- Uses HttpClient
- Shows ngModel, *ngFor, toggle done, and a simple toast

Both call the backend at:

http://localhost:5101

Each frontend folder includes setup instructions.

---

## RabbitMQ

RabbitMQ usage is intentionally minimal.

Each backend includes:
- one producer that publishes to `task.created`
- one consumer that prints a single line

No retries, no advanced configuration.

---

## How to Use This Repository

Suggested use:

1. Pick a backend you know
2. Pick one you want to learn
3. Compare file-by-file
4. Focus on structure, not details

This repository is designed for **quick reference and comparison**.

---
