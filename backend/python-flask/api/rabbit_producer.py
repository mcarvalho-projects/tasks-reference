# Why this file exists:
# - Minimal RabbitMQ producer (publish to task.created)

import pika

def publish_task_created(title: str):
    conn = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    ch = conn.channel()

    ch.queue_declare(queue="task.created")
    ch.basic_publish(exchange="", routing_key="task.created", body=title)

    conn.close()
