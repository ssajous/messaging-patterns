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

      // prefetch(1) tells rabbit to only give 1 message to a worker at a time. It won't send another message
      // until an Ack(nowledgement) has been received for the previous message.  Otherwise the default behavior
      // is round-robin. A prefetch of 1 will result in workers picking up work as soon as they're ready.
      channel.prefetch(1)


      console.log("Javascript Worker Started")

      channel.consume(QUEUE_NAME, (msg) => {
        const data = JSON.parse(msg.content.toString())
        console.log(`Recieved ${data.message} in Javascript`)
        const waitTime = data.effort * 1000

        // sending an ack tells rabbit that this message has been successfully processed
        setTimeout(() => {
          channel.ack(msg)
        }, waitTime)
      }, { noAck: false })
    })
  })
}

listen()
