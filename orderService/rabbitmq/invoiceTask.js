const { getChannel } = require('./connection');

const QUEUE_NAME = 'invoiceQueue';


async function addInvoiceToQueue(invoiceJob) {
    try {
        const channel = getChannel();

        await channel.assertQueue(QUEUE_NAME, {
            durable: true
        });

        channel.sendToQueue(
            QUEUE_NAME,
            Buffer.from(JSON.stringify(invoiceJob)), 
            { persistent: true }
        );

        console.log('invoice added to queue:', invoiceJob);
    } catch (error) {
        console.error('Error while adding invoice to queue:', error);
        throw error;
    }
}

module.exports = {
    addInvoiceToQueue,
};
