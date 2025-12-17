Python Flask (ORM-first, minimal working)

Setup:
- Create venv (optional)
- Install:
  pip install flask sqlalchemy pika
- Run API:
  python api/app.py
- Run consumer:
  python consumer/consumer.py

Notes:
- Listens on: http://localhost:5101
- DB: SQLite via SQLAlchemy, tables auto-created via Base.metadata.create_all()
