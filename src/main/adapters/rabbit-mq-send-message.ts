// // import { Message } from "../../domain/entities/rabbit-mq-message";
// // import channel from '../config/rabbit-mq-client'
// // async function sendMessage(data: Message): Promise<boolean> {
// //     await channel.sendToQueue("teste-queue", Buffer.from(JSON.stringify(data)))

// import { type Message } from '../../domain/entities/rabbit-mq-message'
// import connectQueue from '../config/rabbit-mq-client'

// //     await channel.close()
// //     await connection.close()
// // }

// export class RabbitMq {
//   async sendMessage (props: Message) {
//     try {
//       void connectQueue()
//       await channel.sendToQueue('email-queue', Buffer.from(JSON.stringify(data)))
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   voidasync consumeMessage  () {
//     try {
//       void connectQueue()
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }
