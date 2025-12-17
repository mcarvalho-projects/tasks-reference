// Why this file exists:
// - Minimal RabbitMQ producer (publish to task.created)

import amqp from "amqplib";

export async function publishTaskCreated(title: string) {
  const conn = await amqp.connect("amqp://localhost");
  const ch = await conn.createChannel();

  await ch.assertQueue("task.created");
  ch.sendToQueue("task.created", Buffer.from(title));

  await ch.close();
  await conn.close();
}
