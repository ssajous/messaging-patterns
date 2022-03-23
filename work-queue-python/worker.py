import pika
import time
import json


RABBIT_CONNECTION = 'amqp://guest:guest@rabbit:5672/'
QUEUE_NAME = 'work_queue_example'


def callback(ch, method, properties, body):
    # body is a binary buffer so we need to decode it to a string
    data = json.loads(body.decode())

    print(f"Received {data['message']} in Python", flush=True)
    time.sleep(data['effort'])

    # send an ack to let rabbitmq know that the message has been sucessfully processed
    ch.basic_ack(delivery_tag=method.delivery_tag)

    
def start_work():
    connection = pika.BlockingConnection(
    pika.connection.URLParameters(RABBIT_CONNECTION))
    rabbit_channel = connection.channel()
    rabbit_channel.queue_declare(queue=QUEUE_NAME, durable=True)

    # prefetch of 1 tells rabbit to only allow a worker to have 1 message at a time before an ack is 
    # recieved. It overrides the default round-robin delivery to workers listening to a queue.
    rabbit_channel.basic_qos(prefetch_count=1)

    rabbit_channel.basic_consume(queue=QUEUE_NAME, on_message_callback=callback)

    print("Worker Started", flush=True)
    rabbit_channel.start_consuming()

start_work()
