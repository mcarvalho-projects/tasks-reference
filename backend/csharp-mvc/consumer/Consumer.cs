// Why this file exists:
// - Minimal RabbitMQ consumer (consume task.created and print notification)

using RabbitMQ.Client;
using RabbitMQ.Client.Events;

var factory = new ConnectionFactory { HostName = "localhost" };
using var conn = factory.CreateConnection();
using var ch = conn.CreateModel();

ch.QueueDeclare(queue: "task.created", durable: false, exclusive: false, autoDelete: false);

var consumer = new EventingBasicConsumer(ch);
consumer.Received += (s, e) => Console.WriteLine("NOTIFICATION: Task created");

ch.BasicConsume(queue: "task.created", autoAck: true, consumer: consumer);

Console.WriteLine("Listening. Ctrl+C to exit.");
Console.ReadLine();
