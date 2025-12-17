RabbitMQ (reference-level, simple)

Shows:
- Producer publishes to queue: task.created
- Consumer prints exactly:
  NOTIFICATION: Task created

Setup (example):
- Docker:
  docker run -it --rm -p 5672:5672 -p 15672:15672 rabbitmq:3-management
- UI:
  http://localhost:15672 (guest / guest)

Notes:
- No retries. No advanced config.
- Producer and consumer are separate files in each backend folder.
