// Why this file exists:
// - Minimal RabbitMQ producer (publish to task.created)

using RabbitMQ.Client;
using System.Text;

namespace Api.Services;

public class TaskPublisher
{
    public void PublishTaskCreated(string title)
    {
        var factory = new ConnectionFactory { HostName = "localhost" };

        using var conn = factory.CreateConnection();
        using var ch = conn.CreateModel();

        ch.QueueDeclare(queue: "task.created", durable: false, exclusive: false, autoDelete: false);
        ch.BasicPublish(exchange: "", routingKey: "task.created", basicProperties: null,
            body: Encoding.UTF8.GetBytes(title));
    }
}
