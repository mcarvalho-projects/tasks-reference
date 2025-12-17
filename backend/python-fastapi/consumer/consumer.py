# Why this file exists:
# - Minimal RabbitMQ consumer boilerplate
# - Prints: NOTIFICATION: Task created

import pika

conn = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
ch = conn.channel()
ch.queue_declare(queue="task.created")

def on_message(ch, method, properties, body):
    print("NOTIFICATION: Task created")

ch.basic_consume(queue="task.created", on_message_callback=on_message, auto_ack=True)

print("Listening. Ctrl+C to exit.")
ch.start_consuming()
