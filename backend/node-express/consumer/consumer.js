// Why this file exists:
// - Minimal RabbitMQ consumer boilerplate
// - Prints: NOTIFICATION: Task created

const amqp = require("amqplib");

async function main() {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();

  await ch.assertQueue("task.created");
  ch.consume("task.created", (msg) => {
    console.log("NOTIFICATION: Task created");
    if (msg) ch.ack(msg);
  });

  console.log("Listening. Ctrl+C to exit.");
}

main();
