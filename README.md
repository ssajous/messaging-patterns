# Messaging Patterns Using RabbitMQ

Some basic examples of Rabbit MQ work-queue and pub/sub messasging patterns. The implementations are based on the RabbitMQ tutorials 2 and 3 at https://www.rabbitmq.com/getstarted.html.

## Getting Started

This project includes a Jupyter server with sample notebooks along with some javascript and python workers and subscriber examples that run in docker containers.

### Make commands

 * `make start` - starts the Jupyter server and rabbit mq along with queue subscriber processes
 * `make scale-up` - Will scale up python and javascript containers to 10 instances each to read from the work queue
 * `make single-workers` - Sets the number of worker instances to 1 each for the javascript and python workers
 * `make no-workers` - Kills all worker container instances
 * `make stop` - Shuts down all containers

### UI Pages

Once the docker containers are started Jupyter Lab can be accessed at http://localhost:8888/lab/workspaces/auto-C/tree/work. Notebook password: `jupyter`

The RabbitMQ admin console can be accessed at http://localhost:15672/ username: `guest` password: `guest`


