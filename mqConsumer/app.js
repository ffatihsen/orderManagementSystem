const { connectRabbitMQ } = require('./config/rabbitmq');
const { createQueue } = require('./queues');
const { consumeEmailQueue } = require('./consumers/emailConsumer');
const { consumeInvoiceQueue } = require('./consumers/invoiceConsumer');

async function initialize() {
    try {
        await connectRabbitMQ();
        await createQueue('invoiceQueue');

        await consumeEmailQueue();
        await consumeInvoiceQueue();

        console.log('The entire system has been successfully started.');
    } catch (error) {
        console.error('An error occurred during startup:', error.message);
        process.exit(1);
    }
}

initialize();
