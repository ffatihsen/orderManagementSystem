const { getChannel } = require('../config/rabbitmq');
const { sendInvoice } = require('../services/invoiceService');

async function consumeInvoiceQueue() {
    const channel = getChannel();
    const queueName = 'invoiceQueue';

    await channel.assertQueue(queueName, { durable: true });

    console.log(`The tail is resting: ${queueName}`);
    channel.consume(queueName, async (message) => {
        if (message) {
            try {
                const invoiceJob = JSON.parse(message.content.toString());
                
                let res= await sendInvoice(invoiceJob); 
                
                if(res.status == 201){
                  channel.ack(message);
                }
                else{
                    console.error('Error while sending invoice:', res);
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
    consumeInvoiceQueue,
};
