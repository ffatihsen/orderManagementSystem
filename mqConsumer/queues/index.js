const { getChannel } = require('../config/rabbitmq');

async function createQueue(queueName) {
    const channel = getChannel();
    await channel.assertQueue(queueName, { durable: true });
    console.log(`Queue created: ${queueName}`);
}

module.exports = {
    createQueue,
};
