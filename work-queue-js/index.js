const amqp = require('amqplib/callback_api')

const RABBIT_CONNECTION = 'amqp://guest:guest@rabbit:5672/'
const QUEUE_NAME = 'work_queue_example'

const listen = () => {
  amqp.connect(RABBIT_CONNECTION, (error0, connection) => {
    if (error0) {
      throw error0
    }

    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1
      }

      channel.assertQueue(QUEUE_NAME, { durable: true })
      channel.prefetch(1)


      console.log("Javascript Worker Started")

      channel.consume(QUEUE_NAME, (msg) => {
        console.log(`Recieved ${msg.content.toString()} in Javascript`)
        setTimeout(() => {
          channel.ack(msg)
        }, 2000)
      }, { noAck: false })
    })
  })
}

// Start listening after 10 seconds to give services time to start
setTimeout(listen, 10000)
