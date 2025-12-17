package cheat.tasks;

// Why this file exists:
// - Minimal RabbitMQ producer (publish to task.created)

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class RabbitPublisher {
  private final RabbitTemplate rabbit;

  public RabbitPublisher(RabbitTemplate rabbit) {
    this.rabbit = rabbit;
  }

  public void publishTaskCreated(String title) {
    rabbit.convertAndSend("task.created", title);
  }
}
