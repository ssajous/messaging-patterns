import pika
import time
import random


RABBIT_CONNECTION = 'amqp://guest:guest@rabbit:5672/'
QUEUE_NAME = 'work_queue_example'


def callback(ch, method, properties, body):
    print(f"Received {body.decode()} in Python", flush=True)
    time.sleep(random.randint(1, 10))
    ch.basic_ack(delivery_tag=method.delivery_tag)

    
def start_work():
    connection = pika.BlockingConnection(
    pika.connection.URLParameters(RABBIT_CONNECTION))
    rabbit_channel = connection.channel()
    rabbit_channel.queue_declare(queue=QUEUE_NAME, durable=True)
    rabbit_channel.basic_qos(prefetch_count=1)
    rabbit_channel.basic_consume(queue=QUEUE_NAME, on_message_callback=callback)

    print("Worker Started", flush=True)
    rabbit_channel.start_consuming()

# Wait for startup of other services
time.sleep(10)   
start_work()
