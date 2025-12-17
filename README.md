# Tasks – Standardized Reference Project

This repository is a minimal reference project, not a real application.

Its purpose is to help you quickly recall structure, file layout, and basic syntax
for a very small “Tasks” application across multiple backend frameworks
and two frontends.

If you want something you can scan in 20–60 seconds per language to remember:
- what files exist
- what goes in each file
- how things are wired together

this repository is intended for that use.

---

## What This Is and What It Is Not

### This is
- A boilerplate-first reference
- A structure map for common stacks
- A way to compare the same application shape across languages
- A minimal, ORM-first example that runs but stays simple

### This is not
- A production-ready application
- A best-practices guide
- A complete tutorial
- An example of ideal architecture

Correctness is secondary to clarity.

---

## Concept Shown

A very small Tasks API with the same shape everywhere.

### API (same for all backends)

GET    /health  
GET    /tasks  
POST   /tasks  
PATCH  /tasks/{id}/done  

### Data model

Task  
- id  
- title  
- done  

### Messaging

When a task is created, a message is published to the RabbitMQ queue `task.created`.

A consumer prints:

NOTIFICATION: Task created

---

## Repository Structure

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

---

## Backends

Each backend folder contains:

README.txt        explains setup and what the backend demonstrates  
api/              HTTP API, ORM usage, and RabbitMQ producer  
consumer/         RabbitMQ consumer that prints a notification  

Backend rules:
- ORM-first
- SQLite or H2
- Tables auto-created from models
- Minimal logic
- No migrations
- No raw SQL unless unavoidable
- Same endpoint behavior everywhere

---

## Frontends

React:
- One file: App.jsx
- State, form, list rendering, toggle done, simple toast
- Uses http://localhost:5101

Angular:
- app.component.ts
- app.component.html
- ngModel, *ngFor, click handlers, toggle done, simple toast
- Uses http://localhost:5101

Each frontend folder includes setup instructions.

---

## RabbitMQ

RabbitMQ is included only to show structure.

Each backend includes:
- a producer that publishes to task.created
- a consumer that prints a single line

No retries.  
No exchanges.  
No durability tuning.

---

## How to Use This Repository

1. Choose one backend
2. Read its README.txt
3. Scan files in this order:
   - entry point
   - database and model
   - controller or routes
   - RabbitMQ producer
   - RabbitMQ consumer
4. Compare with another backend

This repository is designed for reading and orientation, not extension.

---

## Guiding Principle

I want to remember how this is structured in 20 seconds.

That is the only success metric.

---

## Reuse

To regenerate this project later, you can simply ask:

Generate the standardized reference ZIP.
