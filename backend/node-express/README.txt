Node.js Express (ORM-first, minimal working)

Setup:
- Init:
  npm init -y
- Install:
  npm i express sequelize sqlite3 amqplib
- Run API:
  node api/server.js
- Run consumer:
  node consumer/consumer.js

Notes:
- Listens on: http://localhost:5101
- DB: SQLite via Sequelize, tables auto-created via sequelize.sync()
