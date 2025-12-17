Java Spring Boot (ORM-first, minimal working)

Setup:
- Create a Spring Boot app with dependencies:
  - spring-boot-starter-web
  - spring-boot-starter-data-jpa
  - spring-boot-starter-amqp
  - h2
- Copy api/* into src/main/java/cheat/tasks
- Copy api/application.properties into src/main/resources (needed for port + auto DDL)
- Run:
  mvn spring-boot:run

Notes:
- Listens on: http://localhost:5101
- DB: H2 (in-memory) via Spring Data JPA, tables auto-created from entity
- Endpoints:
  GET  /health
  GET  /tasks
  POST /tasks
  PATCH /tasks/{id}/done
