Python FastAPI (ORM-first, minimal working)

Setup:
- Install:
  pip install fastapi uvicorn sqlalchemy pika
- Run API:
  uvicorn api.main:app --reload --port 5101
- Run consumer:
  python consumer/consumer.py

Notes:
- DB: SQLite via SQLAlchemy, tables auto-created on startup
