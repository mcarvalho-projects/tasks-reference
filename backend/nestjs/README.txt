NestJS (ORM-first, minimal working)

Setup:
- Create:
  nest new api
- Install:
  npm i @nestjs/typeorm typeorm sqlite3 amqplib
- Copy api/* into src/ (paths may differ)
- Run:
  npm run start

Notes:
- Listens on: http://localhost:5101
- DB: SQLite via TypeORM, auto-created via synchronize:true
