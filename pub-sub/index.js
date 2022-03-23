const amqp = require('amqplib/callback_api')

const RABBIT_CONNECTION = 'amqp://guest:guest@rabbit:5672/'
const EXCHANGE_NAME = 'logs'

const listen = () => {
  amqp.connect(RABBIT_CONNECTION, (error0, connection) => {
    if (error0) {
      throw error0
    }

    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1
      }

      channel.assertExchange(EXCHANGE_NAME, 'fanout', { durable: false })
      channel.assertQueue('', {
        exclusive: true
      }, (error2, queue) => {
        console.log("Javascript Subscriber Started")

        channel.bindQueue(queue.queue, EXCHANGE_NAME, '')
        channel.consume(queue.queue, (msg) => {
          const message = JSON.parse(msg.content.toString())
          console.log(`Recieved message # ${message.messageNumber} in Javascript`)
          console.log(`The sent timestamp is ${message.timestamp}`)
        }, { noAck: true })
      })
    })
  })
}

// Start listening after 10 seconds to give services time to start
setTimeout(listen, 10000)
