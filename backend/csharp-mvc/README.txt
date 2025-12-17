C# ASP.NET Core MVC (ORM-first, minimal working)

Setup:
- Create:
  dotnet new webapi -n Api
- Add packages:
  dotnet add package Microsoft.EntityFrameworkCore.Sqlite
  dotnet add package Microsoft.EntityFrameworkCore
  dotnet add package RabbitMQ.Client
- Copy api/* into your project
- Run:
  dotnet run

Notes:
- Listens on: http://localhost:5101
- DB: SQLite via EF Core, auto-created via EnsureCreated()
- Endpoints:
  GET  /health
  GET  /tasks
  POST /tasks
  PATCH /tasks/{id}/done
