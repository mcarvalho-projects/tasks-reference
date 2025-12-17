// Why this file exists:
// - Minimal RabbitMQ producer (publish to task.created)

const amqp = require("amqplib");

async function publishTaskCreated(title) {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();

  await ch.assertQueue("task.created");
  ch.sendToQueue("task.created", Buffer.from(title));

  await ch.close();
  await conn.close();
}

module.exports = { publishTaskCreated };
