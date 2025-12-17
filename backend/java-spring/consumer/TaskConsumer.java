import com.rabbitmq.client.*;

// Why this file exists:
// - Minimal RabbitMQ consumer boilerplate (reference)
// - Prints: NOTIFICATION: Task created

public class TaskConsumer {
  public static void main(String[] args) throws Exception {
    ConnectionFactory factory = new ConnectionFactory();
    factory.setHost("localhost");

    Connection conn = factory.newConnection();
    Channel ch = conn.createChannel();

    ch.queueDeclare("task.created", false, false, false, null);

    DeliverCallback cb = (tag, msg) -> {
      System.out.println("NOTIFICATION: Task created");
    };

    ch.basicConsume("task.created", true, cb, tag -> {});
    System.out.println("Listening. Ctrl+C to exit.");
  }
}
