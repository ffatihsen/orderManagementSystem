const { getChannel } = require('../config/rabbitmq');
const { sendMail } = require('../services/emailService');

async function consumeEmailQueue() {
    const channel = getChannel();
    const queueName = 'emailQueue';

    await channel.assertQueue(queueName, { durable: true });

    console.log(`The tail is resting: ${queueName}`);
    channel.consume(queueName, async (message) => {
        if (message) {
            try {
                const emailJob = JSON.parse(message.content.toString());
    
                let resMail= await sendMail(emailJob);

                if(resMail.status == 200){
                    channel.ack(message);
                   
                }
                else{
                    console.error('Error sending message resMail:', resMail);
                    channel.nack(message, false, true);
                }
               
            } catch (error) {
                console.error('Error while processing message:', error.message);
                channel.nack(message, false, true);
            }
        }
    });
}

module.exports = {
    consumeEmailQueue,
};
